// ! Ejercicio 2: Actualización de Inventario en Tiempo Real
// ! Objetivo: Implementar el patrón Observer para actualizar en tiempo real la interfaz de usuario
// ! cuando se realicen cambios en el inventario.
// ! ● Crear una clase InterfazUsuario que actúe como observador y actualice la
// ! visualización del inventario cuando se agreguen, eliminen o modifiquen equipos.
// ! ● Modificar la clase Inventario para que permita agregar observadores y notifique a los
// ! observadores correspondientes cuando ocurra un cambio en la lista de equipos.
// ! ● Asegurar que múltiples instancias de InterfazUsuario puedan recibir y manejar las
// ! notificaciones adecuadamente.

//  * Interfaz Observador
interface Observador {
    actualizar(inventario: Inventario, mensaje: string): void
}

// * Interfaz para el dispositivo
interface InventarioDispositivos {
    nombre: string,
    tipo: string,
    precio: number,
    desc: string
}

// * Clase Inventario
class Inventario {
    private observadores: Observador[] = []
    private dispositivos: InventarioDispositivos[] = []

    constructor(private nombre: string, private tipo: string, private precio: number, private desc: string) { }

    public agregarObservadores(mantenimiento: Observador): void {
        this.observadores.push(mantenimiento)
    }

    private notificarObservadores(mensaje: string): void {
        this.observadores.forEach(obs => obs.actualizar(this, mensaje));
    }

    public getInventario(): InventarioDispositivos[] {
        return this.dispositivos
    }

    public setDispositivo(nombre: string, tipo: string, precio: number, desc: string): void {
        this.dispositivos.push({ nombre, tipo, precio, desc })
        this.notificarObservadores(`Nuevo dispositivo añadido: ${nombre}`);
    }

    public updateNombre(nombre: string, id: number): void {
        this.dispositivos[id].nombre = nombre
        this.notificarObservadores(`Nombre del dispositivo actualizado a: ${nombre}`);
    }

    public updateDesc(desc: string, id: number): void {
        this.dispositivos[id].desc = desc
        this.notificarObservadores(`Descripción del dispositivo actualizada.`);
    }

    public updateTipo(tipo: string, id: number): void {
        this.dispositivos[id].tipo = tipo
        this.notificarObservadores(`Tipo de dispositivo actualizado a: ${tipo}`);
    }

    public updatePrecio(precio: number, id: number): void {
        this.dispositivos[id].precio = precio
        this.notificarObservadores(`Precio del dispositivo actualizado a: ${precio}`);
    }

    public deleteDispositivo(id: number): void {
        const eliminado = this.dispositivos.splice(id, 1); // Corregido el uso de splice
        if (eliminado.length > 0) {
            this.notificarObservadores(`Dispositivo eliminado: ${eliminado[0].nombre}`);
        }
    }
}

// Clase InterfazUsuario
class InterfazUsuario implements Observador {
    // Implementar método actualizar con mensaje
    actualizar(inventario: Inventario, mensaje: string): void {
        console.log(`Actualización de inventario: ${mensaje}`);
    }
}

// Ejemplo de uso
const inventario = new Inventario("PC", "Desktop", 1000, "Computadora de escritorio");
const interfaz1 = new InterfazUsuario();

inventario.agregarObservadores(interfaz1);

// Realizar operaciones en el inventario
inventario.setDispositivo("Laptop", "Portatil", 1200, "Notebook de nueva generacion");
inventario.updatePrecio(1300, 0);
inventario.deleteDispositivo(0);
