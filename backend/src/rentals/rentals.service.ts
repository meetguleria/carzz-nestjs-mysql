import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RentalsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllRentals() {
    const connection = this.databaseService.getConnection();
    const [rows] = await connection.query('SELECT * FROM Rentals');
    return rows;
  }

  async addRental(rental: { customerId: number; vehicleId: number; startDate: Date; 
    endDate: Date; totalPrice: number; status: string }) {
    const connection = this.databaseService.getConnection();
    const [result] = await connection.query('INSERT INTO Rentals SET ?', [rental]);
    return result;
  }

  async getRentalById(id: number) {
    const connection = this.databaseService.getConnection();
    const [rows] = await connection.query('SELECT * FROM Rentals WHERE RentalID = ?', [id]);
    return rows[0];
  }

  async updateRental(id: number, rental: { startDate?: Date; endDate?: Date; 
    totalPrice?: number; status?: string }) {
    const connection = this.databaseService.getConnection();
    const [result] = await connection.query('UPDATE Rentals SET ? WHERE RentalID = ?', [rental, id]);
    return result;
  }

  async cancelRental(id: number) {
    const connection = this.databaseService.getConnection();
    const [result] = await connection.query('DELETE FROM Rentals WHERE RentalID = ?', [id]);
    return result;
  }
}
