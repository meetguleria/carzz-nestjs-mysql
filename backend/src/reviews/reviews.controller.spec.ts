import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

const mockReview = {
    reviewId: 1,
    customerId: 1,
    vehicleId: 1,
    rating: 5,
    comment: 'Excellent',
    date: new Date('2023-08-16'),
};

const mockAddResult = {
    insertId: 1,
};

describe('ReviewsController', () => {
    let controller: ReviewsController;
    let service: ReviewsService;

    beforeEach(async () => {
        service = {
            getAllReviews: jest.fn().mockResolvedValue([mockReview]),
            getReviewById: jest.fn().mockResolvedValue(mockReview),
            addReview: jest.fn().mockResolvedValue(mockAddResult),
            updateReview: jest.fn().mockResolvedValue({ affectedRows: 1 }),
            deleteReview: jest.fn().mockResolvedValue({ affectedRows: 1 }),
        } as any;

        const module: TestingModule = await Test.createTestingModule({
            controllers: [ReviewsController],
            providers: [
                { provide: ReviewsService, useValue: service },
            ],
        }).compile();

        controller = module.get<ReviewsController>(ReviewsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAllReviews', () => {
        it('should get all reviews', async () => {
            expect(await controller.getAllReviews()).toEqual([mockReview]);
        });
    });

    describe('getReviewById', () => {
        it('should get a review by ID', async () => {
            expect(await controller.getReviewById(1)).toEqual([mockReview]);
        })
    })

    describe('addReview', () => {
        it('should add a review', async () => {
            expect(await controller.addReview(mockReview)).toEqual(mockAddResult);
        });
    });

    describe('updateReview', () => {
        it('should update a review', async () => {
            expect(await controller.updateReview(1, mockReview)).toEqual({ affectedRows: 1 });
        });
    });

    describe('deleteReview', () => {
        it('should delete a review', async () => {
            expect(await controller.deleteReview(1)).toEqual({ affectedRows: 1 });
        });
    });
});
