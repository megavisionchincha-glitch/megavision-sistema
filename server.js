const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get("/", (req, res) => {
  res.send("MEGAVISIÓN - Sistema funcionando correctamente");
});

app.get("/contactos", async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT * FROM contactos ORDER BY fecha_registro DESC"
    );

    res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al obtener los contactos"
    });
  }
});

app.post("/contactos", async (req, res) => {
  try {
    const {
      nombres,
      celular,
      dni,
      departamento,
      observaciones
    } = req.body;

    const resultado = await pool.query(
      `INSERT INTO contactos
       (nombres, celular, dni, departamento, observaciones)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [nombres, celular, dni, departamento, observaciones]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al guardar el contacto"
    });
  }
});

app.listen(PORT, () => {
  console.log(`MEGAVISIÓN funcionando en puerto ${PORT}`);
});
