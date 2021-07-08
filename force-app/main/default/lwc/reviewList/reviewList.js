import getTitleReviews from '@salesforce/apex/TitleAuraService.getTitleReviews';
import { LightningElement, api, track } from 'lwc';

export default class ReviewList extends LightningElement {
    @api recordId;
    @track reviews

    connectedCallback() {
        getTitleReviews({ titleId: this.recordId})
            .then(result => {
                this.reviews = result;
            })
            .catch(error => {
                console.error('Error occured', error);
            });
    }

    handleReviewButtonClick() {

    }
}
