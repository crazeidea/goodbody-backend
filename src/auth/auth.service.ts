import { Injectable } from '@nestjs/common';
import { RegisterDTO } from 'src/lib/dtos/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {

    constructor(
        private prismaService: PrismaService
    ) { }

    createUser(body: RegisterDTO) {
        const { name, username, password } = body;
        return this.prismaService.user.create({
            data: {
                name,
                username,
                password
            }
        })
    }
}


