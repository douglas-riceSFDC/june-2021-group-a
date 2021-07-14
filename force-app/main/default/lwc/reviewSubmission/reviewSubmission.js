import uId from '@salesforce/user/Id';
import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { subscribe, MessageContext } from 'lightning/messageService';
import SELECTED_RATING_MC from "@salesforce/messageChannel/Selected_Rating__c";
import generateMovieReview from '@salesforce/apex/MovieReviewAuraService.generateMovieReview';

export default class ReviewSubmission extends LightningElement {
    @api title;
    @track selectedRating;
    @track isMenuOpen = false;

    @wire(MessageContext) messageContext;

    connectedCallback() {
        subscribe(this.messageContext,
                    SELECTED_RATING_MC,
                    (message) => {
                        this.selectedRating = message.rating;
                    });
    }

    handleReviewButtonClick() {
        this.isMenuOpen = true;
    }

    handleCancelButtonClick() {
        this.isMenuOpen = false;
    }

    handleSubmitButtonClick() {

        const reviewInput = this.template.querySelector('.review-input');

        if (this.selectedRating && reviewInput.validity.valid) {
            generateMovieReview({
                titleId: this.title,
                reviewerId: uId,
                review: reviewInput.value,
                rating: this.selectedRating 
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
        else if (!this.selectedRating && !reviewInput.validity.valid) {
            const toastEvent = new ShowToastEvent({
                title: "Submission failed",
                message: "Please write a review and select a rating.",
                variant: "error"
            });
            this.dispatchEvent(toastEvent);
        }
        else if (!this.selectedRating) {
            const toastEvent = new ShowToastEvent({
                title: "Submission failed",
                message: "Please select a rating by clicking on the stars.",
                variant: "error"
            });
            this.dispatchEvent(toastEvent);
        }
        else if (!reviewInput.validity.valid) {
            const toastEvent = new ShowToastEvent({
                title: "Submission failed",
                message: "Please write a review in the text box.",
                variant: "error"
            });
            this.dispatchEvent(toastEvent);
        }
        else {
            const toastEvent = new ShowToastEvent({
                title: "Submission failed",
                message: "Unknown error occured",
                variant: "error"
            });
            this.dispatchEvent(toastEvent);
        }
    }
}
