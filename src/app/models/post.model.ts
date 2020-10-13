export class Post {
    img: string;
    constructor(
        public author: number,
        public content: string,
        public like: number,
        public msg: number,
        public date: number
    ) {}
}