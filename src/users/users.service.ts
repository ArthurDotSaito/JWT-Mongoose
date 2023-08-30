import { Injectable, NotFoundException } from '@nestjs/common';
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
  public async signIn(
    signInDto: SignInDTO,
  ): Promise<{ name: string; jwtToken: string; email: string }> {
    const user = await this.findByEmail(signInDto.email);
    const match = await this.checkPassword(signInDto.password, user);
    if (!user) throw new NotFoundException('Invalid Credentials');

    const jwtToken = await this.authService.createAcessToken(user._id);

    return { name: user.name, jwtToken, email: user.email };
  }

  private async findByEmail(email: string): Promise<User> {
    const user = await this.usersModel.findOne({ email });
    if (!user) throw new NotFoundException('Email not Found');
    return user;
  }

  public async findAll(): Promise<User[]> {
    return this.usersModel.find();
  }

  private async checkPassword(password: string, user: User): Promise<boolean> {
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new NotFoundException('Password not Found');
    return match;
  }
}
