import { Client } from 'pg'

//estancia para la conexión

const PgDatabase = new Client({
  host: `localhost`,
  port: 5433,
  user: `postgres`,
  password: `Chanclas6876453`,
  database: `gestion`,
})
PgDatabase.connect()

export default PgDatabase