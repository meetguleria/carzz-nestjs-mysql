import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}

    @Get()
    getAllCustomers() {
        return this.customersService.getAllCustomers();
    }

    @Post()
    addCustomer(@Body() customer: { name: string; email: string; phone: string; password: string }) {
        return this.customersService.addCustomer(customer);
    }

    @Get(':id')
    getCustomerById(@Param('id') id: number) {
        return this.customersService.getCustomerById(id);
    }

    @Put(':id')
    updateCustomer(@Param('id') id: number, @Body() customer: { name?: string; email?: string; 
        phone?: string; password?: string }) {
        return this.customersService.updateCustomer(id, customer);
    }

    @Delete(':id')
    deleteCustomer(@Param('id') id: number) {
        return this.customersService.deleteCustomer(id);
    }
}
