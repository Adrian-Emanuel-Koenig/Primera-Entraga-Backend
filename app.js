const express = require("express");
const { Router } = require("express");
const Contenedor = require("./container.js");
const productos = new Contenedor("productos.txt");
const carrito = new Contenedor("carrito.txt");
const app = express();
const routerProductos = Router();
const routerCarrito = Router();
const port = process.env.port || 8080;

app.listen(port, () => {
  console.log("Server On. http://localhost:" + port);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
/* -------------------------------------------------------------------------- */
/*                                   Router                                   */
/* -------------------------------------------------------------------------- */
app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

/* -------------------------------------------------------------------------- */
/*                                  Permisos                                  */
/* -------------------------------------------------------------------------- */

const administrador = true;
const admin = (req, res, next) => {
  administrador
    ? next()
    : res.json({
        error: -1,
        message: "No tienes los permisos suficientes para realizar esta acción",
      });
};

/* -------------------------------------------------------------------------- */
/*                                   Metodos                                  */
/* -------------------------------------------------------------------------- */
app.get("/", (req, res) => {
  res.json("Funcionando");
});

routerProductos.get("/", admin, async (req, res) => {
  const products = await productos.getAll();
  res.json(products);
});

routerProductos.get("/:id", admin, async (req, res) => {
  const { id } = req.params;
  res.json(await productos.getById(id));
});

routerProductos.post("/", admin, async (req, res) => {
  let timestamp = new Date().toLocaleString();
  const { body } = req;
  await productos.save({ body, timestamp });
  res.json(body);
});

routerProductos.put("/:id", admin, async (req, res) => {
  const products = await productos.getAll();
  const { id } = req.params;
  const { body } = req;
  const indice = products.findIndex((e) => e.id == id);
  if (indice >= 0) {
    products[indice] = body;
    res.json(body);
  } else {
    res.json("Error: Producto no encontrado.");
  }
});

routerProductos.delete("/:id", admin, async (req, res) => {
  const products = await productos.getAll();
  const { id } = req.params;
  const productosDelete = products.filter((e) => e.id != id);
  res.json(productosDelete);
});

/* -------------------------------------------------------------------------- */
/*                                   Carrito                                  */
/* -------------------------------------------------------------------------- */
routerCarrito.get("/", async (req, res) => {
  const products = await carrito.getAll();
  res.json(products);
});

routerCarrito.get("/:id", async (req, res) => {
  const products = await carrito.getAll();
  const { id } = req.params;
  const productoId = products.find((e) => e.id == id);
  if (!productoId) {
    res.json("Error: Producto no encontrado.");
  } else {
    res.json(productoId);
  }
});

routerCarrito.post("/", async (req, res) => {
  let timestamp = new Date().toLocaleString();
  const { body } = req;
  carrito.save({ productos: body, timestamp });
  res.json(await carrito.getAll());
});

routerProductos.put("/:id", async (req, res) => {
  const products = await carrito.getAll();
  const { id } = req.params;
  const { body } = req;
  const indice = products.findIndex((e) => e.id == id);
  if (indice >= 0) {
    products[indice] = body;
    res.json(body);
  } else {
    res.json("Error: Producto no encontrado.");
  }
});

routerCarrito.delete("/:id", async (req, res) => {
  const { id } = req.params;
  deleteCart = await carrito.deleteById(id);
  res.json(deleteCart);
});

routerCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
  const products = await carrito.getAll();
  const { id, id_prod } = req.params;
  const orden = carrito.getById(id);
  const productosDelete = products.filter((e) => e.id_prod != id_prod);
  res.json(productosDelete);
});
