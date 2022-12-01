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
    const timestamp = new Date().toLocaleString();
    const {id, nombre, descripción, código, thumbnail, precio, stock} = req.body;
    const data = {id, nombre, descripción, código, thumbnail, precio, stock, timestamp};
    await productos.save({ ...data });
    res.json({Mensaje:"Producto añadido con éxito.", Producto: data})
  } catch (error) {
    res.json(error);
  }
};

const putProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const editarProducto = await productos.editarProductos(id, body);
    res.json({Mensaje: "Producto editado con éxito.", Producto: editarProducto});
  } catch (error) {
    res.json(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const prodDel= await productos.deleteById(id);
    res.json({Producto: "n°"+ id +" "+prodDel});
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
