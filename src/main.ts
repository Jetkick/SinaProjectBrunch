import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true, // 주소를 지정하고 싶을때는 URL을 넣는다.
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
