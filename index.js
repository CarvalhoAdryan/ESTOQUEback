import express from 'express'
import { postgres } from './DataBasePG.js'
import cors from 'cors'

const app = express()

app.use(cors())
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

app.get("/produtos/:id", async(req,res) =>{
    const { id } = req.params
    const prod = await db.SelectionProd(id)
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

app.put("/produto-compra/:id/:number", async(req,res) =>{
    const { id, number } = req.params
    const prod = await db.SumProds(id, number)
    res.status(200).json(prod)
})

app.put("/produto-venda/:id/:number", async(req,res) =>{
    const { id, number } = req.params
    const prod = await db.SubtractProds(id, number)
    res.status(200).json(prod)
})

app.put("/produtos/:id", async(req,res) => {
    const { id } = req.params
    const corpo = req.body
    await db.UpdateProd(id, corpo)
    res.status(200)
})

app.delete("/produtos/:id", async(req,res) => {
    const { id } = req.params
    const prod = await db.DeleteProd(id)
    res.status(204)
})




app.listen(port)

console.log("Backend Rodando")