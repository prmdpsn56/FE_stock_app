export class RegisterCompany {
    code:string;
    name:string;
    ceo:string;
    turnover:string;
    website:string;
    exchange:string;
    constructor(code:string,name:string,ceo:string,turnover:string,website:string,exchange:string){
        this.code = code;
        this.name = name;
        this.ceo = ceo;
        this.turnover = turnover;
        this.website = website
        this.exchange = exchange;
    }
}
