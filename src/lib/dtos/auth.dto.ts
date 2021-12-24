import { IAccessTokenDTO, ILoginDTO, IRegisterDTO } from 'src/interface/dto/auth.dto';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class LoginDTO implements ILoginDTO {

    @IsNotEmpty({ message: '아이디를 입력해 주세요.' })
    username: string;

    @IsNotEmpty({ message: '비밀번호를 입력해 주세요.' })
    password: string;
}

export class RegisterDTO implements IRegisterDTO {

    @IsNotEmpty({ message: '이름을 입력해 주세요.' })
    name: string;

    @IsNotEmpty({ message: '아이디를 입력해 주세요.' })
    @MinLength(6, { message: '아이디는 6자 이상이여야 합니다.' })
    @MaxLength(12, { message: '아이디는 12자 이하이여야 합니다.' })
    username: string;

    @IsNotEmpty({ message: '비밀번호를 입력해 주세요.' })
    @MinLength(6, { message: '비밀번호는 6자리 이상이여야 합니다.' })
    @MaxLength(12, { message: '비밀번호는 12자리 이하여야 합니다.' })
    password: string;

    @IsNotEmpty({ message: '비밀번호를 다시 한번 입력해 주세요.' })
    @MinLength(6, { message: '비밀번호는 6자리 이상이여야 합니다.' })
    @MaxLength(12, { message: '비밀번호는 12자리 이하여야 합니다.' })
    passwordConfirm: string;
}

export class AccessTokenDTO implements IAccessTokenDTO {
    accessToken: string;
}