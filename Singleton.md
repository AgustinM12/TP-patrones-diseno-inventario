# Ejercicio 1: Gestionar Configuración Global del Sistema
### Objetivo: Implementar un patrón Singleton para gestionar la configuración global de la aplicación de inventario.
- ● Crear una clase Configuracion que siga el patrón Singleton.
- ● Esta clase debe almacenar propiedades como idioma, rutaBaseDatos y nivelRegistro.
- ● Agregar métodos para obtener y actualizar cada una de estas propiedades.
- ● Asegurar que solo exista una instancia de Configuracion en toda la aplicación.

```typescript
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
```

# Ejercicio 2: Control de Conexiones a la Base de Datos
### Objetivo: Utilizar el patrón Singleton para manejar la conexión a la base de datos de inventario.
- ● Crear una clase ConexionDB que siga el patrón Singleton.
- ● Esta clase debe manejar la conexión a una base de datos ficticia, con propiedades
como host, puerto y usuario.
- ● Implementar métodos para conectar y desconectar la base de datos.
- ● Garantizar que todas las partes de la aplicación utilicen la misma instancia de
ConexionDB.

```typescript
interface Ajustes {
    URI: string | undefined
}

type env = string | undefined

async function connect(URI: env): Promise<boolean> {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (URI === "mongodb://localhost:27017/") {
                resolve(true);
            } else {
                resolve(false);
            }
        }, 1000);
    });
}

class DbConnection {
    private static instancia: DbConnection;
    private estadoConexion: boolean;

    private constructor() {
        this.estadoConexion = false;
    }
    public static obtenerInstacia(): DbConnection {
        if (!DbConnection.instancia) {
            DbConnection.instancia = new DbConnection()
        }
        return DbConnection.instancia;
    }

    public async conectarDB(URI: env): Promise<void> {
        try {
            if (!URI) {
                console.log("Debe proporcionar una URI de conexion a la DB");
            } else {

                const conexionMongo: boolean = await connect(URI)

                console.log("Inicio el intento de conexion");

                if (conexionMongo) {
                    this.estadoConexion = conexionMongo
                    console.log("Base de datos conectada");
                } else {
                    throw new Error("No se pudo conectar a la base de datos");
                }
            }
        } catch (error) {
            console.log("Error inesperado: ", error);
        }
    }

    public async desconectarDB(): Promise<void> {

        return new Promise((resolve) => {
            setTimeout(() => {
                if (this.estadoConexion) {
                    resolve(console.log("Desconexion exitosaa a la base de datos"));
                } else {
                    resolve(console.log("No hay una conexion activa"));
                }
            }, 1000)
        })
    }
}
```