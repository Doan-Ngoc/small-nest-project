import { IsNotEmpty } from 'class-validator';

export class authCredentialDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
