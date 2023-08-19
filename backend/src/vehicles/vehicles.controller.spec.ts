import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';

const mockVehicle = {
    model: 'Tesla',
    make: 'Model S',
    year: 2020,
    locationId: 1,
    price: 50000,
    status: 'available',
};

const mockVehicleList = [mockVehicle];

const mockAddResult = { insertId: 1 };
const mockUpdateResult = { affectedRows: 1 };
const mockDeleteResult = { affectedRows: 1 };

describe('VehiclesController', () => {
    let controller: VehiclesController;
    let service: VehiclesService;

    beforeEach(async () => {
        service = {
            getAllVehicles: jest.fn().mockResolvedValue(mockVehicleList),
            addVehicle: jest.fn().mockResolvedValue(mockAddResult),
            updateVehicle: jest.fn().mockResolvedValue(mockUpdateResult),
            deleteVehicle: jest.fn().mockResolvedValue(mockDeleteResult),
        } as any;

        const module: TestingModule = await Test.createTestingModule({
            controllers: [VehiclesController],
            providers: [{ provide: VehiclesService, useValue: service }],
        }).compile();

        controller = module.get<VehiclesController>(VehiclesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAllVehicles', () => {
        it('should get all vehicles', async () => {
            expect(await controller.getAllVehicles()).toEqual(mockVehicleList);
        });
    });

    describe('addVehicle', () => {
        it('should add a vehicle', async () => {
            expect(await controller.addVehicle(mockVehicle)).toEqual(mockAddResult);
        });
    });

    describe('updateVehicle', () => {
        it('should update a vehicle', async () => {
            expect(await controller.updateVehicle(1, mockVehicle)).toEqual(mockUpdateResult);
        });
    });

    describe('deleteVehicle', () => {
        it('should delete a vehicle', async () => {
            expect(await controller.deleteVehicle(1)).toEqual(mockDeleteResult);
        });
    });
});
