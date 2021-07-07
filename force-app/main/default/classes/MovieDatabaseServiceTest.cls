@isTest
private class MovieDatabaseServiceTest {
    @isTest(SeeAllData=true)
    static void getInfoTest() {
        

        List<Title__c> titleList = new List<Title__c>();
        Title__c testTitle = new Title__c(Name='Inception');
        titleList.add(testTitle);
        insert titleList;

        Test.startTest();
        
        Id jobId = System.enqueueJob(new MovieDatabaseService(new List<Id>(new Map<Id, Title__c>(titleList).keySet())));
        //System.debug(new Map<Id, Title__c>(titleList).keySet());
        Test.stopTest();

        Title__c check = [SELECT Name, Runtime__c FROM Title__c WHERE Title__c.Name = 'Inception'];
        System.assertEquals('126 min', check.Runtime__c, 'Incorrect Runtime');

    }
}
