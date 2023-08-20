import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

const mockCustomer = {
    customerId: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    password: 'password123',
};

const mockAddResult = {
    insertId: 1,
};

describe('CustomersController', () => {
    let controller: CustomersController;
    let service: CustomersService;

    beforeEach(async () => {
        service = {
            getAllCustomers: jest.fn().mockResolvedValue([mockCustomer]),
            getCustomerById: jest.fn().mockResolvedValue(mockCustomer),
            addCustomer: jest.fn().mockResolvedValue(mockAddResult),
            updateCustomer: jest.fn().mockResolvedValue({ affectedRows: 1 }),
            deleteCustomer: jest.fn().mockResolvedValue({ affectedRows: 1 }),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
        controllers: [CustomersController],
        providers: [
        { provide: CustomersService, useValue: service },
        ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAllCustomers', () => {
        it('should get all rentals', async () => {
            expect(await controller.getAllCustomers()).toEqual([mockCustomer]);
        });
    });

    describe('getCustomerById', () => {
        it('should get a customer by ID', async () => {
            expect(await controller.getCustomerById(1)).toEqual(mockCustomer);
        });
    });

    describe('addCustomer', () => {
        it('should add a customer', async () => {
            expect(await controller.addCustomer(mockCustomer)).toEqual(mockCustomer)
        });
    });

    describe('updateCustomer', () => {
        it('should update a customer', async () => {
            expect(await controller.updateCustomer(1, mockCustomer)).toEqual({ affectedRows: 1 });
        });
    });

    describe('deleteRental', () => {
        it('should delete a customer', async () => {
            expect(await controller.deleteCustomer(1)).toEqual({ affectedRows: 1 });
        });
    });
});
