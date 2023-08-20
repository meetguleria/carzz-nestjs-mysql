import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { DatabaseService } from '../database/database.service';

describe('CustomersService', () => {
    let service: CustomersService;
    let mockQuery: jest.Mock;

    const customer = {
        customerId: 1, 
        name: 'John Doe', 
        email: 'john@example.com', 
        phone: '123-456-7890', 
        password: 'hashed_password',
    }

    beforeEach(async () => {
        mockQuery = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
        providers: [
            CustomersService,
            { provide: DatabaseService, useValue: { getConnection: () => ({ query: mockQuery }) } },
        ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should get all customers', async () => {
        const expectedResult = [{ ...customer, customerId: 1 }]
        mockQuery.mockReturnValueOnce([expectedResult]);

        const result = await service.getAllCustomers();
        expect(result).toEqual(expectedResult);
    });

    it('should add a customer', async () => {
        const expectedResult = [{ insertId: 1 }];
        mockQuery.mockReturnValueOnce([expectedResult]);

        const result = await service.addCustomer(customer);
        expect(result).toEqual(expectedResult);
    });

    it('should update a customer', async () => {
        const customerId = 1; 
        const expectedResult = { affectedRows: 1 };
        mockQuery.mockReturnValueOnce([expectedResult]);
    
        const result = await service.updateCustomer(customerId, customer);
        expect(result).toEqual(expectedResult);
    });
});
