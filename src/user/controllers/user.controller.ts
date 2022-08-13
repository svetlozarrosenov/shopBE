import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDto } from '../../user/dto/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
    public constructor(
        private userService: UserService,
    ){}

    @Post('register')
    public async register(@Body() userDto: UserDto): Promise<{status, text}> {
        let message = {
            status: 'success',
            text: 'User Created!'
        };

        let user = await this.userService.register(userDto);
        if(!user) {
            message.status = 'failed';
            message.text = 'User was not created';
        }
        return message;
    }

    
}
