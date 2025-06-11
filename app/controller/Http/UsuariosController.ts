import hash from '@adonisjs/core/services/hash'
import PgDatabase from '../../database/PgDatabase.js'

class UsuariosController {
  //add usuarios
  async register({ request, response }: { request: any; response: any }) {
    const { email, password } = request.body()
    const newpass = await hash.make(password)
    const rest = await PgDatabase.query(`INSTER INTO usuarios (email,password) VALUES($1,$2)`, [
      email,
      newpass,
    ])
    console.log(rest)
    return response.json({ ms: `añadido` })
  }

  //login
  async login({ request, response }: { request: any; response: any }) {
    const { email, password } = request.body()
    const rest = await PgDatabase.query(`SELECT * FROM usuario WHERE email =$1`, [email])
    if (rest.rows.length === 0) {
      return response.json({ ms: `usuario no encontrado` })
    }
    const isValid = await hash.verify(rest.rows[0].password, password)
    if (!isValid) {
      return response.json({ ms: false })
    }
    return response.json({ ms: true })
  }
}

export default UsuariosController
