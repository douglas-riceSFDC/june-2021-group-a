import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import { publish, MessageContext } from 'lightning/messageService';
import SELECTED_TITLE_MC from '@salesforce/messageChannel/Selected_Title__c';

export default class TitleCard extends NavigationMixin(LightningElement) {
	@api title;

	@wire(MessageContext)
		messageContext;
	
	handleTitleSelection() {
		console.log("firing event");
		this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.title.Id,
                actionName: 'view'
            }
		});
	}



}