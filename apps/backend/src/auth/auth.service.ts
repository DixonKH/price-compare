import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}


async register(dto: RegisterDto) {
  const exist = await this.prisma.user.findUnique({
    where: { email: dto.email },
  });

  if (exist) {
    throw new BadRequestException('User already exists');
  }

  const hashedPassword = await bcrypt.hash(dto.password, 10);

  const user = await this.prisma.user.create({
    data: {
      email: dto.email,
      name: dto.name,
      password: hashedPassword,
    },
  });
  console.log("reg user:", user);
  return this.issueTokens(user.id, user.email);
}

async login(dto: LoginDto) {
  const user = await this.prisma.user.findUnique({
    where: { email: dto.email },
  });

  if (!user) throw new UnauthorizedException('Invalid credentials');

  const isValid = await bcrypt.compare(dto.password, user.password);
  if (!isValid) throw new UnauthorizedException('Invalid credentials');

  console.log("login user:", user);
  return this.issueTokens(user.id, user.email);
}

async issueTokens(userId: number, email: string) {
  const payload = { sub: userId, email };

  const accessToken = await this.jwtService.signAsync(payload);

  const refreshToken = await this.jwtService.signAsync(payload, {
    expiresIn: '30d',
    secret: process.env.JWT_REFRESH_SECRET,
  });

  return { accessToken, refreshToken };
}
}