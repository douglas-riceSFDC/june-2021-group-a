import { LightningElement, track } from 'lwc';

export default class ReviewSubmission extends LightningElement {
    @track isMenuOpen = false;
    @track reviewText;
    @track reviewRating;

    handleReviewButtonClick() {
        this.isMenuOpen = true;
    }

    handleCancelButtonClick() {
        this.isMenuOpen = false;
    }

    handleSubmitButtonClick() {
        // Generate Review
        console.log(this.reviewRating);
        console.log(this.reviewText);
        // Display toast msg

        this.isMenuOpen = false;
        // this.reviewText = "";
        // this.reviewRating = "";
        location.reload();
    }

    changeText(event) {
        this.reviewText = event.target.value;
    }

    changeRating(event) {
        this.reviewRating = event.target.value;
    }

}
