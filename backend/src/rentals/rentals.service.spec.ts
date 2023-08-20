import { Test, TestingModule } from '@nestjs/testing';
import { RentalsService } from './rentals.service';
import { DatabaseService } from '../database/database.service';

describe('RentalsService', () => {
    let service: RentalsService;
    let mockQuery: jest.Mock;

    const rental = {
        rentalId: 1,
        customerId: 1,
        vehicleId: 1,
        startDate: new Date('2023-08-16'),
        endDate: new Date('2023-08-20'),
        totalPrice: 1000,
        status: 'booked',
    }

    beforeEach(async () => {
        mockQuery = jest.fn();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RentalsService,
                { provide: DatabaseService, useValue: { getConnection: () => ({ query: mockQuery }) } },
            ],
        }).compile();

        service = module.get<RentalsService>(RentalsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should get all rentals', async () => {
        const expectedResult = [{ ...rental, rentalId: 1 }];
        mockQuery.mockReturnValueOnce([expectedResult]);

        const result = await service.getAllRentals();
        expect(result).toEqual(expectedResult);
    });

    it('should add a rental', async () => {
        const expectedResult = [{ insertId: 1 }];
        mockQuery.mockResolvedValueOnce([expectedResult]);

        const result = await service.addRental(rental);
        expect(result).toEqual(expectedResult);
    });

    it('should get a rental by id', async () => {
        const expectedResult = { ...rental, rentalId: 1 };
        mockQuery.mockResolvedValueOnce([expectedResult]);
    
        const result = await service.getRentalById(1);
        expect(result).toEqual(expectedResult);    
    });

    it('should update a rental', async () => {
        const expectedResult = { affectedRows: 1 };
        mockQuery.mockResolvedValueOnce([expectedResult]);

        const result = await service.updateRental(1, rental);
        expect(result).toEqual(expectedResult);
    });

    it('should cancel a rental', async () => {
        const expectedResult = { affectedRows: 1 };
        mockQuery.mockResolvedValueOnce([expectedResult]);

        const result = await service.cancelRental(1);
        expect(result).toEqual(expectedResult);
    });
});