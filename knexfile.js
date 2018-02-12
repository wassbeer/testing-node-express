// different database configuration is used based on the app’s environment, either development or test

module.exports = {
  development: {
    client: 'postgresql',
    connection: 'postgres://localhost:5432/express_tdd', // just CREATED db in psql
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  },
  test: {
    client: 'postgresql',
    connection: 'postgres://localhost:5432/express_tdd_testing', // just CREATED db in psql
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  }
};
