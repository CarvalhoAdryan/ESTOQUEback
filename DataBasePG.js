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

}

