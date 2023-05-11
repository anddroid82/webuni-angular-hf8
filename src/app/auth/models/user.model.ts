export class User {
    id: string = '';
    name:string = '';
    email:string = '';
    password?:string='';

    constructor(i:string, n:string, e:string, p?:string) {
        this.id=i;
        this.name=n;
        this.email=e;
        this.password=p;
    }
}
