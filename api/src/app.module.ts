import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { Sensor } from './sensors/entities/sensor.entity.js';
import { SensorsModule } from './sensors/sensors.module.js';
import { Tarea } from './tareas/entities/tarea.entity.js';
import { TareasModule } from './tareas/tareas.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity.js';
import { UsersModule } from './users/users.module.js';
import {Auto} from './autos/entities/auto.entity.js';
import {AutosModule} from './autos/autos.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'mssql-connection',
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      password: 'ConfiguracionSegura2026!',
      username: 'sa',
      database: 'dsm42',
      entities: [ Tarea, Auto ],
      synchronize: true,
      autoLoadEntities: true,
      options: {
        trustServerCertificate: true
      }
    }),
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      database: 'dsm42',
      entities: [ User ],
      host: 'localhost',
      name: 'postgres-connection',
      password: 'admin',
      port: 5432,
      synchronize: true,
      type: 'postgres',
      username: 'asgard'
    }),
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      database: 'dsm42',
      entities: [ Sensor ],
      host: 'localhost',
      name: 'mariadb-connection',
      password: 'admin',
      port: 3038,
      synchronize: true,
      type: 'mariadb',
      username: 'asgard'
    }),
    UsersModule,
    SensorsModule,
    TareasModule,
    AutosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}




