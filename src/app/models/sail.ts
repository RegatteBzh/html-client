
export class Sail {

    public id: number;
    public name: string;
    public type: string;

    constructor(
        type?: string,
        name?: string,
        id?: number
    ) {
        this.type = type;
        this.name = name;
        this.id = id;
    }

}

