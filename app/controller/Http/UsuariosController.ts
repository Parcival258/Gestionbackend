import hash from '@adonisjs/core/services/hash'
import PgDatabase from '../../database/PgDatabase.js'

class UsuariosController {
  //add usuarios
  async register({ request, response }: { request: any; response: any }) {
    const { email, password, nombre, telefono, direccion } = request.body()
    const newpass = await hash.make(password)
    const rest = await PgDatabase.query(
      `INSERT INTO usuarios (email,password, nombre, telefono, direccion) VALUES($1,$2,$3,$4,$5)`,
      [email, newpass, nombre, telefono, direccion]
    )
    return response.json({ ms: `agregado` })
  }

  //login
  async login({ request, response }: { request: any; response: any }) {
    const { email, password } = request.body()
    const rest = await PgDatabase.query(`SELECT * FROM usuarios WHERE email =$1`, [email])
    if (rest.rows.length === 0) {
      return response.json({ ms: `usuario no encontrado` })
    }
    const isValid = await hash.verify(rest.rows[0].password, password)
    if (!isValid) {
      return response.json({ ms: false })
    }
    return response.json({ ms: true })
  }

  //User by Email:
  async userByEmail({ request, response }: { request: any; response: any }) {
    const { email } = request.body()
    const res = await PgDatabase.query(`SELECT * FROM usuarios WHERE email = $1`, [email])
    if (res.rowCount === 0) {
      return response.json({ ms: false })
    }
    return response.json({ ms: true })
  }

  //para la identificacón en el app
  async userEmail({ request, response }: { request: any; response: any }) {
    const { email } = request.body()
    const res = await PgDatabase.query(
      `SELECT nombre,email,telefono,direccion,created_at FROM usuarios WHERE email = $1`,
      [email]
    )
    if (res.rowCount === 0) {
      return response.json({ ms: false })
    }
    return response.json({ ms: res.rows })
  }
}

export default UsuariosController
