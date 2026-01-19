import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'  

declare module '@adonisjs/lucid/types/database' {
  interface Connections {
    pg: any  
  }
}

const dbConfig = defineConfig({
  connection: env.get('DB_CONNECTION') || 'mysql',
  connections: {
    mysql: {
      client: 'mysql2',
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  pg: {  
      client: 'pg',
      connection: {
        host: env.get('PG_HOST'),
        port: Number(env.get('PG_PORT')),
        user: env.get('PG_USER'),
        password: env.get('PG_PASSWORD'),
        database: env.get('PG_DB_NAME'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/postgres_migration']
      },
    },

  },
})

export default dbConfig