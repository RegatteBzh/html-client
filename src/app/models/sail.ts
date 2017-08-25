import 'rxjs/add/operator/toPromise';

export class Sail {

    public id: Number;
    public name: String;
    public type: String;

    constructor(
        type?: string,
        name?: string,
        id?: Number
    ) {
        this.type = type;
        this.name = name;
        this.id = id;
    }

}

