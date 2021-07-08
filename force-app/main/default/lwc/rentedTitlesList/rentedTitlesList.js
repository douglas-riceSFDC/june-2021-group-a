import { LightningElement, wire, track } from 'lwc';
import getCurrentRentalsForUser from '@salesforce/apex/RentalAuraService.getCurrentRentalsForUser';

export default class RentedTitlesList extends LightningElement {
    @wire(getCurrentRentalsForUser) rentals;
}