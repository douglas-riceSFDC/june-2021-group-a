import { LightningElement, api, track, wire } from 'lwc';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';

import TITLE_OBJECT from '@salesforce/schema/Title__c';
import NAME_FIELD from '@salesforce/schema/Title__c.Name';
import DIRECTOR_FIELD from '@salesforce/schema/Title__c.Director__c';
import GENRE_FIELD from '@salesforce/schema/Title__c.Genre__c';
import LANGUAGE_FIELD from '@salesforce/schema/Title__c.Language__c';
import NOTABLE_ACTORS_FIELD from '@salesforce/schema/Title__c.Notable_Actors__c';
import PLOT_DESCRIPTION_FIELD from '@salesforce/schema/Title__c.Plot_Description__c';
import POSTER_FIELD from '@salesforce/schema/Title__c.Poster__c';
import RELEASE_DATE_FIELD from '@salesforce/schema/Title__c.Release_Date__c';
import RUNTIME_FIELD from '@salesforce/schema/Title__c.Runtime__c';
import WRITER_FIELD from '@salesforce/schema/Title__c.Writer__c';
import AVAILABLE_STOCK_FIELD from '@salesforce/schema/Title__c.Available_Stock__c';

const FIELDS = [ NAME_FIELD, DIRECTOR_FIELD, GENRE_FIELD, LANGUAGE_FIELD,
                 NOTABLE_ACTORS_FIELD, PLOT_DESCRIPTION_FIELD, POSTER_FIELD,
                 RELEASE_DATE_FIELD, RUNTIME_FIELD, WRITER_FIELD, AVAILABLE_STOCK_FIELD ]

export default class TitleDetails extends LightningElement {

    @api recordId;
    @api titleObject = TITLE_OBJECT;
    @track isInStock;
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    title;

    get name() { return this.title.data ? getFieldValue(this.title.data, NAME_FIELD) : ''; }
    get director() { return this.title.data ? getFieldValue(this.title.data, DIRECTOR_FIELD) : '' }
    get genre() { return this.title.data ? getFieldValue(this.title.data, GENRE_FIELD) : '' }
    get language() { return this.title.data ? getFieldValue(this.title.data, LANGUAGE_FIELD) : '' }
    get notableActors() { return this.title.data ? getFieldValue(this.title.data, NOTABLE_ACTORS_FIELD) : '' }
    get plotDescription() { return this.title.data ? getFieldValue(this.title.data, PLOT_DESCRIPTION_FIELD) : '' }
    get poster() { return this.title.data ? getFieldValue(this.title.data, POSTER_FIELD) : '' }
    get releaseDate() { return this.title.data ? getFieldValue(this.title.data, RELEASE_DATE_FIELD) : '' }
    get runtime() { return this.title.data ? getFieldValue(this.title.data, RUNTIME_FIELD) : '' }
    get writer() { return this.title.data ? getFieldValue(this.title.data, WRITER_FIELD) : '' }
    get availableStock() {
        if (this.title.data) {
            let stock = getFieldValue(this.title.data, AVAILABLE_STOCK_FIELD);
            stock ? this.isInStock = true : this.isInStock = false;
            return stock;
        }
        else {
            return '';
        }
    }

    handleRentalClick() {

    };

}