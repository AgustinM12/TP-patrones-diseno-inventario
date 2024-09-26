// ! Ejercicio 1: Integrar Sistema de Facturación Antiguo
// ! Objetivo: Implementar el patrón Adaptador para integrar un sistema antiguo de facturación con
// ! el nuevo sistema de inventario.
// ! ● Crear una clase FacturacionVieja que tenga métodos como crearFactura y
// ! obtenerFactura.
// ! ● Implementar una clase AdaptadorFacturacion que permita utilizar FacturacionVieja con
// ! la nueva interfaz IFacturacion, la cual requiere métodos como generarFactura y
// ! consultarFactura.
// ! ● Asegurar que las facturas generadas a través del adaptador sean compatibles con el
// ! nuevo sistema de inventario.

interface Factura {
    id: number,
    nombre: string,
    desc: string,
    fecha: string,
    monto: number
}

class FacturacionVieja {

    private facturas: Factura[] = []

    public crearFactura(nombre: string, desc: string, fecha: string, monto: number): void {

        const factura = {
            nombre, desc, fecha, monto, id: this.facturas.length
        }
        this.facturas.push(factura)
        return console.log("Factura registrada con exito");
    }

    public obtenerFactura(id: number): Factura | void {
        if (this.facturas[id]) {
            return this.facturas[id]
        } else {
            return console.log("No existe tal factura");
        }
    }

    public obtenerFacturas(): Factura[] | [] {
        return this.facturas
    }
}

class AdaptadorFacturacion {

    private facturacionVieja: FacturacionVieja;

    constructor(facturacionVieja: FacturacionVieja) {
        this.facturacionVieja = facturacionVieja
    }

    public generarFactura(nombre: string, desc: string, monto: number): void {

        const fecha = new Date().toISOString();

        this.facturacionVieja.crearFactura(nombre, desc, fecha, monto)

    }

    public consultarFactura(nombre: string): void {

        const facturas = this.facturacionVieja.obtenerFacturas()

        const factura = facturas.find(factura => factura.nombre === nombre)

        if (factura) {
            return console.log(factura);
        } else {
            return console.log("No exite tal factura");
        }
    }
}

// * Uso del patron adaptador
console.log("NUEVA FACTURACION");
const facturaVieja = new FacturacionVieja()
const adaptadorFactura = new AdaptadorFacturacion(facturaVieja)
adaptadorFactura.generarFactura("cable", "factura del cable", 5000)
adaptadorFactura.consultarFactura("cable")
adaptadorFactura.consultarFactura("internet")

console.log("ANTIGUA FACTURACION");
facturaVieja.crearFactura("telefono", "factura del telefono", "16/06/2024", 5000)
console.log(facturaVieja.obtenerFactura(1));
