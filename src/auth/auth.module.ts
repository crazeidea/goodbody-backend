import { Module } from '@nestjs/common';
import { UserModule } from 'src/app/user/user.module';
import { EnvironmentModule } from 'src/environment/environment.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthUtil } from './auth.util';

@Module({
  imports: [UserModule, EnvironmentModule],
  providers: [PrismaService, AuthService, AuthUtil],
  controllers: [AuthController],
})
export class AuthModule { }
