import { LightningElement, wire, track } from 'lwc';
import getCurrentRentalsForUser from '@salesforce/apex/RentalAuraService.getCurrentRentalsForUser';
import getPastRentalsForUser from '@salesforce/apex/RentalAuraService.getPastRentalsForUser';

export default class RentedTitlesList extends LightningElement {
    @wire(getCurrentRentalsForUser) currentRentals;
    @wire(getPastRentalsForUser) pastRentals;
    isSelected = false;

    handleClick(){
        this.isSelected = !this.isSelected;
    }

}