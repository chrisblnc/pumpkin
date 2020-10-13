export class Message {
    img: string;
    constructor(
        public author: number,
        public msg: string,
        public post: number,
        public like: number,
        public date: number
    ) {}
}