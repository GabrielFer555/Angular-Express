const express = require('express')
const {PrismaClient} = require("@prisma/client")


const prisma = new PrismaClient();

const cadastrosRouter = express.Router()


cadastrosRouter.get('/', async (req, res) => {
    try {
        let contacts = await prisma.contato.findMany();
        return res.status(200).json({ contatos: contacts })
    } catch (err) {
        return res.status(500).json({ message: err })
    }
})

cadastrosRouter.get("/:id", async (req, res) => {
    try {
        const contact = await prisma.contato.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });

        if (!contact) {
            return res.status(404).json({ message: "Not found" });
        } else {
            return res.status(200).json(contact);
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

cadastrosRouter.post("/", async (req, res) => {

    if(!req.body.nome || req.body.nome == ''){
        return res.status(400).json({erro:"Contato sem nome informado"})
    }
    if(!req.body.email || req.body.email == ''){
        return res.status(400).json({erro:"Contato sem email informado"})
    }
    if(!req.body.fone || req.body.fone == ''){
        return res.status(400).json({erro:"Contato precisa ter um telefone informado"})
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
 
module.exports = cadastrosRouter;