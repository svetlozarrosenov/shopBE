import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './controllers/auth.controller';

@Module({
    imports: [
        UserModule, 
        PassportModule,
        JwtModule.register({
        secret: `${process.env.PASSPORT_SECRET}`,
        signOptions: { expiresIn: '1h' },
      })],
    exports: [AuthService],
    providers: [AuthService, JwtStrategy, LocalStrategy],
    controllers: [AuthController]
})
export class AuthModule {}
