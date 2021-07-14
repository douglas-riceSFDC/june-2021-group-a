import { LightningElement, api } from 'lwc';

export default class StarRatingContainer extends LightningElement {
    @api rating;
    @api isInteractive = false;
}
