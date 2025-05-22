import { Client } from 'pg'

//estancia para la conexión

const PgDatabase = new Client({
  host: `localhost`,
  port: 5433,
  user: `postgres`,
  password: `L@sso09111998`,
  database: `Gestion`,
})
PgDatabase.connect()

export default PgDatabase