import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
    constructor(private readonly vehiclesService: VehiclesService) {}

    @Get()
    getAllVehicles() {
        return this.vehiclesService.getAllVehicles();
    }

    @Post()
    addVehicle(@Body() vehicle: { model: string; make: string; year: number; 
        locationId: number; price: number; status: string }) {
            return this.vehiclesService.addVehicle(vehicle);
        }

    @Put(':id')
    updateVehicle(@Param('id') id: number, @Body() vehicle: { model?: string; make?: string; 
        year?: number; locationId?: number; price?: number; status?: string }) {
            return this.vehiclesService.updateVehicle(id, vehicle);
        }

    @Delete(':id')
    deleteVehicle(@Param('id') id: number) {
        return this.vehiclesService.deleteVehicle(id);
    }
}
