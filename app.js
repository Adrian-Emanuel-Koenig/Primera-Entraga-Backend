const express = require("express");
const { Router } = require("express");
const app = express();
const routerProductos = Router();
const routerCarrito = Router();
const port = process.env.port || 8080;

const {
  allCarts,
  postCart,
  getCart,
  deleteCart,
  postProductToCart,
  deleteCartProduct,
} = require("./functions/cart");

const {
  allProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
} = require("./functions/products");

app.listen(port, () => {
  console.log("Server On => http://localhost:" + port);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("Primera entrega del proyecto final. Aplicación eCommerce Backend");
});

/* -------------------------------------------------------------------------- */
/*                                   Router                                   */
/* -------------------------------------------------------------------------- */

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);
app.use((req, res) => {
  res.json({
    Error: true,
    Code: 404,
    message: "Ruta no encontrada.",
  });
});
/* -------------------------------------------------------------------------- */
/*                                  Permisos                                  */
/* -------------------------------------------------------------------------- */

const administrador = true;
const admin = (req, res, next) => {
  administrador
    ? next()
    : res.json({
        error: -1,
        message: "No autorizado.",
      });
};

/* -------------------------------------------------------------------------- */
/*                                  Productos                                 */
/* -------------------------------------------------------------------------- */

routerProductos.get("/", allProducts);

routerProductos.get("/:id", getProduct);
routerProductos.post("/", admin, postProduct);
routerProductos.put("/:id", admin, putProduct);
routerProductos.delete("/:id", admin, deleteProduct);

/* -------------------------------------------------------------------------- */
/*                                   Carrito                                  */
/* -------------------------------------------------------------------------- */

routerCarrito.get("/", allCarts);

routerCarrito.post("/", postCart);
routerCarrito.delete("/:id", deleteCart);
routerCarrito.get("/:id/productos", getCart);
routerCarrito.post("/:id/productos/:id_prod", postProductToCart);
routerCarrito.delete("/:id/productos/:id_prod", deleteCartProduct);
