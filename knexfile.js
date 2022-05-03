/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    // connection: {
    //   host: process.env.HOST,
    //   database: process.env.DB_NAME,
    //   user: process.env.DB_USER,
    //   password: process.env.DB_PASSWORD,
    // },
    connection: {
      database: "cocoonmorpho",
      user: "postgres",
      password: null
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: { directory: "./db/seeds" },
  },
  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: { directory: "./db/seeds" },
  },
};
