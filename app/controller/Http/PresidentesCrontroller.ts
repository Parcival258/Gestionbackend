import PgDatabase from "../../database/PgDatabase.js";
//CRUD equipos

class PresidentesController {
    //listar
    async listarPresidentes({ response }: { response: any }) {
        const result = await PgDatabase.query(`SELECT * FROM presidente`)
        return response.json({ ms: result.rows })
    }

    //insertar
    async insertarPresidente({ request, response }: { request: any; response: any }) {
        const { dni, nombre, codigo_equipo } = request.body()
        try{

            const result = await PgDatabase.query(
                `INSERT INTO presidente (dni, nombre, codigo_equipo) VALUES ($1,$2,$3)`,
                [dni, nombre, codigo_equipo]
            )
            return response.json({ ms: result.rows })
        }catch (e){
            return response.json({ ms: 'error' })
        }
    }
    //actualizar por id
    async actualizarPresidenteId({ params, request, response }: { params: any, request: any, response: any }) {
        const id = params.id
        const { dni, nombre, codigo_equipo } = request.body()

        //balido si me falta algun dato
        if (!dni || !nombre || !codigo_equipo) {
            return response.json({ ms: `faltan datos` })
        }
        //si los datos estan completos
        const result = await PgDatabase.query(
            `UPDATE presidente SET dni = $1, nombre = $2, codigo_equipo = $3  WHERE id = $4;`,
            [dni, nombre, codigo_equipo, id]
        )
        //si todo sale bien
        if ((result.rowCount ?? 0) >0 ) {
            return response.json({ms: `presidente actualizada`})
        }
    }

    //eliminar presidente
    async eliminarPresidenteId({params, response }: { params: any; response: any }) {
        const id = params.id
        const result = await PgDatabase.query(`DELETE FROM presidente WHERE id = $1`,
            [id]
        )
        return response.json({ms: `presidente eliminado`})
    }

    //listar
    async obtenerPresidentesById({ params, response }: { params: any, response: any }) {
        const id = params.id
        const result = await PgDatabase.query(`SELECT * FROM presidente WHERE id = $1`, [id]);
        return response.json({ ms: result.rows })
    }


}
export default PresidentesController;