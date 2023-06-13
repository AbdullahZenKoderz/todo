import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleOptions,
  TypeOrmModuleAsyncOptions,
} from '@nestjs/typeorm';

export default class TypeOrmConfig {
  static getMySqlConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: configService.get('HOST'),
      port: configService.get('SQL_PORT'),
      username: configService.get('USER_NAME'),
      password: configService.get('PASSWORD'),
      database: configService.get('DATABASE'),
      // entities:[],
      synchronize: true,
      debug: false,
      autoLoadEntities: true,
    };
  }
}

export const forDatabaseMySqlAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule.forRoot()],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleAsyncOptions> =>
    TypeOrmConfig.getMySqlConfig(configService),
  inject: [ConfigService],
};
