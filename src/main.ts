import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = new DocumentBuilder()
  .setTitle("Todo Backend Application")
  .setDescription("Todo backend api documentation")
  .setVersion("1.0.0")
  .addTag('')
  .addBearerAuth(
    {type:"http",scheme:"bearer",bearerFormat:"JWT"},
    'jwt'
  )
  .build();
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document);
  app.enableCors();

  await app.listen(process.env.PORT);
}
bootstrap();
