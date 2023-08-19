import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
    constructor(private readonly locationsService: LocationsService) {}

    @Get()
    async getAllLocations() {
    return await this.locationsService.getAllLocations();
    }

    @Get(':id')
    async getLocationById(@Param('id') id: number) {
        return await this.locationsService.getLocationById(id);
    }

    @Post()
    async addLocation(@Body() location: { address: string; city: string; state: string; zipCode: string }) {
        return await this.locationsService.addLocation(location);
    }

    @Put(':id')
    async updateLocation(@Param('id') id: number, @Body() location: { address?: string; city?: string; state?: string; zipCode?: string }) {
        return await this.locationsService.updateLocation(id, location);
    }

    @Delete(':id')
    async deleteLocation(@Param('id') id: number) {
        return await this.locationsService.deleteLocation(id);
    }
}
