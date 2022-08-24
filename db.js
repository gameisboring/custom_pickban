const mysql = require('mysql2/promise')
require('dotenv').config()

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env

let pool = mysql.createPool({
  // host 바꾸기
  host: DB_HOST,
  user: DB_USER,
  port: 3306,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  connectionLimit: 4,
})

async function insertChamp(title, text) {
  const query = `INSERT INTO PROMPT_DATA(CREATETIME,LASTUPDATE,TITLE,DATA) VALUES (sysdate(),CREATETIME,?,?);`

  try {
    const result = await pool.query(query, [title, text])
    return result[0]
  } catch (error) {
    console.error(`Database connection error (insertText): ${error.message}`)
  }
}

module.exports = { insertChamp, pool }
