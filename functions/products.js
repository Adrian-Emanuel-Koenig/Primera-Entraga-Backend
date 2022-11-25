const Contenedor = require("../container");
const productos = new Contenedor("./storage/productos.txt");

const allProducts = async (req, res) => {
  try {
    const products = await productos.getAll();
    res.json(products);
  } catch (error) {
    res.json(error);
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await productos.getById(id));
  } catch (error) {
    res.json(error);
  }
};

const postProduct = async (req, res) => {
  try {
    let timestamp = new Date().toLocaleString();
    const { body } = req;
    await productos.save({ body, timestamp });
    res.json(body);
  } catch (error) {
    res.json(error);
  }
};

const putProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const editarProducto = await productos.editProduct(id, body);
    res.json(editarProducto);
  } catch (error) {
    res.json(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productos.deleteById(id);
    res.json("Producto eliminado con éxito.");
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  allProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
};
