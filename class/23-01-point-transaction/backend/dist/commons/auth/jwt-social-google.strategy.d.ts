declare const JwtGoogleStrategy_base: new (...args: any[]) => any;
export declare class JwtGoogleStrategy extends JwtGoogleStrategy_base {
    constructor();
    validate(accessToken: string, refreshToken: string, profile: any): {
        email: any;
        password: string;
        name: any;
        age: number;
    };
}
export {};
