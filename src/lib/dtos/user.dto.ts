import { IUserDTO } from "src/interface/dto/user.dto";

export class UserDTO implements IUserDTO {
    id: number;
    name: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
}