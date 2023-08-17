import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class LocationsService {
    constructor(private readonly databaseService: DatabaseService) {}
    
    async getAllLocations() {
        const connection = this.databaseService.getConnection();
        const [rows] = await connection.query('SELECT * FROM Locations');
        return rows;
    }

    async addLocation(location: { address: string; city: string; state: string; zipCode: string }) {
        const connection = this.databaseService.getConnection();
        const [result] = await connection.query('INSERT INTO Locations SET ?', [location]);
        return result;
    }
}
