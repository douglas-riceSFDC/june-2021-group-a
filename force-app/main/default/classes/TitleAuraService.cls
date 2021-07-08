public with sharing class TitleAuraService {
  @AuraEnabled
  public static List<Title__c> getLatestTitles(Integer limiter) {
    return [
        SELECT Name, Genre__c, Thumbnail__c, Available_Stock__c, Total_Stock__c
        FROM Title__c
        ORDER BY CreatedDate DESC
        LIMIT :limiter
    ];
  }

  @AuraEnabled
  public static List<Title__c> getOutOfStockTitles() {
    return [
        SELECT Name, Genre__c, Thumbnail__c, Available_Stock__c, Total_Stock__c
        FROM Title__c
        WHERE Available_Stock__c = 0
        ORDER BY CreatedDate DESC
    ];
  }

  @AuraEnabled
  public static void rentTitle(ID titleId) {

    Stock__c availableStock = [
        SELECT Name, Status__c, Title__c
        FROM Stock__c
        WHERE Status__c LIKE 'Available'
        AND Title__c = :titleId
        LIMIT 1
    ];
    availableStock.Status__c = 'Rented';
    update availableStock;
  }

  @AuraEnabled
  public static List<Movie_Review__c> getTitleReviews(ID titleId) {
    return [
        SELECT Name, Rating__c, Review__c, Reviewer__r.Name, 
               Reviewer__r.MediumPhotoURL, Title__c
        FROM Movie_Review__c
        WHERE Title__c = :titleId
    ];
  }
}
