import { LightningElement, api, track} from 'lwc';

export default class StarRating extends LightningElement {
    @api rating;
    @track isFiveStar = false;
    @track isFourStar = false;
    @track isThreeStar = false;
    @track isTwoStar = false;
    @track isOneStar = false;
    @track isZeroStar = false;

    connectedCallback() {
        switch (this.rating) {
            case 5:
                this.isFiveStar = true;
                break;
            case 4:
                this.isFourStar = true;
                break;
            case 3:
                this.isThreeStar = true;
                break;
            case 2:
                this.isTwoStar = true;
                break;
            case 1:
                this.isOneStar = true;
                break;
            case 0:
                this.isZeroStar = true;
                break;
            default:
                break;
        }
    }
}
