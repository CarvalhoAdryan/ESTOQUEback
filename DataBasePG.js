import { sql } from "./bd.js"

export class postgres{

    async InsertProd(prod){
        const {produto,preco,quantidade} = prod
        const newprod = await sql`INSERT INTO produtos (produto,preco,quantidade) VALUES (${produto},${preco},${quantidade}) RETURNING *`

        return newprod
    }

    async SelectionProds(){
        const prod = await sql`SELECT * FROM produtos`
        return prod
    }

    async SubtractProd(id){
        const prod = await sql`UPDATE produtos SET quantidade = GREATEST(quantidade - 1, 0) WHERE id=${id} AND quantidade > 0 RETURNING *`
    }

    async SumProd(id){
        const prod = await sql`UPDATE produtos SET quantidade = quantidade + 1 WHERE id=${id} RETURNING *`
    }

}

