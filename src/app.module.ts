import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './auth/auth.module';
import { EnvironmentModule } from './environment/environment.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    AuthModule,
    EnvironmentModule,
  ],
  providers: [PrismaService],
})
export class AppModule { }
