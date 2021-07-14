import { LightningElement, api, track} from 'lwc';

export default class StarRating extends LightningElement {
    @api rating;
    @track starState1 = "default";
    @track starState2 = "default";
    @track starState3 = "default";
    @track starState4 = "default";
    @track starState5 = "default";

    connectedCallback() {
        switch (this.rating) {
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
}
