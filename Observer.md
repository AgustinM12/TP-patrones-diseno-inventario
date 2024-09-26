# Ejercicio 1: Notificación de Mantenimiento Preventivo
### Objetivo: Utilizar el patrón Observer para notificar al departamento de mantenimiento cuando un equipo alcanza un cierto tiempo de uso.
● Crear una clase DepartamentoMantenimiento que actúe como observador y reciba
notificaciones cuando un equipo necesite mantenimiento preventivo.
● Implementar la clase Equipo que permita agregar observadores y notifique a los
observadores cuando su tiempo de uso alcance un umbral definido.
● Definir propiedades como nombre, tipo, estado y tiempoUso en la clase Equipo.

```typescript
interface DepartamentoMantenimiento {
    actualizar(equipo: Equipo): void
}

class Equipo {
    private observadores: DepartamentoMantenimiento[] = []

    constructor(private nombre: string, private mesesUso: number, private estado: boolean) {

    }

    public agregarMantenimiento(mantenimiento: DepartamentoMantenimiento): void {
        this.observadores.push(mantenimiento)
    }

    private notificarObservadores(): void {
        this.observadores.forEach(obs => obs.actualizar(this));
    }

    public cambiarEstado(nuevoEstado: boolean): void {
        this.estado = nuevoEstado;
        this.notificarObservadores();
    }

    public updateUseMonth(): void {
        this.mesesUso++;
        console.log(`Meses de uso de ${this.getNombre()} = ${this.mesesUso}`);

        // Si llega a 6 meses de uso, se cambia el estado a false y se notifica a los observadores
        if (this.mesesUso === 6) {
            this.cambiarEstado(false);
        }
    }

    public getNombre(): string {
        return this.nombre
    }

    public getMonths(): number {
        return this.mesesUso
    }

    public async usarDispositivo(): Promise<void> {
        // Simulación del uso del dispositivo durante varios meses
        for (let i = 0; i < 6; i++) {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulación de tiempo
            this.updateUseMonth(); 
        }
    }
}

class Soporte implements DepartamentoMantenimiento {
    actualizar(equipo: Equipo): void {
        console.log(`${equipo.getNombre()} ha pasado 6 meses de uso, necesita mantenimiento`);
    }
}
```

# Ejercicio 2: Actualización de Inventario en Tiempo Real
### Objetivo: Implementar el patrón Observer para actualizar en tiempo real la interfaz de usuario cuando se realicen cambios en el inventario.
● Crear una clase InterfazUsuario que actúe como observador y actualice la
visualización del inventario cuando se agreguen, eliminen o modifiquen equipos.
● Modificar la clase Inventario para que permita agregar observadores y notifique a los
observadores correspondientes cuando ocurra un cambio en la lista de equipos.
● Asegurar que múltiples instancias de InterfazUsuario puedan recibir y manejar las
notificaciones adecuadamente.

```typescript
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
```