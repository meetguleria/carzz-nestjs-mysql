import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { LocationsController } from './locations/locations.controller';
import { LocationsService } from './locations/locations.service';
import { VehiclesController } from './vehicles/vehicles.controller';
import { VehiclesService } from './vehicles/vehicles.service';

@Module({
  imports: [],
  controllers: [AppController, LocationsController, VehiclesController],
  providers: [AppService, DatabaseService, LocationsService, VehiclesService],
})
export class AppModule {}
