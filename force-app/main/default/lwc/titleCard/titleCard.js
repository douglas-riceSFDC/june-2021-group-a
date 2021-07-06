import { LightningElement, api, wire } from 'lwc';

import { publish, MessageContext } from 'lightning/messageService';
import SELECTED_TITLE_MC from '@salesforce/messageChannel/Selected_Title__c';

export default class TitleCard extends LightningElement {
	@api title;

	@wire(MessageContext)
		messageContext;
	
	handleTitleSelection() {
		console.log("firing event");
		const payload ={title: this.title};
		publish(this.messageContext, SELECTED_TITLE_MC, payload);
	}



}