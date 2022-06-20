export type CompanyDetail = {
        _id: string,
        code: string,
        name: string,
        ceo: string,
        turnover: string,
        website: string,
        exchange: string,
        createdAt: string,
        updatedAt: string,
        __v: number,
        stocksValue: Stock[]
}


export type Stock = {
    id: number,
    code: string,
    time: string,
    price: string
}