export class LoginUser{
    constructor(
        public email: string,
        public password: string
    ){}   
}

export interface TokenObj{
    token: string,
    username: string
}