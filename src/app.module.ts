import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import appConfig from './shared/config/config';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { BlogModule } from './blog/blog.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', //appConfig().database.type
      host: appConfig().database.host,
      port: appConfig().database.port,
      username: appConfig().database.username,
      password: appConfig().database.password,
      database: appConfig().database.name,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    BlogModule,
  ],
})
export class AppModule {}
