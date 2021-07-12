@isTest
private class MovieDatabaseServiceTest {
    @isTest
    static void populateTitleFieldsTest_givenHttpResponse_expectedRuntimeUpdate() {
        Test.setMock(HttpCalloutMock.class, new MovieDatabaseServiceMock());

        List<Title__c> titleList = new List<Title__c>();
        Title__c testTitle = new Title__c(Name='Inception');
        titleList.add(testTitle);
        insert titleList;

        Test.startTest();
        
        MovieDatabaseService.populateTitleFields(new List<Id>(new Map<Id, Title__c>(titleList).keySet()));

        Test.stopTest();

        List<Title__c> check = [SELECT Name, Runtime__c FROM Title__c WHERE Title__c.Name = 'Inception'];
        System.assertEquals('148 min', check[0].Runtime__c, 'Incorrect Runtime');
    }

    @isTest
    static void populateTitleFieldsTest_givenBadStatusCode_expectedNullField() {
        Test.setMock(HttpCalloutMock.class, new MovieDatabaseServiceMockFailure());

        List<Title__c> titleList = new List<Title__c>();
        Title__c testTitle = new Title__c(Name='Inception');
        titleList.add(testTitle);
        insert titleList;

        Test.startTest();
        
        MovieDatabaseService.populateTitleFields(new List<Id>(new Map<Id, Title__c>(titleList).keySet()));

        Test.stopTest();

        List<Title__c> check = [SELECT Name, Runtime__c FROM Title__c WHERE Title__c.Name = 'Inception'];
        System.assertEquals(null, check[0].Runtime__c, 'Incorrect Runtime');
    }

}
