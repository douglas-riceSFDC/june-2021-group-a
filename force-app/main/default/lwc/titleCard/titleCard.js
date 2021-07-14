import { LightningElement, api, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { MessageContext } from 'lightning/messageService';


export default class TitleCard extends NavigationMixin(LightningElement) {
	@api title;
	@track availability = 'Available';
	@wire(MessageContext)
		messageContext;
	
	
	connectedCallback(){
		this.setAvailability();
	}

	handleTitleSelection() {
		this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.title.Id,
                actionName: 'view'
            }
		});
	}

	setAvailability(){
		if(this.title.Available_Stock__c === 0){
			this.availability = 'Out of Stock'
		}
	}
	
}