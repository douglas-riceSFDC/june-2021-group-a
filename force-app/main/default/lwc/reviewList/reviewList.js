import { LightningElement, api, track, wire } from 'lwc';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import getTitleReviews from '@salesforce/apex/MovieReviewAuraService.getTitleReviews';
import generateUserReviews from '@salesforce/apex/MovieReviewAuraService.generateUserReviews';
import AVERAGE_USER_RATING_FIELD from '@salesforce/schema/Title__c.Average_User_Rating__c'

export default class ReviewList extends LightningElement {
    @api recordId;
    @track reviews;
    @wire(getRecord, { recordId: '$recordId', fields: AVERAGE_USER_RATING_FIELD })
    title;
    @track detailsPage = false;

    get averageUserRating() { return this.title.data ? getFieldValue(this.title.data, AVERAGE_USER_RATING_FIELD) : 0 ; }
    

    connectedCallback() {
        if(this.recordId != ''){
            console.log('Record Id ->' + this.recordId);
            this.detailsPage = true;
            getTitleReviews({ titleId: this.recordId})
                .then(result => {
                    this.reviews = result;
                })
                .catch(error => {
                    console.error('Error occured', error);
                });
        } else{
            generateUserReviews()
             .then(result => {
                    this.reviews = result;
             })
               .catch(error => {
                  console.error('Error occured', error);
              });
        }
    }
}