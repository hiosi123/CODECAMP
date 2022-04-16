import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import { ICurrentUser } from 'src/commons/auth/gql-user.param';
export declare class AuthResovler {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    login(email: string, password: string, context: any): Promise<string>;
    restoreAccessToken(currentUser: ICurrentUser): string;
}
