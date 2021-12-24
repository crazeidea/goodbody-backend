import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EnvironmentService } from './environment.service';

const envFilePath = process.env.NODE_ENV === 'production' ? '' : '.env.development'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true
    }),
    JwtModule.registerAsync({ useClass: EnvironmentService }),
  ],
  providers: [EnvironmentService, ConfigService],
  exports: [EnvironmentService]
})
export class EnvironmentModule { }
