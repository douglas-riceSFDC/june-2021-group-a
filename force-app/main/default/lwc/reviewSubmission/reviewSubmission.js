import { LightningElement, api, track } from 'lwc';
import uId from '@salesforce/user/Id';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import generateMovieReview from '@salesforce/apex/MovieReviewAuraService.generateMovieReview';

export default class ReviewSubmission extends LightningElement {
    @api title;
    @track isMenuOpen = false;
    @track starState1 = "default";
    @track starState2 = "default";
    @track starState3 = "default";
    @track starState4 = "default";
    @track starState5 = "default";
    @track selectedRating;

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

    handleRatingHover(event) {
        switch(event.target.getAttribute('data-id')) {
            case "star1":
                this.starState1 = "warning";
                this.starState2 = "default";
                this.starState3 = "default";
                this.starState4 = "default";
                this.starState5 = "default";
                break;
            case "star2":
                this.starState1 = "warning";
                this.starState2 = "warning";
                this.starState3 = "default";
                this.starState4 = "default";
                this.starState5 = "default";
                break;
            case "star3":
                this.starState1 = "warning";
                this.starState2 = "warning";
                this.starState3 = "warning";
                this.starState4 = "default";
                this.starState5 = "default";
                break;
            case "star4":
                this.starState1 = "warning";
                this.starState2 = "warning";
                this.starState3 = "warning";
                this.starState4 = "warning";
                this.starState5 = "default";
                break;
            case "star5":
                this.starState1 = "warning";
                this.starState2 = "warning";
                this.starState3 = "warning";
                this.starState4 = "warning";
                this.starState5 = "warning";
                break;
            default:
                break;
        }
    }

    handleRatingHoverOut() {
        switch(this.selectedRating) {
            case 1:
                this.starState1 = "warning";
                this.starState2 = "default";
                this.starState3 = "default";
                this.starState4 = "default";
                this.starState5 = "default";
                break;
            case 2:
                this.starState1 = "warning";
                this.starState2 = "warning";
                this.starState3 = "default";
                this.starState4 = "default";
                this.starState5 = "default";
                break;
            case 3:
                this.starState1 = "warning";
                this.starState2 = "warning";
                this.starState3 = "warning";
                this.starState4 = "default";
                this.starState5 = "default";
                break;
            case 4:
                this.starState1 = "warning";
                this.starState2 = "warning";
                this.starState3 = "warning";
                this.starState4 = "warning";
                this.starState5 = "default";
                break;
            case 5:
                this.starState1 = "warning";
                this.starState2 = "warning";
                this.starState3 = "warning";
                this.starState4 = "warning";
                this.starState5 = "warning";
                break;
            default:
                this.starState1 = "default";
                this.starState2 = "default";
                this.starState3 = "default";
                this.starState4 = "default";
                this.starState5 = "default";
                break;
        }
    }

    handleRatingClick(event) {
        switch(event.target.getAttribute('data-id')) {
            case "star1":
                this.selectedRating = 1;
                break;
            case "star2":
                this.selectedRating = 2;
                break;
            case "star3":
                this.selectedRating = 3;
                break;
            case "star4":
                this.selectedRating = 4;
                break;
            case "star5":
                this.selectedRating = 5;
                break;
            default:
                break;
        }
    }
}
