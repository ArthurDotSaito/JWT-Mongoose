import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { SignInDTO } from './dto/signin-dto';
import { SignupDTO } from './dto/signup-dto';
import { User } from './models/users.model';
import { UserSignIn } from './types/UserSignIn';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

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

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<User[]> {
    return this.UsersService.findAll();
  }
}
