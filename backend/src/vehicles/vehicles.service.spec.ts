import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesService } from './vehicles.service';
import { DatabaseService } from '../database/database.service';

describe('VehiclesService', () => {
    let service: VehiclesService;
    let mockQuery: jest.Mock;

    beforeEach(async () => {
        mockQuery = jest.fn();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                VehiclesService,
                { provide: DatabaseService, useValue: { getConnection: () => ({ query: mockQuery }) } },
            ],
        }).compile();

        service = module.get<VehiclesService>(VehiclesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should get all vehicles', async () => {
        const expectedResult = [{ 
            VehicleID: 1, 
            model: 'Tesla', 
            make: 'Model S', 
            year: 2020,
            locationId: 1,
            price: 50000,
            status: 'available'
        }];
        mockQuery.mockReturnValueOnce([expectedResult]);

        const result = await service.getAllVehicles();
        expect(result).toEqual(expectedResult);
    });

    it('should add a vehicle', async () => {
        const vehicle = { 
            model: 'Tesla', 
            make: 'Model S', 
            year: 2020,
            locationId: 1,
            price: 50000,
            status: 'available',
        };
        const expectedResult = [{ insertId: 1 }];

        mockQuery.mockResolvedValueOnce([expectedResult]);

        const result = await service.addVehicle(vehicle);
        expect(result).toEqual(expectedResult);
    });

    it('should update a vehicle', async () => {
        const vehicle = {
            model: 'Toyota',
            make: 'Prius',
            year: 2018,
            locationId: 1,
            price: 25000,
            status: 'unavailable'
        };
        const expectedResult = { affectedRows: 1 };

        mockQuery.mockResolvedValueOnce([expectedResult]);

        const result = await service.updateVehicle(1, vehicle);
        expect(result).toEqual(expectedResult);
    });

    it('should delete a vehicle', async () => {
        const expectedResult = { affectedRows: 1};

        mockQuery.mockResolvedValueOnce([expectedResult]);

        const result = await service.deleteVehicle(1);
        expect(result).toEqual(expectedResult);
    })
});
