import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { RegisterUseDTO } from '../DTO/registerUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../Entity/user.entity';
import { Repository } from 'typeorm';
import { RegisterUser } from '../Interfaces/user.interface';
import { encodePassword } from 'src/Utilities/bcrypt';
import { AuthService } from 'src/Modules/Auth/Services/auth.service';
import { Request } from 'express';
import { ExtendedRequest } from '../Interfaces/extended-request.interface';
import { UpdateUserDTO } from '../DTO/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) { }

  async register(regisetUserDTO: RegisterUseDTO): Promise<any> {
    const userExisit = await this.getUserByEmail(regisetUserDTO.email);
    if (userExisit)
      throw new HttpException('Email already exisit', HttpStatus.BAD_REQUEST);
    const registerUserData: RegisterUser = {
      name: regisetUserDTO.name,
      email: regisetUserDTO.email,
      password: encodePassword(regisetUserDTO.password),
    };
    const insertUser = this.userRepository.create(registerUserData);
    await this.userRepository.save(insertUser);
    const payload = {
      id: insertUser.id,
      email: insertUser.email
    }
    const token = await this.authService.generateAuthToken(payload);
    return {
      message: "Account created successfully!",
      user: insertUser,
      token
    };
  }

  async getAllUser(query): Promise<any> {
    const page: number = +query.page || 1;
    const limit: number = +query.limit || 10;
    const result = await this.userRepository.find(
      {
        relations: { todos: true },
        skip: (page - 1) * limit,
        take: limit
      });
    return result;
  }

  async getProfile(req: ExtendedRequest): Promise<any> {
    const user = await this.getUserByEmail(req.user.email);
    if (!user) throw new HttpException("No user found with this id.", HttpStatus.NOT_FOUND)
    return user;
  }

  async getUser(param): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: param.id },
      relations: { todos: true }
    });
    if (!user) throw new HttpException("No user found with this id.", HttpStatus.NOT_FOUND)
    return user;
  }

  async updateUser(req: ExtendedRequest, updateUserDTO: UpdateUserDTO): Promise<any> {
    const user = await this.getUserByEmail(req.user.email);
    if (!user) throw new HttpException("User not found.", HttpStatus.NOT_FOUND)
    user.name = updateUserDTO.name;
    await this.userRepository.save(user);
    return {
      message: "Profile updated successfully!",
      user: user
    }
  }

  async getUserByEmail(email: string) {
    let userData = await this.userRepository.findOne({
      where: {
        email: email,
      },
      relations: { todos: true }
    });

    return userData;
  }
}
