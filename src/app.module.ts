import { TypeOrmConfig } from './utils/TypeOrmConfig';
import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
// import { AppService } from './app.service';
import { Configuration } from './utils/Configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfig,
    }),
    AdminModule,
    AuthModule
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
