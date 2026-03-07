import { sql } from "./bd.js";

await sql`
    CREATE TABLE produtos(
        id SERIAL PRIMARY KEY,
        produto VARCHAR(100) NOT NULL,
        preço DECIMAL(19,2) NOT NULL,
        quantidade INT NOT NULL
    )
`