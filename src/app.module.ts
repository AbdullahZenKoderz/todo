import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './Modules/Auth/auth.module';
import { UserModule } from './Modules/Users/user.module';
import { TodoModule } from './Modules/Todos/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forDatabaseMySqlAsyncConfig } from './Config/Database/orm.config';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(forDatabaseMySqlAsyncConfig),
    // MODULES
    AuthModule,
    UserModule,
    TodoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
