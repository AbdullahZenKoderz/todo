import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUseDTO } from '../DTO/registerUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../Entity/user.entity';
import { Repository } from 'typeorm';
import { RegisterUser } from '../Interfaces/user.interface';
import { encodePassword } from 'src/Utilities/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

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
    return "User Created Successfully!";
  }

  async getAllUser(): Promise<any> {
    const result = await this.userRepository.find();
    return result;
  }

  async getUserByEmail(email: string) {
    let userData = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    return userData;
  }
}
