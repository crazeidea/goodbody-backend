import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { EnvironmentService } from 'src/environment/environment.service';

type TokenPayload = {
    id: number;
}

@Injectable()
export class AuthUtil {

    constructor(
        private environmentService: EnvironmentService
    ) { }

    hash(value: string): Promise<string> {
        return bcrypt.hash(value, 10);
    }

    hashCompare(value: string, encrypted: string): Promise<boolean> {
        return bcrypt.compare(value, encrypted);
    }

    createAccessToken(user: User) {
        return jwt.sign({ id: user.id }, this.environmentService.createJwtOptions().secret)
    }
}