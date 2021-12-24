import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/interface/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {

    constructor(
        private prismaService: PrismaService
    ) { }

    createUser(body: CreateUserDTO) {
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


