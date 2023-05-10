export class Idea {
    id:string = '';
    name: string = '';
    description: string = '';
    votes:number = 0;

    constructor(id:string,name:string,description:string,votes:number) {
        this.id=id;
        this.name=name;
        this.description=description;
        this.votes=votes;
    }
}