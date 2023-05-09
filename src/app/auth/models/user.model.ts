export class User {
    id: string = '';
    username:string = '';
    email:string = '';

    constructor(i:string, n:string, e:string) {
        this.id=i;
        this.username=n;
        this.email=e;
    }
}
