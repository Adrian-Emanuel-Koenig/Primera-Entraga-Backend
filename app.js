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
        message: "No autorizado.",
      });
};

app.get("/", (req, res) => {
  res.json("Primera entrega del proyecto final. Aplicación eCommerce Backend");
});

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
routerCarrito.post("/:id/productos", postProductToCart);

routerCarrito.delete("/:id/productos/:id_prod", deleteCartProduct);
