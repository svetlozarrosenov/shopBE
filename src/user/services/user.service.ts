import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../../user/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    public constructor(@InjectModel('UserSchema') private userSchema: Model<UserDocument>){}
    public async register({firstName, lastName, email, password}): Promise<any> {
        return await this.userSchema.insertMany({
            firstName,
            lastName,
            email,
            password: await bcrypt.hash(password, 10)
        });
    }

    public async findOne(email: string): Promise<UserDocument> {
        return await this.userSchema.findOne({email}).lean();
    }
}
