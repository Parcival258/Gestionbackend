import { Client } from 'pg'

//estancia para la conexión

const PgDatabase = new Client({
  host: `localhost`,
  port: 5433,
  user: `postgres`,
  password: process.env.PASSWORD_DB,
  database: `Gestion`,
})
PgDatabase.connect()

export default PgDatabase