const Contenedor = require("../container");
const carrito = new Contenedor("./storage/carrito.txt");

const allCarts = async (req, res) => {
  try {
    const products = await carrito.getAll();
    res.json(products);
  } catch {
    res.json(error);
  }
};

const postCart = async (req, res) => {
  try {
    let timestamp = new Date().toLocaleString();
    const { body } = req;
    carrito.save({ productos: body, timestamp });
    res.json(await carrito.getAll());
  } catch (error) {
    res.json(error);
  }
};

const getCart = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await carrito.getById(id);
    const item = producto.productos;
    res.json(item);
  } catch (error) {
    res.json(error);
  }
};

const deleteCart = async (req, res) => {
  try {
    const carros = await carrito.getAll()
    const { id } = req.params;
    deleteCart = await carrito.deleteById(id);
    res.json(carros);
  } catch (error) {
    res.json(error);
  }
};

const postProductToCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const producto = await carrito.getById(id);
    const item = producto.productos;
    item.push(body);
    res.json(item);
  } catch (error) {
    res.json(error);
  }
};

const deleteCartProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_prod } = req.params;
    await carrito.deleteItem(id, id_prod);
    res.json("Producto eliminado con éxito.");
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  allCarts,
  postCart,
  getCart,
  deleteCart,
  deleteCartProduct,
  postProductToCart,
};
