// ! Ejercicio 2: Fabricar Periféricos de Salida
// ! Objetivo: Implementar el patrón Factory Method para crear diferentes periféricos de salida.
// ! ● Crear una clase PerifericoSalidaFactory con un método crearPeriferico que, basado en
// ! el tipo ("Monitor", "Impresora", "Proyector"), devuelva una instancia de la clase
// ! correspondiente.
// ! ● Crear clases específicas para cada tipo de periférico (Monitor, Impresora, Proyector),
// ! con propiedades particulares (Ej.: resolución para Monitor, tipoImpresión para
// ! Impresora).
// ! ● Asegurar que el factory maneje correctamente la creación de cada periférico según el
// ! tipo especificado.

// ? Enum para tipos de dispositivos
enum TipoPeriferico {
    Monitor = "Monitor",
    Impresora = "Impresora",
    Proyector = "Proyector",
}

// ?  Clase base para todos los dispositivos de entrada
abstract class DispositivoSalida {
    constructor(public tipoConexion: string, public marca: string, public nombre: string) { }

}

// ? Clase para Monitor
class Monitor extends DispositivoSalida {

    resolucion: string

    constructor(tipoConexion: string, marca: string, nombre: string, resolucion: string) {
        super(tipoConexion, marca, nombre);
        this.resolucion = resolucion
    }

}

// ? Clase para Impresora
class Impresora extends DispositivoSalida {

    tipoImpresion: string

    constructor(tipoConexion: string, marca: string, nombre: string, tipoImpresion: string) {
        super(tipoConexion, marca, nombre);
        this.tipoImpresion = tipoImpresion
    }

}

// ? Clase para Proyector
class Proyector extends DispositivoSalida {

    entradsHDMI: number

    constructor(tipoConexion: string, marca: string, nombre: string, entradsHDMI: number) {
        super(tipoConexion, marca, nombre);
        this.entradsHDMI = entradsHDMI
    }

}

// ? Factory para crear los dispositivos de entrada
class PerifericoSalidaFactory {

    crearDispositivo(tipo: TipoPeriferico, tipoConexion: string, marca: string, nombre: string, parameter: string | number | boolean): DispositivoSalida | null {

        switch (tipo) {
            case TipoPeriferico.Impresora:
                if (typeof parameter == "string") {
                    return new Impresora(tipoConexion, marca, nombre, parameter);
                }
            case TipoPeriferico.Monitor:
                if (typeof parameter == "string") {
                    return new Monitor(tipoConexion, marca, nombre, parameter);
                }
            case TipoPeriferico.Proyector:
                if (typeof parameter == "number") {
                    return new Proyector(tipoConexion, marca, nombre, parameter);
                }
            default:
                console.log("Tipo de dispositivo no reconocido");
                return null;
        }
    }
}

// * Ejemplo de integración en un sistema de inventario
class InventarioDS {
    private dispositivos: DispositivoSalida[] = [];

    agregarDispositivo(dispositivo: DispositivoSalida) {
        this.dispositivos.push(dispositivo);
        console.log(`Dispositivo agregado: ${JSON.stringify(dispositivo)}`);
    }

    listarDispositivos() {
        return this.dispositivos.map((dispositivo) => dispositivo);
    }
}

// * Ejemplo de uso de Factory
const factorySalida = new PerifericoSalidaFactory();
const inventarioSalida = new InventarioDS();

const monitor = factorySalida.crearDispositivo(TipoPeriferico.Monitor, "USB", "Logitech", "teclado elevado", "4K");
const impresora = factorySalida.crearDispositivo(TipoPeriferico.Impresora, "Bluetooth", "Q-BOX", "Mouse simple", "HD");
const proyector = factorySalida.crearDispositivo(TipoPeriferico.Proyector, "Wi-Fi", "HP", "Scanner de QR", 4);

if (monitor) inventarioSalida.agregarDispositivo(monitor);
if (impresora) inventarioSalida.agregarDispositivo(impresora);
if (proyector) inventarioSalida.agregarDispositivo(proyector);

console.log("Dispositivos en inventario:", inventarioSalida.listarDispositivos());