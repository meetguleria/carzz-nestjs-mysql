import { Test, TestingModule } from '@nestjs/testing';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';

const mockLocation = {
    LocationID: 1,
    address: '123 Main Street',
    city: 'Houston',
    state: 'TX',
    zipCode: '77002',
};

const mockAddResult = {
    insertId: 1,
};

const mockUpdateResult = {
    affectedRows: 1,
};

const mockDeleteResult = {
    affectedRows: 1,
};

describe('LocationsController', () => {
    let controller: LocationsController;
    let service: LocationsService;

    beforeEach(async () => {
        service = { 
            getAllLocations: jest.fn().mockResolvedValue([mockLocation]),
            getLocationById: jest.fn().mockResolvedValue(mockLocation),
            addLocation: jest.fn().mockResolvedValue(mockAddResult),
            updateLocation: jest.fn().mockResolvedValue(mockUpdateResult),
            deleteLocation: jest.fn().mockResolvedValue(mockDeleteResult),
        } as any;

    const module: TestingModule = await Test.createTestingModule({
        controllers: [LocationsController],
        providers: [
        { provide: LocationsService, useValue: service },
        ],
    }).compile();

    controller = module.get<LocationsController>(LocationsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAllLocations', () => {
        it('should get all locations', async () => {
            expect(await controller.getAllLocations()).toEqual([mockLocation]);
        });
    });

    describe('getLocationById', () => {
        it('should get a location by ID', async () => {
            expect(await controller.getLocationById(1)).toEqual(mockLocation);
        });
    });

    describe('addLocation', () => {
        it('should add a location', async () => {
            expect(await controller.addLocation(mockLocation)).toEqual(mockAddResult);
        });
    });

    describe('updateLocation', () => {
        it('should update a location', async () => {
            expect(await controller.updateLocation(1, mockLocation)).toEqual(mockUpdateResult);
        });
    });

    describe('deleteLocation', () => {
        it('should delete a location', async () => {
            expect(await controller.deleteLocation(1)).toEqual(mockDeleteResult);
        });
    });
});
