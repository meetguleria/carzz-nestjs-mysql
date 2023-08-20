import { Test, TestingModule } from '@nestjs/testing';
import { RentalsController } from './rentals.controller';
import { RentalsService } from './rentals.service';

const mockRental = {
    customerId: 1,
    vehicleId: 1,
    startDate: new Date('2023-08-16'),
    endDate: new Date('2023-08-20'),
    totalPrice: 1000,
    status: 'booked',
};

const mockAddResult = {
    insertId: 1,
};

describe('RentalsController', () => {
    let controller: RentalsController;
    let service: RentalsService;

    beforeEach(async () => {
        service = {
            getAllRentals: jest.fn().mockResolvedValue([mockRental]),
            getRentalById: jest.fn().mockResolvedValue(mockRental),
            addRental: jest.fn().mockResolvedValue(mockAddResult),
            updateRental: jest.fn().mockResolvedValue({ affectedRows: 1 }),
            deleteRental: jest.fn().mockResolvedValue({ affectedRows: 1 }),
        } as any;

        const module: TestingModule = await Test.createTestingModule({
            controllers: [RentalsController],
            providers: [
                { provide: RentalsService, useValue: service },
            ],
        }).compile();

        controller = module.get<RentalsController>(RentalsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAllRentals', () => {
        it('should get all rentals', async () => {
            expect(await controller.getAllRentals()).toEqual([mockRental]);
        });
    });

    describe('getRentalById', () => {
        it('should get a rental by ID', async () => {
            expect(await controller.getRentalById(1)).toEqual(mockRental);
        });
    });

    describe('addRental', () => {
        it('should add a rental', async () => {
            expect(await controller.addRental(mockRental)).toEqual(mockAddResult);
        });
    });

    describe('updateRental', () => {
        it('should update a rental', async () => {
            expect(await controller.updateRental(1, mockRental)).toEqual({ affectedRows: 1 });
        });
    });

    describe('deleteRental', () => {
        it('should delete a rental', async () => {
            expect(await controller.cancelRental(1)).toEqual({ affectedRows: 1 });
        });
    });
});
