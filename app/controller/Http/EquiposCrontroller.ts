import PgDatabase from '../../database/PgDatabase.js'
//CRUD equipos

class EquiposController {
  //listar
  async listarequipo({ response }: { response: any }) {
    const result = await PgDatabase.query(`SELECT * FROM equipo ORDER BY codigo`)
    return response.json({ ms: result.rows })
  }

  async listarequipoSinPresidente({ response }: { response: any }) {
    const result = await PgDatabase.query(`SELECT e.codigo, e.nombre, e.anio_fundacion
                FROM public.equipo e
                LEFT JOIN public.presidente p ON e.codigo = p.codigo_equipo
                WHERE p.codigo_equipo IS NULL;
`)
    return response.json({ ms: result.rows })
  }
//listar equipo por id
async listarequipoid({params, response}: {params:any, response:any}) {
    const codigo = params.codigo
    const result = await PgDatabase.query(`SELECT * FROM equipo WHERE  codigo = $1`,
        [codigo]
    )
    return response.json({ms:result.rows})
}
//insertar
  async insertarEquipo({ request, response }: { request: any; response: any }) {
    const { nombre, anio_fundacion } = request.body()
    const result = await PgDatabase.query(
      `INSERT INTO equipo (nombre, anio_fundacion) VALUES ($1,$2)`,
      [nombre, anio_fundacion]
    )
    return response.json({ ms: result.rows })
  }
  //actualizar por id
  async actualizarEquipoId({
    params,
    request,
    response,
  }: {
    params: any
    request: any
    response: any
  }) {
    const codigo = params.codigo
    const { nombre, anio_fundacion } = request.body()

    //balido si me falta algun dato
    if (!nombre || !anio_fundacion) {
      return response.json({ ms: `faltan datos` })
    }
    //si los datos estan completos
    const result = await PgDatabase.query(
      `UPDATE equipo SET nombre = $1, anio_fundacion = $2  WHERE codigo = $3`,
      [nombre, anio_fundacion, codigo]
    )
    //si todo sale bien
    if ((result.rowCount ?? 0) > 0) {
      return response.json({ ms: `equipo actualizado` })
    }
  }

  //eliminar equipo
  async eliminarEquipoId({ params, response }: { params: any; response: any }) {
    const codigo = params.codigo
    const result = await PgDatabase.query(`DELETE FROM equipo WHERE codigo = $1`, [codigo])
    return response.json({ ms: `equipo eliminado` })
  }
}
export default EquiposController
