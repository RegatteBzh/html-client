export class Sail {

    public id: string;
    public name: string;
    public type: string;

    constructor(
        type?: string,
        name?: string,
        id?: string
    ) {
        this.type = type;
        this.name = name;
        this.id = id;
    }

}

