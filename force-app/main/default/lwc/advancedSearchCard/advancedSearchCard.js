import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class AdvancedSearchCard extends NavigationMixin(LightningElement) {
    //@api recordId;
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