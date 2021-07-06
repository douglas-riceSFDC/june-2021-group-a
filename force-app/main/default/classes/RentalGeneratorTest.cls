@isTest
private class RentalGeneratorTest {
    @TestSetup
    static void setupRentalData(){
        Title__c testTitle = TestDataFactory.createTitle('Test Movie', 'Action');
        insert testTitle;

        Stock__c testStock = TestDataFactory.createStock(testTitle.Id, 'Available');
        insert testStock;        
    }
    
    @isTest
    static void methodUnderTest_given_should() {

    }

    @isTest
    static void generateRentalsForRentedStock_givenRentedStock_shouldGenerateRentals() {
        List<Stock__c> testStock = [SELECT Status__c FROM Stock__c];

        Test.startTest();

        testStock[0].Status__c = 'Rented';
        update testStock[0];

        Test.stopTest();

        List<Rental__c> generatedRentals = [SELECT Id FROM Rental__c];

        System.assertEquals(1, generatedRentals.size(), 'A rental should have been generated.');
    }

    @isTest
    static void generateRentalsForRentedStock_givenNonRentedStock_shouldNotGenerateRentals() {
        List<Stock__c> testStock = [SELECT Status__c FROM Stock__c];

        Test.startTest();

        testStock[0].Status__c = 'Missing';
        update testStock[0];

        Test.stopTest();

        List<Rental__c> generatedRentals = [SELECT Id FROM Rental__c];

        System.assertEquals(0, generatedRentals.size(), 'No rentals should have been generated.');
    }

    @isTest
    static void generateRentalsForRentedStock_givenAlreadyRentedStock_shouldNotGenerateAddRentals() {
        List<Stock__c> testStock = [SELECT Status__c FROM Stock__c];

        testStock[0].Status__c = 'Rented';
        update testStock[0];

        Test.startTest();

        update testStock[0];

        Test.stopTest();

        List<Rental__c> generatedRentals = [SELECT Id FROM Rental__c];

        System.assertEquals(1, generatedRentals.size(), 'Only one rental should have been generated.');
    }
}