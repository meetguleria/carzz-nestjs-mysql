import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService } from './locations.service';
import { DatabaseService } from '../database/database.service';
import { Connection } from 'mysql2/promise';

describe('LocationsService', () => {
    let service: LocationsService;
    let mockQuery: jest.Mock;

    beforeEach(async () => {
        mockQuery = jest.fn();
        const mockConnection: Partial<Connection> = {
        query: mockQuery,
        };

    const mockDatabaseService = {
        getConnection: () => mockConnection as Connection,
        };

    const module: TestingModule = await Test.createTestingModule({
        providers: [
            LocationsService,
            { provide: DatabaseService, useValue: mockDatabaseService },
        ],}).compile();

    service = module.get<LocationsService>(LocationsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should add a location', async () => {
        const location = { address: '123 Main Street', city: 'Houston', state: 'TX', zipCode: '77002' };
        const expectedResult = [{ insertId: 1 }];

        mockQuery.mockResolvedValueOnce([expectedResult]);

        const result = await service.addLocation(location);
        expect(result).toEqual(expectedResult);
    });

    it('should get a location by ID', async () => {
        const expectedResult = { LocationID: 1, address: '123 Main Street', city: 'Houston', state: 'TX', zipCode: '77002' };

        mockQuery.mockResolvedValueOnce([[expectedResult]]);

        const result = await service.getLocationById(1);
        expect(result).toEqual(expectedResult);
    });

    it('should update a location', async () => {
        const location = { address: '123 Main Street', city: 'Houston', state: 'TX', zipCode: '77002' };
        const expectedResult = { affectedRows: 1 };

        mockQuery.mockResolvedValueOnce([expectedResult]);

        const result = await service.updateLocation(1, location);
        expect(result).toEqual(expectedResult);
    });

    it('should delete a location', async () => {
        const expectedResult = { affectedRows: 1 };

        mockQuery.mockResolvedValueOnce([expectedResult]);

        const result = await service.deleteLocation(1);
        expect(result).toEqual(expectedResult);
    });
});
