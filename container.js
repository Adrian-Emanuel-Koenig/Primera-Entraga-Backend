const fs = require("fs");

class Contenedor {
  constructor(name) {
    this.file = name;
  }

  async save(product) {
    try {
      if (fs.existsSync(this.file)) {
        const productos = await this.getAll();
        if (productos.length > 0) {
          const lastId = productos[productos.length - 1].id + 1;
          product.id = lastId;
          productos.push(product);
          await fs.promises.writeFile(
            this.file,
            JSON.stringify(productos, null, 2)
          );
        } else {
          product.id = 1;
          await fs.promises.writeFile(
            this.file,
            JSON.stringify([product], null, 2)
          );
        }
      } else {
        product.id = 1;
        await fs.promises.writeFile(
          this.file,
          JSON.stringify([product], null, 2)
        );
      }
    } catch (error) {
      return "Error al guardar el producto";
    }
  }

  async getAll() {
    try {
      const contenido = await fs.promises.readFile(this.file, "utf-8");
      if (contenido.length > 0) {
        const productos = JSON.parse(contenido);
        return productos;
      } else {
        return [];
      }
    } catch (error) {
      return "El archivo no pudo ser leido.";
    }
  }

  async getById(id) {
    try {
      const productos = await this.getAll();
      const producto = productos.find((e) => e.id == id);
      return producto;
    } catch (error) {
      return "El producto no se encuentra";
    }
  }

  async deleteById(id) {
    try {
      const productos = await this.getAll();
      const newProducts = productos.filter((e) => e.id != id);
      await fs.promises.writeFile(
        this.file,
        JSON.stringify(newProducts, null, 2)
      );
      return "Producto Borrado con exito"
    } catch (error) {
      return "El producto no pudo ser borrado";
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.file, "");
    } catch {
      return "Error al vaciar el archivo";
    }
  }

  async editProduct(id, body) {
    try {
      const productos = await this.getAll();
      const itemId = productos.findIndex((e) => e.id == id);
      productos[itemId] = { ...productos[itemId], ...body };
      await fs.promises.writeFile(
        this.file,
        JSON.stringify(productos, null, 2)
      );
      return productos[itemId];
    } catch (error) {
      return "Error al modificar producto";
    }
  }

  async deleteItem(id, id_prod) {
    try {
      const cart = await this.getById(id);
      cart.productos = cart.productos.filter((e) => e.id != id_prod);
      await this.editProduct(id, cart);
      return cart;
    } catch (error) {
      return "Error al borrar producto.";
    }
  }
}

module.exports = Contenedor;
