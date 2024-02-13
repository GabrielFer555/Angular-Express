const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const validIfContactExists = async(id='1') => {
    const intId = parseInt(id)

    const contact = await prisma.contato.findUnique({
        where: {
            id: intId
        }
    });

    return !!contact
}

module.exports = {
    validIfContactExists: validIfContactExists
}