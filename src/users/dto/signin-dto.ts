import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}
