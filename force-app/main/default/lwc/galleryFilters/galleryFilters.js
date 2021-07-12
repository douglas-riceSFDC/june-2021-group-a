import { LightningElement, track,wire } from 'lwc';
import { getPicklistValues }  from 'lightning/uiObjectInfoApi';

import GENRE_FIELD from '@salesforce/schema/Title__c.Genre__c';

import MOVIES_FILTERED_MESSAGE from '@salesforce/messageChannel/Movies_Filtered__c';
import { publish, MessageContext } from 'lightning/messageService';

export default class ComboboxBasic extends LightningElement {

    @track genre;
    @track genreOptions;
    @track sort;
    @track criteria = {
        filters: 'All',
        sortBy: '',
    };
    @wire(MessageContext)
    messageContext;

    @wire(getPicklistValues,{ recordTypeId: '012000000000000AAA', fieldApiName:  GENRE_FIELD})
    getPicklistValues({error,data}){

        if(data){ 

           this.genreOptions = data.values.map(pValue => {
                return { 
                            label: pValue.label, 
                            value: pValue.value 
                        };
            }); 

            this.genreOptions.push({label: 'All', value:'all'});

        } else if(error){
            console.log(error);
        }
    }

    get sortOptions() {
        return [
            { label: 'Release Date', value: 'release' },
            { label: 'Highest Rated', value: 'highestRated' },
        ];
    }

    handleChange(event) {  
        let targetName = event.target.name; 

        if(targetName === 'Genre'){
            this.genre = event.detail.value;   
            this.criteria.filters = event.detail.value
        }
        else if(targetName === 'SortBy'){
            this.sort = event.detail.value;
            this.criteria.sortBy = event.detail.value
        }

        let payload = {filters : this.criteria};
        publish(this.messageContext, MOVIES_FILTERED_MESSAGE, payload);
         
    }
}