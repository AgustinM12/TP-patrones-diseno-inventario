// ! Ejercicio 1: Notificación de Mantenimiento Preventivo
// ! Objetivo: Utilizar el patrón Observer para notificar al departamento de mantenimiento cuando
// ! un equipo alcanza un cierto tiempo de uso.
// ! ● Crear una clase DepartamentoMantenimiento que actúe como observador y reciba
// ! notificaciones cuando un equipo necesite mantenimiento preventivo.
// ! ● Implementar la clase Equipo que permita agregar observadores y notifique a los
// ! observadores cuando su tiempo de uso alcance un umbral definido.
// ! ● Definir propiedades como nombre, tipo, estado y tiempoUso en la clase Equipo.

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

const dispositivo = new Equipo("Notebook HP", 0, true)
const mantenimiento = new Soporte()

dispositivo.agregarMantenimiento(mantenimiento)
dispositivo.usarDispositivo()

