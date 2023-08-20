import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ReviewsService {
    constructor(private readonly databaseService: DatabaseService) {}

    async getAllReviews() {
        const connection = this.databaseService.getConnection();
        const [rows] = await connection.query('SELECT * FROM Reviews');
        return rows;
    }

    async addReview(review: { customerId: number; vehicleId: number; rating: number; comment: string; date: Date }) {
        const connection = this.databaseService.getConnection();
        const [result] = await connection.query('INSERT INTO Reviews SET ?', [review]);
        return result;
    }

    async getReviewById(id: number) {
        const connection = this.databaseService.getConnection();
        const [rows] = await connection.query('SELECT * FROM Reviews WHERE ReviewID = ?', [id]);
        return rows[0];
    }

    async updateReview(id: number, review: { rating?: number; comment?: string; date?: Date }) {
        const connection = this.databaseService.getConnection();
        const [result] = await connection.query('UPDATE Reviews SET ? WHERE ReviewID = ?', [review, id]);
        return result;
    }

    async deleteReview(id: number) {
        const connection = this.databaseService.getConnection();
        const [result] = await connection.query('DELETE FROM Reviews WHERE ReviewID = ?', [id]);
        return result;
    }
}
