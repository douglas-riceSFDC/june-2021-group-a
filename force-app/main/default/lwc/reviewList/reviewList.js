import { LightningElement, api, track, wire } from 'lwc';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import getTitleReviews from '@salesforce/apex/TitleAuraService.getTitleReviews';
import AVERAGE_USER_RATING_FIELD from '@salesforce/schema/Title__c.Average_User_Rating__c'

export default class ReviewList extends LightningElement {
    @api recordId;
    @track reviews;
    @wire(getRecord, { recordId: '$recordId', fields: [AVERAGE_USER_RATING_FIELD] })
    title;

    get averageUserRating() {
        return this.title.data ? getFieldValue(this.title.data, AVERAGE_USER_RATING_FIELD) : '';
    }

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
