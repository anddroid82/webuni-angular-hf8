export class User {
    id: string = '';
    username:string = '';
    email:string = '';
    password?:string='';

    constructor(i:string, n:string, e:string, p?:string) {
        this.id=i;
        this.username=n;
        this.email=e;
        this.password=p;
    }
}
