import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './auth/auth.module';
import { EnvironmentModule } from './environment/environment.module';
import { EnvironmentService } from './environment/environment.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    AuthModule,
    JwtModule.registerAsync({
      useClass: EnvironmentService
    }),
    EnvironmentModule,
  ],
  providers: [PrismaService],
})
export class AppModule { }
