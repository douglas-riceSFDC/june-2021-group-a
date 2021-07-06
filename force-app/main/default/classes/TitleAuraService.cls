public with sharing class TitleAuraService {
    
    @AuraEnabled
    public static List<Title__c> getLatestTitles(Integer limiter){
        return [SELECT Name, Genre__c, Thumbnail__c, Available_Stock__c, Total_Stock__c
                FROM Title__c
                ORDER BY CreatedDate DESC
                LIMIT :limiter];
    }

    @AuraEnabled
    public static List<Title__c> getOutOfStockTitles(){
        return [SELECT Name, Genre__c, Thumbnail__c, Available_Stock__c, Total_Stock__c
                FROM Title__c
                WHERE Available_Stock__c = 0
                ORDER BY CreatedDate DESC];

    }
}