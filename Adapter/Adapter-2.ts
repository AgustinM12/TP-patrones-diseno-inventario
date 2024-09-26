// ! Ejercicio 2: Compatibilidad con APIs Externas
// ! Objetivo: Utilizar el patrón Adaptador para integrar una API externa de proveedores con el
// ! sistema de inventario existente.
// ! ● Crear una clase ProveedorExternoAPI que ofrezca métodos como fetchProductos y
// ! updateStock.
// ! ● Implementar una clase AdaptadorProveedor que permita utilizar ProveedorExternoAPI
// ! con la interfaz IProveedor, que requiere métodos como obtenerProductos y
// ! actualizarInventario.
// ! ● Asegurar que los datos obtenidos de la API externa se adapten correctamente al
// ! formato requerido por el sistema de inventario.

interface IProveedor {
    obtenerProductos(): Promise<NewProduct[] | boolean>,
    obtenerProducto(id: number): Promise<NewProduct | boolean>,
    actualizarInventario(id: number, payload: {}): Promise<{} | void>
}

interface Product {
    title: string,
    price: number,
    description: string,
    category: string,
    rating: {
        rate: number,
        count: number
    }
}

interface NewProduct {
    titulo: string,
    precio: string,
    descripcion: string,
    categoria: string,
    cantidad: number
    calificacion: number
}

class ProveedorExternoAPI {
    async fetchProductos(): Promise<Product[] | void> {
        try {
            const data = await fetch('https://fakestoreapi.com/products?limit=5');
            const dataJson = await data.json(); // Usamos 'await' aquí para esperar la resolución
            if (dataJson) {
                return dataJson as Product[]; // Forzamos el tipo
            } else {
                console.log("No hay datos que mostrar");
            }
        } catch (error) {
            console.log("Error al obtener datos");
        }
    }

    async fetchProducto(id: number): Promise<Product | void> {
        try {
            const data = await fetch('https://fakestoreapi.com/products/' + id);
            const dataJson = await data.json(); // Usamos 'await' aquí también
            if (dataJson) {
                return dataJson as Product; // Forzamos el tipo
            }
        } catch (error) {
            console.log("Error al obtener datos");
        }
    }

    async updateStock(id: number, payload: {}): Promise<any | void> {
        try {
            const data = await fetch("https://fakestoreapi.com/products/" + id, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const dataJson = await data.json(); // De nuevo, usamos 'await'
            if (dataJson) {
                return dataJson;
            } else {
                console.log("Error al actualizar stock");
            }
        } catch (error) {
            console.log("Error al actualizar stock", error);
        }
    }
}


class AdaptadorProveedor implements IProveedor {

    private proveedorViejo: ProveedorExternoAPI;

    constructor(proveedorViejo: ProveedorExternoAPI) {
        this.proveedorViejo = proveedorViejo
    }

    async obtenerProducto(id: number): Promise<NewProduct | boolean> {
        const productoViejo = await this.proveedorViejo.fetchProducto(id)

        if (productoViejo !== undefined) {
            const productoNuevo: NewProduct = {
                titulo: productoViejo.title,
                precio: `$ ${productoViejo.price} USD`,
                descripcion: productoViejo.description,
                categoria: productoViejo.category,
                cantidad: productoViejo.rating.count,
                calificacion: productoViejo.rating.rate
            }
            return productoNuevo
        } else {
            return false
        }
    }

    async obtenerProductos(): Promise<NewProduct[] | boolean> {
        const productosViejos = await this.proveedorViejo.fetchProductos();

        if (productosViejos !== undefined) {
            const productosNuevos = productosViejos.map((producto) => {
                const productoNuevo: NewProduct = {
                    titulo: producto.title,
                    precio: `$ ${producto.price} USD`,
                    descripcion: producto.description,
                    categoria: producto.category,
                    cantidad: producto.rating.count,
                    calificacion: producto.rating.rate
                };
                return productoNuevo;
            });
            return productosNuevos;
        } else {
            return false;
        }
    }

    async actualizarInventario(id: number, payload: {}): Promise<{ status: number, statusText: string, url: string } | void> {
        const oldResponse = await this.proveedorViejo.updateStock(id, payload)

        const newResponse = {
            status: oldResponse.status,
            statusText: oldResponse.statusText,
            url: oldResponse.url
        }

        return newResponse
    }

}

(async () => {
    console.log("VIEJOS PRODUCTOS");

    const proveedorExternoAPI = new ProveedorExternoAPI();

    const producto = await proveedorExternoAPI.fetchProducto(1);
    console.log("Producto específico:", producto);

    const productos = await proveedorExternoAPI.fetchProductos();
    console.log("Lista de productos:", productos);

    const updatedStock = await proveedorExternoAPI.updateStock(1, {
        title: 'Notebook HP',
        price: 840000,
        description: 'lorem ipsum set',
        category: 'electronic',
        "rating": {
            "rate": 4.2,
            "count": 1200
        }
    })
    console.log(updatedStock);

    console.log("NUEVOS PRODUCTOS");

    const adaptador = new AdaptadorProveedor(proveedorExternoAPI)
    const productoNuevo = await adaptador.obtenerProducto(1)
    console.log(productoNuevo);

    const productosNuevos = await adaptador.obtenerProductos()
    console.log(productosNuevos);

    const newResponse = await adaptador.actualizarInventario(1, { title: "Notebook HP", price: 8000 })
    console.log(newResponse);

})();
