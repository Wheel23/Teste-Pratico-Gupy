import axios from "axios";
import pool from "./db.js"; 
import dotenv from "dotenv";

dotenv.config();

export async function buscarEArmazenarClima() {
  try {
    const city = process.env.CITY;
    const apiKey = process.env.OPENWEATHER_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    const dados = response.data;

    await pool.query(`
      CREATE TABLE IF NOT EXISTS clima (
        id SERIAL PRIMARY KEY,
        cidade VARCHAR(100),
        temperatura NUMERIC,
        descricao VARCHAR(100),
        data_hora TIMESTAMP DEFAULT NOW()
      );
    `);

    
    await pool.query(
      `INSERT INTO clima (cidade, temperatura, descricao) VALUES ($1, $2, $3)`,
      [dados.name, dados.main.temp, dados.weather[0].description]
    );

    console.log("Dados inseridos no banco!");
  } catch (err) {
    console.error("Erro ao buscar/armazenar clima:", err);
  }
}

export async function consultarClima() {
  const result = await pool.query("SELECT * FROM clima ORDER BY id DESC LIMIT 20");
  return result.rows;
}
