// ! Ejercicio 1: Crear Dispositivos de Entrada
// ! Objetivo: Utilizar el patrón Factory Method para crear diferentes tipos de dispositivos de
// ! entrada.
// ! ● Crear una clase DispositivoEntradaFactory con un método crearDispositivo que,
// ! basado en el tipo de dispositivo ("Teclado", "Ratón", "Scanner"), devuelva una
// ! instancia de la clase adecuada.
// ! ● Crear clases específicas para cada tipo de dispositivo (Teclado, Ratón, Scanner), cada
// ! una con sus propias propiedades (Ej.: tipoConexion, marca).
// ! ● Integrar la creación de estos dispositivos en el sistema de inventario.

// ? Enum para tipos de dispositivos
enum TipoDispositivo {
    Teclado = "teclado",
    Raton = "raton",
    Scanner = "scanner",
}

// ?  Clase base para todos los dispositivos de entrada
abstract class DispositivoEntrada {
    constructor(public tipoConexion: string, public marca: string, public nombre: string) { }

    abstract descripcion(): string;
}

// ? Clase para Teclado
class Teclado extends DispositivoEntrada {

    tipoTeclado: string

    constructor(tipoConexion: string, marca: string, nombre: string, tipoTeclado: string) {
        super(tipoConexion, marca, nombre);
        this.tipoTeclado = tipoTeclado
    }

    descripcion(): string {
        return `Teclado - Conexión: ${this.tipoConexion}, Marca: ${this.marca} - Nombre: ${this.nombre} - Tipo de tacladoo: ${this.tipoTeclado}`;
    }
}

// ? Clase para Ratón
class Raton extends DispositivoEntrada {

    rgb: boolean
    constructor(tipoConexion: string, marca: string, nombre: string, rgb: boolean) {
        super(tipoConexion, marca, nombre);
        this.rgb = rgb
    }

    descripcion(): string {
        return `Raton - Conexión: ${this.tipoConexion}, Marca: ${this.marca} - Nombre: ${this.nombre} - RGB: ${this.rgb}`;
    }
}

// ? Clase para Scanner
class Scanner extends DispositivoEntrada {

    tamaño: number

    constructor(tipoConexion: string, marca: string, nombre: string, tamaño: number) {
        super(tipoConexion, marca, nombre);
        this.tamaño = tamaño
    }

    descripcion(): string {
        return `Scanner - Conexión: ${this.tipoConexion}, Marca: ${this.marca} - Nombre: ${this.nombre} - Tamaño: ${this.tamaño}`;
    }
}

// ? Factory para crear los dispositivos de entrada
class DispositivoEntradaFactory {
    crearDispositivo(tipo: TipoDispositivo, tipoConexion: string, marca: string, nombre: string, parameter: string | number | boolean): DispositivoEntrada | null {
        switch (tipo) {
            case TipoDispositivo.Teclado:
                if (typeof parameter == "string") {
                    return new Teclado(tipoConexion, marca, nombre, parameter);
                }
            case TipoDispositivo.Raton:
                if (typeof parameter == "boolean") {
                    return new Raton(tipoConexion, marca, nombre, parameter);
                }
            case TipoDispositivo.Scanner:
                if (typeof parameter == "number") {
                    return new Scanner(tipoConexion, marca, nombre, parameter);
                }
            default:
                console.log("Tipo de dispositivo no reconocido");
                return null;
        }
    }
}

// * Ejemplo de integración en un sistema de inventario
class Inventario {
    private dispositivos: DispositivoEntrada[] = [];

    agregarDispositivo(dispositivo: DispositivoEntrada) {
        this.dispositivos.push(dispositivo);
        console.log(`Dispositivo agregado: ${dispositivo.descripcion()}`);
    }

    listarDispositivos() {
        return this.dispositivos.map((dispositivo) => dispositivo);
    }
}

// * Ejemplo de uso de Factory
const factory = new DispositivoEntradaFactory();
const inventario = new Inventario();

const teclado = factory.crearDispositivo(TipoDispositivo.Teclado, "USB", "Logitech", "teclado elevado", "Reducido");
const raton = factory.crearDispositivo(TipoDispositivo.Raton, "Bluetooth", "Q-BOX", "Mouse simple", false);
const scanner = factory.crearDispositivo(TipoDispositivo.Scanner, "Wi-Fi", "HP", "Scanner de QR", 12);

if (teclado) inventario.agregarDispositivo(teclado);
if (raton) inventario.agregarDispositivo(raton);
if (scanner) inventario.agregarDispositivo(scanner);

console.log("Dispositivos en inventario:", inventario.listarDispositivos());
