import express from "express";
import dotenv from "dotenv";
import pool from "./db.js";  
import { buscarEArmazenarClima } from "./weather.js"; 

dotenv.config();

const app = express();
app.use(express.json());

app.use(express.static("public"));

app.get("/clima", async (req, res) => {
    try {
        const dados = await pool.query("SELECT * FROM clima ORDER BY id DESC LIMIT 1");
        res.json(dados.rows[0] || {});
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

app.get("/atualizar", async (req, res) => {
    try {
        await buscarEArmazenarClima(); 
        res.json({ mensagem: "Clima atualizado com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
