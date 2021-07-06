import { LightningElement, wire, track } from 'lwc';

import { subscribe, MessageContext } from 'lightning/messageService';
import SELECTED_TITLE_MC from '@salesforce/messageChannel/Selected_Title__c';

import getAllChildStockForTitle from '@salesforce/apex/StockAuraService.getAllChildStockForTitle';

export default class RelatedStockContainer extends LightningElement {
	@wire(MessageContext)
		messageContext;
    
    @track stock;
    @track title;
    @track selectedStockId;

    connectedCallback() {
        this.subscribeToSelectedTitle();
    }

    subscribeToSelectedTitle() {
        subscribe(this.messageContext, SELECTED_TITLE_MC, (message) => this.handleSelectedTitleMessage(message));
    }

    handleSelectedTitleMessage(message) {
        console.log(JSON.parse(JSON.stringify(message)));
        this.title = message.title;

        getAllChildStockForTitle({ titleId: message.title.Id })
            .then(result => {
                console.log('Related stock: ', JSON.parse(JSON.stringify(result)));
                this.stock = result;
            })
            .catch(error => {
                console.error('Error occured', error);
            });
    }

    handleStockClicked(event){
        console.log('stock clicked - ' + event.detail);
        this.selectedStockId = event.detail;
    }
    
}