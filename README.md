# Primera-Entraga-Backend

Postman

RUTAS

Router base Productos
"/api/productos"

GET("/") - http://localhost:8080/api/productos - Todos los productos.
GET("/:id") - http://localhost:8080/api/productos/:id - Producto por ID.
POST("/") - http://localhost:8080/api/productos - Agregar porductos.
PUT("/:id") - http://localhost:8080/api/productos/:id - Editar un objeto.
DELETE("/:id") - http://localhost:8080/api/productos/:id - Borrar producto.

Router base Carrito
"/api/carrito"

GET("/") - http://localhost:8080/api/carrito - Todos los productos.
POST("/") - http://localhost:8080/api/carrito - Crear carro.
DELETE("/:id") - http://localhost:8080/api/carrito/:id - Borrar carro.
GET("/:id/productos") - http://localhost:8080/api/carrito/:id/productos - Productos del carro.
POST("/:id/productos") - http://localhost:8080/api/carrito/:id/productos - Añadir producto al carro.
DELETE("/:id/productos/:id_prod") http://localhost:8080/api/carrito/:id/productos/:id_prod - Borrar producto del carro.