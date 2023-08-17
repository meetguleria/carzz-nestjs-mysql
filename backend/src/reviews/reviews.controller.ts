import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    @Get()
    getAllReviews() {
        return this.reviewsService.getAllReviews();
    }

    @Post()
    addReview(@Body() review: { customerId: number; vehicleId: number; rating: number; comment: string; date: Date }) {
        return this.reviewsService.addReview(review);
    }

    @Get(':id')
    getReviewById(@Param('id') id: number) {
        return this.reviewsService.getReviewById(id);
    }

    @Put(':id')
    updateReview(@Param('id') id: number, @Body() review: { rating?: number; comment?: string; date?: Date }) {
        return this.reviewsService.updateReview(id, review);
    }

    @Delete(':id')
    deleteReview(@Param('id') id: number) {
        return this.reviewsService.deleteReview(id);
    }
}
