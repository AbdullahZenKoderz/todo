import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleOptions,
  TypeOrmModuleAsyncOptions,
} from '@nestjs/typeorm';

export default class TypeOrmConfig {
  static getMySqlConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username:"root",
      password:"123456",
      database: 'todoDB',
      // entities:[],
      synchronize: true,
      // debug : false,
      autoLoadEntities: true,
      extra: {
        trustServerCertificate: true,
      }
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
