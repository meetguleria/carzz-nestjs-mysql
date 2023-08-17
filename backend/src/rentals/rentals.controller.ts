import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { RentalsService } from './rentals.service';

@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Get()
  getAllRentals() {
    return this.rentalsService.getAllRentals();
  }

  @Post()
  addRental(@Body() rental: { customerId: number; vehicleId: number; startDate: Date; endDate: Date; totalPrice: number; status: string }) {
    return this.rentalsService.addRental(rental);
  }

  @Get(':id')
  getRentalById(@Param('id') id: number) {
    return this.rentalsService.getRentalById(id);
  }

  @Put(':id')
  updateRental(@Param('id') id: number, @Body() rental: { startDate?: Date; endDate?: Date; totalPrice?: number; status?: string }) {
    return this.rentalsService.updateRental(id, rental);
  }

  @Delete(':id')
  cancelRental(@Param('id') id: number) {
    return this.rentalsService.cancelRental(id);
  }
}
