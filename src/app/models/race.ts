import 'rxjs/add/operator/toPromise';

export class Race {

    public id: Number;
    public name: String;

    constructor(
        name?: string,
        id?: Number
    ) {
        this.name = name;
        this.id = id;
    }

}

