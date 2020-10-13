export class User {
    img: string;
    constructor(
        public username: string,
        public email: string,
        public birthday: number,
        public create_at: number
    ) {}
}