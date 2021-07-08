public with sharing class RentalAuraService {
    @AuraEnabled(cacheable=true)
    public static List<Rental__c> getCurrentRentalsForUser(){
        String uid = UserInfo.getUserId();
        return [SELECT
            Id, 
            Customer__c,
            Stock__r.Title__c, 
            Due_Date__c, 
            Title_Name__c,
            Overdue__c, 
            Title_Poster__c 
            FROM Rental__c 
            WHERE Customer__c = :uid
        ]; 
    }
}
