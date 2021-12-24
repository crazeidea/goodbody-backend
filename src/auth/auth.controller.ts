import { Body, ConflictException, Controller, NotFoundException, Post } from '@nestjs/common';
import { UserService } from 'src/app/user/user.service';
import { CreateUserDTO, LoginDTO, TokenDTO } from 'src/interface/dto/auth.dto';
import { UserDTO } from 'src/interface/dto/user.dto';
import { AuthService } from './auth.service';
import { AuthUtil } from './auth.util';

@Controller({ path: 'auth', version: '1' })
export class AuthController {

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private authUtil: AuthUtil
    ) { }

    @Post('signup')
    async signup(
        @Body() body: CreateUserDTO
    ): Promise<UserDTO> {

        const { username, password, passwordConfirm } = body;

        if (password !== passwordConfirm) {
            throw new ConflictException('비밀번호를 확인해 주세요.')
        }

        const checkUsername = await this.userService.getUserByUsername(username);
        if (checkUsername) {
            throw new ConflictException('이 아이디는 사용할 수 없습니다.')
        }

        body.password = await this.authUtil.hash(password);

        return this.authService.createUser(body);
    }

    @Post('signin')
    async signin(
        @Body() body: LoginDTO
    ): Promise<TokenDTO> {
        const { username, password } = body;
        const user = await this.userService.getUserByUsername(username);
        if (!user) {
            throw new NotFoundException('아이디 또는 비밀번호를 확인해 주세요.')
        }

        const comparePassword = await this.authUtil.hashCompare(password, user.password);
        if (!comparePassword) {
            throw new ConflictException('아이디 또는 비밀번호를 확인해 주세요.')
        }

        return {
            accessToken: this.authUtil.createAccessToken(user)
        }

    }
}
