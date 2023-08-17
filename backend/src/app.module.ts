import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { LocationsController } from './locations/locations.controller';
import { LocationsService } from './locations/locations.service';
import { VehiclesController } from './vehicles/vehicles.controller';
import { VehiclesService } from './vehicles/vehicles.service';
import { RentalsController } from './rentals/rentals.controller';
import { RentalsService } from './rentals/rentals.service';
import { CustomersController } from './customers/customers.controller';
import { CustomersService } from './customers/customers.service';
import { ReviewsController } from './reviews/reviews.controller';
import { ReviewsService } from './reviews/reviews.service';

@Module({
  imports: [],
  controllers: [AppController, LocationsController, VehiclesController, RentalsController, CustomersController, ReviewsController],
  providers: [AppService, DatabaseService, LocationsService, VehiclesService, RentalsService, CustomersService, ReviewsService],
})
export class AppModule {}
