export class Player {

    public id: string;
    public name: string;
    public nic: string;
    public email: string;
    public admin: boolean;

    constructor(
        id?: string,
        name?: string,
        email?: string,
        nic?: string,
        admin?: boolean
    ) {
        this.email = email;
        this.name = name;
        this.id = id;
        this.nic = nic;
        this.admin = admin;
    }

}
