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

// Carpeta de archivos static:
app.use(express.static("public"));

// POST en la ruta '/productos' (en el formulario el atributo "action" debe dirigir a esta ruta):
app.post("/productos", async (req, res) => {
  const { body } = req;

  await contenedor.saveNewProduct(body);

  // Debe re-dirigir de vuelta al formulario que está en la ruta raíz:
  res.redirect("/");
});

// PUG
app.set("views", "./views/");
app.set("view engine", "pug");

// Vista de productos:
app.get("/productos", async (req, res) => {
  const productos = await contenedor.getAll();

  // Renderiza el archivo de Pug con la información proveniente del método 'getAll()'
  res.render("vistaProductos", { productos });
});

app.get("/", (req, res) => {
  // Renderiza el archivo bodyForm.hbs dentro del layout llamado 'layoutFrame'.
  // Lo llamé 'bodyForm' pero lo pueden llamar como quieran.
  res.render("bodyForm", { layout: "layoutFrame" });
});
