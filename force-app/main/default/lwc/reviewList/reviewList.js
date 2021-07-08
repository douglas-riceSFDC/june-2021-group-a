import getTitleReviews from '@salesforce/apex/TitleAuraService.getTitleReviews';
import { LightningElement, api, track } from 'lwc';

export default class ReviewList extends LightningElement {
    @api recordId;
    @track reviews;
    @track averageRating;

    connectedCallback() {
        getTitleReviews({ titleId: this.recordId})
            .then(result => {
                this.reviews = result;

                let ratings = [];
                for (const review in this.reviews) {
                    ratings.push(review.Rating__c)
                }
                this.averageRating = ratings.reduce((total, current) => total + current) / ratings.length;
            })
            .catch(error => {
                console.error('Error occured', error);
            });
    }

    handleReviewButtonClick() {

    }
}
