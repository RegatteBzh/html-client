export class Paginate<T> {

    public page = 0;
    public perPage = 0;
    public count = 0;
    public maxPage = 0;
    public data: T[];

    constructor(
        data?: T[]
    ) {
        this.data = data || [];
    }

}
