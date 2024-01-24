import { PrismaClient } from "@prisma/client"
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import 'dotenv/config'
const port = process.env.PORT;
const app = express();
const prisma = new PrismaClient();

app.use(cors())
app.use(bodyParser.json())


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

app.get('/getAllContacts', async (req, res) => {
    try {
        let contacts = await prisma.contato.findMany();
        return res.status(200).json({ contatos: contacts })
    } catch (err) {
        return res.status(400).json({ message: err })
    }
})

app.get("/getContact/:id", async (req, res) => {
    try {
        const contact = await prisma.contato.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });

        if (!contact) {
            return res.status(404).json({ message: "Not found" });
        } else {
            return res.status(200).json({ contact });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

app.post("/createContact", async (req, res) => {

    if(!req.body.nome || req.body.nome == ''){
        return res.send(400).json({erro:"Contato sem nome informado"})
    }
    if(!req.body.email || req.body.email == ''){
        return res.send(400).json({erro:"Contato sem email informado"})
    }
    if(!req.body.fone || req.body.fone == ''){
        return res.send(400).json({erro:"Contato precisa ter um telefone informado"})
    }

    try {
        const newContact = await prisma.contato.create({
            data: {
                nome: req.body.nome,
                email:  req.body.email,
                fone: req.body.fone
            }
        })
        return res.status(201).json(newContact)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})


