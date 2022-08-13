import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    public async validateUser(email: string, pass: string) {
        const user = await this.userService.findOne(email);
        const verified = bcrypt.compareSync(pass, user.password);

        if(verified) {
            const {password, ...result} = user;
            return result;
        }

        throw new UnauthorizedException();
    }

    public async login(user: any): Promise<any> {
        const payload = { email: user.email, sub: user._id }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
