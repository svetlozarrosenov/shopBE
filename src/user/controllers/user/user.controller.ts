import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { UserDto } from '../../../user/dto/user.dto';

@Controller('user')
export class UserController {
    public constructor(private userService: UserService){}

    @Post('register')
    public async register(@Body() userDto: UserDto): Promise<string> {
        console.log('crb_from_hereee')
        console.log(userDto)
        await this.userService.register(userDto);
        return '';
    }
}
