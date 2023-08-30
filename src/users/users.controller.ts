import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupDTO } from './dto/signup-dto';
import { User } from './models/users.model';
import { SignInDTO } from './dto/signin-dto';
import { UserSignIn } from './types/UserSignIn';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  public async signUp(@Body() signUpDto: SignupDTO): Promise<User> {
    return this.UsersService.signUp(signUpDto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  public async signIn(@Body() signInDto: SignInDTO): Promise<UserSignIn> {
    return this.UsersService.signIn(signInDto);
  }
}
