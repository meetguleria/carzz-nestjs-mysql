import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class LocationsService {
    constructor(private readonly databaseService: DatabaseService) {}
    
    async getAllLocations() {
        const connection = this.databaseService.getConnection();
        const [rows] = await connection.query('SELECT * FROM Locations');
        return rows;
    }

    async getLocationById(id: number) {
        const connection = this.databaseService.getConnection();
        const [rows] = await connection.query('SELECT * FROM Locations WHERE LocationID = ?', [id]);
        return rows[0];
    }

    async addLocation(location: { address: string; city: string; state: string; zipCode: string }) {
        const connection = this.databaseService.getConnection();
        const [result] = await connection.query('INSERT INTO Locations SET ?', [location]);
        return result;
    }

    async updateLocation(id: number, location: { address?: string; city?: string; state?: string; zipCode?: string }) {
        const connection = this.databaseService.getConnection();
        const [result] = await connection.query('UPDATE Locations SET ? WHERE LocationID = ?', [location, id]);
        return result;
    }

    async deleteLocation(id: number) {
        const connection = this.databaseService.getConnection();
        const [result] = await connection.query('DELETE FROM Locations WHERE LocationID = ?', [id]);
        return result;
    }
}
