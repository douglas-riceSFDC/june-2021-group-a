public with sharing class TestDataFactory {
    public static Title__c createTitle(String name, String genre) {
        Title__c t = new Title__c();
        t.Name = name;
        t.Genre__c = genre;

        return t;
    }

    public static Stock__c createStock(Id titleId, String status) {
        Stock__c s = new Stock__c();
        s.Title__c = titleId;
        s.Status__c = 'Available';

        return s;
    }
}