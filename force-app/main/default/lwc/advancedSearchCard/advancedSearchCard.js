import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class AdvancedSearchCard extends NavigationMixin(LightningElement) {
    @api TitleId;
    //recordPageUrl;
    NavigateToViewDetailsPage(){
        console.log('Navigating');
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.TitleId.Id,
                actionName: 'view'
            }
        });
    }
}