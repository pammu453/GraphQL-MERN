import express from "express";
import dotenv from "dotenv"
import { createHandler } from 'graphql-http/lib/use/express'
import { ruruHTML } from 'ruru/server'
import graphSchema from './schema/schema.js'
import connectDB from "./config/db.js";
import cors from 'cors'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000
connectDB()

app.use(cors())

app.all(
    "/graphql",
    createHandler({
        schema: graphSchema,
        graphqil: process.env.NODE_ENV === "development"
    })
)

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/graphql" }))
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})