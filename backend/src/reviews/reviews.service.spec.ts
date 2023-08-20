import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from './reviews.service';
import { DatabaseService } from '../database/database.service';

describe('ReviewsService', () => {
    let service: ReviewsService;
    let mockQuery: jest.Mock;

    beforeEach(async () => {
        mockQuery = jest.fn();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ReviewsService,
	            { provide: DatabaseService, useValue: { getConnection: () => 
                    ({ query: mockQuery }) } },
            ],
        }).compile();

        service = module.get<ReviewsService>(ReviewsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should get all reviews', async () => {
        const expectedResult = [
            {
                reviewId: 1,
                customerId: 1,
                vehicleId: 1,
                rating: 5,
                comment: 'Excellent',
                date: new Date('2023-08-16'),
            },
        ];
        mockQuery.mockResolvedValueOnce([expectedResult]);

        const result = await service.getAllReviews();
        expect(result).toEqual(expectedResult);
    });

    it('should get a review by ID', async () => {
        const expectedResult = {
            reviewId: 1,
            customerId: 1,
            vehicleId: 1,
            rating: 5,
            comment: 'Excellent',
            date: new Date('2023-08-16'),
        };
        mockQuery.mockResolvedValueOnce([[expectedResult]]);

        const result = await service.getReviewById(1);
        expect(result).toEqual(expectedResult);
    });

    it('should add a review', async () => {
        const review = {
            customerId: 1,
            vehicleId: 1,
            rating: 5,
            comment: 'Excellent',
            date: new Date('2023-08-16'),
        };
        const expectedResult = { insertId: 1 };

        mockQuery.mockResolvedValueOnce([expectedResult]);

        const result = await service.addReview(review);
        expect(result).toEqual(expectedResult);
    });

    it('should update a review', async () => {
        const review = {
            customerId: 1,
            vehicleId: 1,
            rating: 5,
            comment: 'Excellent',
            date: new Date('2023-08-16'),
        };
        const expectedResult = { affectedRows: 1 };

        mockQuery.mockResolvedValueOnce([expectedResult]);

        const result = await service.updateReview(1, review);
        expect(result).toEqual(expectedResult);
    });

    it('should delete a review', async () => {
        const expectedResult = { affectedRows: 1 };
    
        mockQuery.mockResolvedValueOnce([expectedResult]);
    
        const result = await service.deleteReview(1);
        expect(result).toEqual(expectedResult);
    });
});
