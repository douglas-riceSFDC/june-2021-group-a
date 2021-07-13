import { LightningElement, track, wire } from 'lwc';
import { MessageContext, publish } from 'lightning/messageService';
import SELECTED_RATING_MC from '@salesforce/messageChannel/Selected_Rating__c'

export default class StarRatingInteractive extends LightningElement {
    @track selectedRating;
    @track starState1 = "default";
    @track starState2 = "default";
    @track starState3 = "default";
    @track starState4 = "default";
    @track starState5 = "default";

    @wire (MessageContext) messageContext;

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

        const payload = {rating: this.selectedRating};
        publish(this.messageContext, SELECTED_RATING_MC, payload);
    }
}
