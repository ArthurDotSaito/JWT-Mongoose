import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './models/users.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';
import { SignupDTO } from './dto/signup-dto';
import { SignInDTO } from './dto/signin-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly usersModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

  public async signUp(signUpDto: SignupDTO): Promise<User> {
    const user = new this.usersModel(signUpDto);
    return user.save();
  }
}
