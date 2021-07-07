public with sharing class RentalAuraService {
    @AuraEnabled
    public static List<Rental__c> getCurrentRentalsForUser(){
        String uid = UserInfo.getUserId();
        return [SELECT 
            Customer__c, 
            Due_Date__c, 
            Title_Name__c, 
            Title_Poster__c 
            FROM Rental__c 
            WHERE Customer__c = :uid
        ]; 
    }
}
