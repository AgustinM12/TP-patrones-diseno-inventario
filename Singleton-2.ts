// ! Ejercicio 2: Control de Conexiones a la Base de Datos
// ! Objetivo: Utilizar el patrón Singleton para manejar la conexión a la base de datos de
// ! inventario.
// ! ● Crear una clase ConexionDB que siga el patrón Singleton.
// ! ● Esta clase debe manejar la conexión a una base de datos ficticia, con propiedades
// ! como host, puerto y usuario.
// ! ● Implementar métodos para conectar y desconectar la base de datos.
// ! ● Garantizar que todas las partes de la aplicación utilicen la misma instancia de
// ! ConexionDB.

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


const mongoConnect = DbConnection.obtenerInstacia()
mongoConnect.desconectarDB()
mongoConnect.conectarDB("mongodb://localhost:27017/")
mongoConnect.desconectarDB()