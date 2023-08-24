import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class CustomersService {
    constructor(private readonly databaseService: DatabaseService) {}

    async getAllCustomers() {
        const connection = this.databaseService.getConnection();
        const [rows] = await connection.query('SELECT * FROM Customers');
        return rows;
    }

    async addCustomer(customer: { name: string; email: string; phone: string; password: string }) {
        const connection = this.databaseService.getConnection();
        const [result] = await connection.query('INSERT INTO Customers SET ?', [customer]);
        return result;
    }

    async getCustomerById(id: number) {
        const connection = this.databaseService.getConnection();
        const [rows] = await connection.query('SELECT * FROM Customers WHERE CustomerID = ?', [id]);
        return rows[0];
    }

    async updateCustomer(id: number, customer: { name?: string; email?: string; phone?: string; password?: string }) {
        const connection = this.databaseService.getConnection();
        const [result] = await connection.query('UPDATE Customers SET ? WHERE CustomerID = ?', [customer, id]);
        return result;
    }

    async deleteCustomer(id: number) {
        const connection = this.databaseService.getConnection();
        const [result] = await connection.query('DELETE FROM Customers WHERE CustomerID = ?', [id]);
        return result;
    }
}
