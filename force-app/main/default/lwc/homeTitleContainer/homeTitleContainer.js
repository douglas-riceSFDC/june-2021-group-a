import { LightningElement, api, track } from 'lwc';
import getLatestTitles from '@salesforce/apex/TitleAuraService.getLatestTitles';

export default class HomeTitleContainer extends LightningElement {
    @api limit;
    @track titles;

    connectedCallback() {
        getLatestTitles({ limiter: this.limit})
            .then(result => {
                this.titles = result;
            })
            .catch(error => {
                console.error('Error occured'. error);
            });
    }
}