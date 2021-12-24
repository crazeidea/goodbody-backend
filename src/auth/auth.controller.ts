import { Body, ConflictException, Controller, NotFoundException, Post } from '@nestjs/common';
import { UserService } from 'src/app/user/user.service';
import { AccessTokenDTO, LoginDTO, RegisterDTO } from 'src/lib/dtos/auth.dto';
import { UserDTO } from 'src/lib/dtos/user.dto';
import { AuthService } from './auth.service';
import { AuthUtil } from './auth.util';

@Controller({ path: 'auth', version: '1' })
export class AuthController {

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private authUtil: AuthUtil
    ) { }

    @Post('register')
    async signup(
        @Body() body: RegisterDTO
    ): Promise<UserDTO> {

        const { username, password, passwordConfirm } = body;

        if (password !== passwordConfirm) {
            throw new ConflictException('비밀번호를 확인해 주세요.')
        }

        const checkUsername = await this.userService.getUserByUsername(username);
        if (checkUsername) {
            throw new ConflictException('이미 사용 중인 아이디 입니다.')
        }

        body.password = await this.authUtil.hash(password);

        return this.authService.createUser(body);
    }

    @Post('login')
    async signin(
        @Body() body: LoginDTO
    ): Promise<AccessTokenDTO> {
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
