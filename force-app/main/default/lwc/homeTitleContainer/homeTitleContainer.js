import { LightningElement, api, track , wire} from 'lwc';
import getFilteredTitles from '@salesforce/apex/TitleAuraService.getFilteredTitles';

import { subscribe, MessageContext } from 'lightning/messageService';
import MOVIES_FILTERED_MESSAGE from '@salesforce/messageChannel/Movies_Filtered__c';

export default class HomeTitleContainer extends LightningElement {
 
    @api limit = 5;
    @track filters = 'All';
    @track sortBy = '';
    @track moviesFilterSubscription;
    @wire (MessageContext)
    messageContext;

    @wire(getFilteredTitles,{ filters: '$filters' , sortBy: '$sortBy' })
    titles;

    sortedTitles

    connectedCallback(){

        this.moviesFilterSubscription = subscribe(
            this.messageContext,
            MOVIES_FILTERED_MESSAGE,
            (message) => this.handleFilterChange(message)
        );
        
    }

    handleFilterChange(message){
        this.filters = message.filters.filters;
        this.sortBy = message.filters.sortBy;  
    }
}