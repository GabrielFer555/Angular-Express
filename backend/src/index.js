const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv/config')
const contato = require("./cadastroContatos")


const port = process.env.PORT;
const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use("/contatos", contato)



app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})


