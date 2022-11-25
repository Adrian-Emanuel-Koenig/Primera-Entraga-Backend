const Contenedor = require("../container");
const carrito = new Contenedor("./storage/carrito.txt");

const allCarts = async (req, res) => {
  try {
    const products = await carrito.getAll();
    res.json(products);
  } catch {
    res.json("error");
  }
};

const postCart = async (req, res) => {
  let timestamp = new Date().toLocaleString();
  const { body } = req;
  carrito.save({ productos: body, timestamp });
  res.json(await carrito.getAll());
};

const getCart = async (req, res) => {
  const { id } = req.params;
  const producto = await carrito.getById(id);
  const item = producto.productos;
  res.json(item);
};

const deleteCart = async (req, res) => {
  const { id } = req.params;
  deleteCart = await carrito.deleteById(id);
  res.json(deleteCart);
};

const postProductToCart = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const producto = await carrito.getById(id);
  const item = producto.productos;
  item.push(body)
  res.json(item);
};
const deleteCartProduct = async (req, res) => {
  const { id, id_prod } = req.params;
  const orden = await carrito.getById(id);
  const productosDelete = orden.productos.filter((e) => e.id_prod != id_prod);
  // const deleteProduct = await orden.deleteById(id_prod)
  // res.json(deleteProduct);
  console.log(productosDelete);
  res.json(productosDelete);
};

// routerCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
//   const products = await carrito.getAll();
//   const { id, id_prod } = req.params;
//   const orden = carrito.getById(id);
//   const productosDelete = products.filter((e) => e.id_prod != id_prod);
// res.json(productosDelete);
// });
module.exports = { allCarts, postCart, getCart, deleteCart, deleteCartProduct,postProductToCart };
