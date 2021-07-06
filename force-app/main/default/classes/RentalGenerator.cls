public with sharing class RentalGenerator {
    public RentalGenerator() {

    }

    public void generateRentalsForRentedStock(List<Stock__c> updatedStock, 
                                                Map<Id, Stock__c> oldStockValueMap) {

        List<Rental__c> generatedRentals = new List<Rental__c>();

        Rental__c newRental;
        for(Stock__c s : updatedStock) {
            if(s.Status__c == 'Rented' && oldStockValueMap.get(s.Id).Status__c != 'Rented') {
                newRental = new Rental__c();
                newRental.Stock__c = s.Id;
                newRental.Customer__c = UserInfo.getUserId();

                generatedRentals.add(newRental);
            }
        }

        insert generatedRentals;
    }
}