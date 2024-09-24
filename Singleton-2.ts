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
        }, 2000);
    });
}

class DbConnection {
    private static instancia: DbConnection;

    private constructor() { }

    public static obtenerInstacia(): DbConnection {
        if (!DbConnection.instancia) {
            DbConnection.instancia = new DbConnection()
        }
        return DbConnection.instancia;
    }

    public async conectarDB(URI: env): Promise<void> {
        try {
            if (URI != "") {

                const conexionMongo: boolean = await connect(URI)

                console.log("Inicio el intento de conexion");

                if (conexionMongo) {
                    console.log("Base de datos conectada");
                } else {
                    console.log("No se pudo conectar a la base de datos");
                }
            } else {
                console.log("Debe proporcionar una URI de conexion a la DB");
            }
        } catch (error) {
            console.log("Error al conectar a la DB", error);
        }
    }
}

const mongoConnect = DbConnection.obtenerInstacia()
mongoConnect.conectarDB("mongodb://localhost:27017/")