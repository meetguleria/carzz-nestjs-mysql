import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class VehiclesService {
    constructor(private readonly databaseService: DatabaseService) {}

    async getAllVehicles() {
        const connection = this.databaseService.getConnection();
        const [rows] = await connection.query('SELECT * FROM Vehicles');
        return rows;
    }

    async addVehicle(vehicle: {model: string; make: string; year: number; 
        locationId: number; price: number; status: string }) {
        const connection = this.databaseService.getConnection();
        const [result] = await connection.query('INSERT INTO Vehicles SET ?', [vehicle]);
        return result;
    }

    async updateVehicle(id: number, vehicle: { model?: string; make?: string; year?: number; 
        locationId?: number; price?: number; status?: string }) {
        const connection = this.databaseService.getConnection();
        const [result] = await connection.query('UPDATE Vehicles SET ? WHERE id = ?', [vehicle, id]);
        return result;
    }

    async deleteVehicle(id: number) {
        const connection = this.databaseService.getConnection();
        const [result] = await connection.query('DELETE FROM Vehicles WHERE id = ?', [id]);
        return result;
    }

}
