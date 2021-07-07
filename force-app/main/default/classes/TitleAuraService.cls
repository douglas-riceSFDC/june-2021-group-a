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

  // @AuraEnabled
  // public static List<Rental__c> rentTitle(Title__c title) {

  //     List<Rental__c> newRentals = new List<Rental__c>();
  //     List<Stock__c> availableStock = [SELECT Name, Status__c, Title__c
  //                                      FROM Stock__c
  //                                      WHERE Status__c LIKE 'Available'
  //                                      AND Title__c = :title.Id];
  //     newRentals.add(new Rental__c(Stock__c = availableStock[0].Id));
  //     availableStock[0].Status__c = 'Rented';
  //     update availableStock;
  //     insert newRentals;
  //     return newRentals;
  // }
}
