import { LightningElement, api, track } from 'lwc';
import uId from '@salesforce/user/Id';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import generateMovieReview from '@salesforce/apex/MovieReviewAuraService.generateMovieReview';

export default class ReviewSubmission extends LightningElement {
    @api title;
    @track isMenuOpen = false;

    handleReviewButtonClick() {
        this.isMenuOpen = true;
    }

    handleCancelButtonClick() {
        this.isMenuOpen = false;
    }

    handleSubmitButtonClick() {

        const ratingInput = this.template.querySelector('.rating-input');
        const reviewInput = this.template.querySelector('.review-input');

        if (ratingInput.validity.valid && reviewInput.validity.valid) {
            generateMovieReview({
                titleId: this.title,
                reviewerId: uId,
                review: reviewInput.value,
                rating: ratingInput.value
            })
            .then( () => {
                location.reload();
            })
            .catch((error) => {
                const toastEvent = new ShowToastEvent({
                    title: "Submission failed",
                    message: error.body.pageErrors[0].message,
                    variant: "error"
                });
                this.dispatchEvent(toastEvent);
            });
            this.isMenuOpen = false;
        }
        else {
            const toastEvent = new ShowToastEvent({
                title: "Submission failed",
                message: "Please update the invalid form entries and try again.",
                variant: "error"
            });
            this.dispatchEvent(toastEvent);
        }
    }
}
