const Contenedor = require("../container");
const productos = new Contenedor("./storage/productos.txt");

const allProducts = async (req, res) => {
  const products = await productos.getAll();
  res.json(products);
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
  let timestamp = new Date().toLocaleString();
  const { body } = req;
  await productos.save({ body, timestamp });
  res.json(body);
};

const putProduct = async (req, res) => {
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
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await productos.deleteById(id)
  res.json("Producto eliminado con éxito.");
};

module.exports = { allProducts, getProduct, postProduct, putProduct, deleteProduct };
