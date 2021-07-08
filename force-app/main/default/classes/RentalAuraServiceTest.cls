@isTest
private class RentalAuraServiceTest {
    @isTest
    static void getCurrentRentalsForUserTest() {
        Test.setMock(HttpCalloutMock.class, new MovieDatabaseServiceMock());

        Title__c title = new Title__c(Name='Inception');
        insert title;
        Stock__c stock = new Stock__c(Title__c = title.Id);
        insert stock;

        Rental__c newRental = new Rental__c(
            Stock__c = stock.Id,
            Customer__c = UserInfo.getUserId()
        );
        insert newRental;

        Test.startTest();

        List<Rental__c> rentals = RentalAuraService.getCurrentRentalsForUser();
        
        Test.stopTest();

        System.debug(rentals);

        System.assert(rentals.size() > 0);
    }
}
