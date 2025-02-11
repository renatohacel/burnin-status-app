
import bcrypt from 'bcrypt';
import { User } from '../schemas/user.schema.js';


export class AuthModel {
    static async login({ username, password }) {
        const user = await User.findOne({ where: { username } });
        if (!user) return null;

        const isValidPass = await bcrypt.compare(password, user.password);
        if (!isValidPass) return false;

        const { password: _, ...publicUser } = user.toJSON();

        return publicUser;
    }
}