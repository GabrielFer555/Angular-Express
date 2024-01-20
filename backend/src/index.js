const { PrismaClient } = require("@prisma/client")
const express = require("express");
const cors = require("cors")
const app = express();
const port = 3002;
const prisma = new PrismaClient();
const bodyParser = require('body-parser')

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


