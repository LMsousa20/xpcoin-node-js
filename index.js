const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { Pool } = require('pg')
const PORT = 3333
let comunicacao;

function testeNaTela(xpcoin) {
    var pagina = `
    <h1>DEU CERTO CARALHO</h1>
    <h2>${PORT}</h2>
    <h1>Sua pontuação e ${xpcoin}</h1>
    `
    return pagina
}

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL
})
const app = express()
app.use(express.json())
app.use(cors())
app.listen(PORT, () => {comunicacao = true} )
app.get('/', (req, res) => { console.log('Olá mundo') })

app.get('/users', async (req, res) => {
    try {
        const { rows } = await pool.query(`SELECT * FROM cliente`)
        return res.status(200).send(rows)
    }
    catch (err) {
        return res.status(400).send(err)
    }
})

app.get('/users/:idclient', async (req, res) => {
    var client = req.params.idclient;
    console.log(client)

    try {
        const retorno = await pool.query(`SELECT * FROM cliente WHERE cpf_cnpj = '${client}'`)
        var reposta = res.status(200).send(testeNaTela(retorno.rows[0].qntd_pontos))
        
        return reposta
    }
    catch (err) {
        return res.status(400).send(err)
    }
})

app.get('/name', async (req,res)=> {
    const deu = await testeNaTela(69);
    
        
        return res.status(200).send(deu)
})

// app.get('/:name', async (req,res)=> {
//     var namqe = req.params;
//     console.log(namqe.name)})