//! Ejercicio 1: Gestionar Configuración Global del Sistema
//! Objetivo: Implementar un patrón Singleton para gestionar la configuración global de la
//! aplicación de inventario.
//! ● Crear una clase Configuracion que siga el patrón Singleton.
//! ● Esta clase debe almacenar propiedades como idioma, rutaBaseDatos y nivelRegistro.
//! ● Agregar métodos para obtener y actualizar cada una de estas propiedades.
//! ● Asegurar que solo exista una instancia de Configuracion en toda la aplicación.

type lenguaje = "español" | "ingles" | "portugues";

interface Propiedades {
    idioma: lenguaje,
    rutaBaseDatos: string,
    nivelRegistro: string,
}

class Configuracion {
    private static instancia: Configuracion;

    private ajustes: Propiedades = { idioma: "español", rutaBaseDatos: "", nivelRegistro: "" };

    private constructor() { }

    public static obtenerInstancia(): Configuracion {
        if (!Configuracion.instancia) {
            Configuracion.instancia = new Configuracion();
        }
        return Configuracion.instancia;
    }

    public cambiarIdioma(idioma: lenguaje): void {
        this.ajustes.idioma = idioma;
        return console.log("Idioma actualizado correctamente");
    }

    public cambiarRutaDB(rutaBaseDatos: string): void {
        this.ajustes.rutaBaseDatos = rutaBaseDatos;
        return console.log("Ruta de base de datos actualizado correctamente");
    }

    public cambiarNivelRegistro(nivelRegistro: string): void {
        this.ajustes.nivelRegistro = nivelRegistro;
        return console.log("Nivel de registro actualizado correctamente");
    }

    public verConfiguraciones(): Propiedades | undefined {
        return this.ajustes
    }
}

// ! Uso del Singleton
const configuracion = Configuracion.obtenerInstancia()
console.log(configuracion.verConfiguraciones());
configuracion.cambiarIdioma("ingles")
configuracion.cambiarNivelRegistro("alto")
configuracion.cambiarRutaDB("www.mongodb.com")
console.log(configuracion.verConfiguraciones());

