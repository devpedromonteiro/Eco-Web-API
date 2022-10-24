import { ApiProperty } from "@nestjs/swagger";

export class CreateUsersDto {
    @ApiProperty({description:'Username utilizado para o login'})
    username: string;

    @ApiProperty({description: 'Senha utilizada para realizar o login'})
    password: string;
}