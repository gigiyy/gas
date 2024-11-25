import { Pool } from 'pg'

export const pool = new Pool({
  user: 'gigiyy',
  host: 'localhost',
  database: process.env.NODE_ENV === 'test' ? 'gasoline_db_test' : 'gasoline_db',
  password: 'newpassword',
  port: 5432,
})
