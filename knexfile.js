// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'knex_cluckr'
    }
  },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations'
    }, 
    seeds: {
      directory: './db/seeds'
    }

};
