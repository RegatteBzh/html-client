export class Player {

    public id: string;
    public name: string;
    public nic: string;
    public email: string;

    constructor(
        id?: string,
        name?: string,
        email?: string,
        nic?: string,
    ) {
        this.email = email;
        this.name = name;
        this.id = id;
        this.nic = nic;
    }

}

export class AuthCheckout {
  token: string;
}
