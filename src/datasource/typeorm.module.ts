// import { DataSource } from 'typeorm';
// import { Global, Module } from '@nestjs/common';
// import * as dotenv from 'dotenv';

// // Load environment variables from .env file
// dotenv.config();

// @Global() // makes the module available globally for other modules once imported in the app modules
// @Module({
//   imports: [],
//   providers: [
//     {
//       provide: DataSource, // add the datasource as a provider
//       inject: [],
//       useFactory: async () => {
//         // using the factory function to create the datasource instance
//         try {
//           const dataSource = new DataSource({
//             type: 'postgres',
//             host: process.env.POSTGRES_HOST,
//             port: Number(process.env.POSTGRES_PORT),
//             username: process.env.POSTGRES_USER,
//             password: process.env.POSTGRES_PASSWORD,
//             database: process.env.POSTGRES_DATABASE,
//             entities: [`${__dirname}/../**/*.entity.{ts,js}`],
//             migrationsTableName: 'migration',
//             migrations: [
//               process.env.NODE_ENV === 'develop'
//                 ? `src/migration/*.{ts,js}`
//                 : `dist/migration/*.{ts,js}`,
//             ],
//             ssl:
//               process.env.NODE_ENV === 'develop'
//                 ? false
//                 : { rejectUnauthorized: false },
//           });
//           await dataSource.initialize(); // initialize the data source
//           console.log('Database connected successfully');
//           return dataSource;
//         } catch (error) {
//           console.log('Error connecting to database');
//           throw error;
//         }
//       },
//     },
//   ],
//   exports: [DataSource],
// })
// export class TypeOrmModule {}
