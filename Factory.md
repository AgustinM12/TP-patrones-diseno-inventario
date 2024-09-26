# Ejercicio 1: Crear Dispositivos de Entrada
### Objetivo: Utilizar el patrón Factory Method para crear diferentes tipos de dispositivos de entrada.
● Crear una clase DispositivoEntradaFactory con un método crearDispositivo que,
basado en el tipo de dispositivo ("Teclado", "Ratón", "Scanner"), devuelva una
instancia de la clase adecuada.
● Crear clases específicas para cada tipo de dispositivo (Teclado, Ratón, Scanner), cada
una con sus propias propiedades (Ej.: tipoConexion, marca).
● Integrar la creación de estos dispositivos en el sistema de inventario.

```typescript
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
```

# Ejercicio 2: Fabricar Periféricos de Salida
### Objetivo: Implementar el patrón Factory Method para crear diferentes periféricos de salida.
● Crear una clase PerifericoSalidaFactory con un método crearPeriferico que, basado en
el tipo ("Monitor", "Impresora", "Proyector"), devuelva una instancia de la clase
correspondiente.
● Crear clases específicas para cada tipo de periférico (Monitor, Impresora, Proyector),
con propiedades particulares (Ej.: resolución para Monitor, tipoImpresión para
Impresora).
● Asegurar que el factory maneje correctamente la creación de cada periférico según el
tipo especificado.

```typescript
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
```