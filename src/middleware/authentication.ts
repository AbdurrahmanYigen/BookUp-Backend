import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export class Authentication {
    private static SECRET_KEY = 'JWT_SECRET';
    private static JWT_OPTIONS : jwt.SignOptions = {
        expiresIn:3600 //in seconds
    };

    private static SALT_ROUNDS:number = 10;

    public static async generateToken(userdata : any) : Promise<string> {
        return jwt.sign(userdata, this.SECRET_KEY, this.JWT_OPTIONS)
    }

    public static async verifyToken(token:string) :Promise<string | object | null> {
        try{
            return jwt.verify(token,this.SECRET_KEY);
        }catch(e) {
            return null;
        }
    }

    public static async hashPassword(password:string){
        return bcrypt.hash(password,this.SALT_ROUNDS);
    }

    public static async comparePasswordWithHash(password:string, hash:string){
        try{
            const match  = bcrypt.compare(password,hash);
            return match;
        } catch(e) {
            return false;
        }
    }
}