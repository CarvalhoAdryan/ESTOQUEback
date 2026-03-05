import express from 'express'
import { postgres } from './DataBasePG.js'

const app = express()
app.use(express.json())

const port = process.env.PORT
const db = new postgres()

app.post("/produtos", async (req,res) => {
    const prod = req.body
    const newprod = await db.InsertProd(prod)
    res.status(201).json(newprod)
})

app.get("/produtos", async (req,res) => {
    const prod = await db.SelectionProds()
    res.json(prod)
    console.log(prod)
})

app.put("/produto-venda/:id", async(req,res) => {
    const { id } = req.params 
    const prod = await db.SubtractProd(id)
    res.status(200).json(prod)
})

app.put("/produto-compra/:id", async(req,res) => {
    const { id } = req.params 
    const prod = await db.SumProd(id)
    res.status(200).json(prod)
})

app.listen(port)

console.log("Backend Rodando")