import { Controller, Post, UseGuards, Request, Res } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth.service';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    public constructor(
        private authService: AuthService
    ){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    public async login(
        @Request() req, 
        @Res({ passthrough: true }) res: Response
    ){
        const token = await this.authService.login(req.user);
        console.log('crb_here')
        console.log(token)
        const cookiesOpts = {
            httpOnly: true,
          };
        res.cookie('access_token', token.access_token, cookiesOpts);
        return token;
    }
}
