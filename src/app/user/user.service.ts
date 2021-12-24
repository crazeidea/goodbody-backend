import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(
        private prismaService: PrismaService
    ) { }

    getUserByUsername(username: string) {
        return this.prismaService.user.findUnique({ where: { username } })
    }
}
