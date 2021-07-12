@isTest
private class MovieRecommendationsEngineTest {

    public List<Rental__c> createTestData() {
        List<Title__c> titles = new List<Title__c>();

        Title__c inception = new Title__c(Name='Inception');
        Title__c ironman = new Title__c(Name='Iron Man');
        Title__c notebook = new Title__c (Name = 'The Notebook');

        titles.add(inception);
        titles.add(ironman);
        titles.add(notebook);

        insert titles;

        List<Stock__c> stocks = new List<Stock__c>();

        Stock__c inceptionStock = new Stock__c(Title__c = titles[0].Id);
        Stock__c ironmanStock = new Stock__c(Title__c = titles[1].Id);
        Stock__c notebookStock = new Stock__c(Title__c = titles[2].Id);

        insert stocks;

        Rental__c newRental = new Rental__c(
            Stock__c = stocks[0].Id,
            Customer__c = UserInfo.getUserId()
        );

        insert newRental;

        return newRental;
    }

    @isTest
    static void getRecommendationsTest_givenGenre_expectedTitlesWithGenres() {
        List<Rental__c> rentals = createTestData();

        
    }
}
