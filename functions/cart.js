const Contenedor = require("../container");
const carrito = new Contenedor("./storage/carrito.txt");
const productos = new Contenedor("./storage/productos.txt");

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
    carrito.save({ productos: [], timestamp });
    res.json({ Mensaje: "Carro creado con éxito." });
  } catch (error) {
    res.json(error);
  }
};

const getCart = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await carrito.getById(id);
    if (!producto) {
      res.json({ Carro: "n°" + id + " no existe." });
    } else {
      const item = producto.productos;
      res.json({ Carro: "n°" + id, Productos: item });
    }
  } catch (error) {
    res.json(error);
  }
};

const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCart = await carrito.deleteById(id);
    res.json({ Carro: "n°" + id + " " + deleteCart });
  } catch (error) {
    res.json(error);
  }
};

const postProductToCart = async (req, res) => {
  try {
    const { id, id_prod } = req.params;
    const producto = await productos.getById(id_prod);

    if (!producto) {
      res.json("Este producto no existe.");
    } else {
      const postCarro = await carrito.editProduct(...id, producto);
      res.json({ Mensaje: "Cargado con éxito.", postCarro });
    }
  } catch (error) {
    res.json(error);
  }
};

const deleteCartProduct = async (req, res) => {
  try {
    const { id, id_prod } = req.params;
    const deleteItem = await carrito.deleteItem(id, id_prod);
    res.json({ Carro: deleteItem });
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
