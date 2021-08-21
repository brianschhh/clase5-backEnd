const Contenedor = require("./src/contenedor");
let contenedor = new Contenedor("./src/productos.json");

const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log("Servidor en puerto 8080");
});

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/productos", async (req, res) => {
  let mostrar = await contenedor.getAll();
  res.render("productos", { mostrar });
});

app.get("/server", (req, res) => {
  res.send({ server: "Express" });
});

app.post("/productos", async (req, res) => {
  const { body } = req;

  await contenedor.saveNewProduct(body);

  res.redirect("/");
});
