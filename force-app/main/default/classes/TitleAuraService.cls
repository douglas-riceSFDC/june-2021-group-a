public with sharing class TitleAuraService {
  @AuraEnabled
  public static List<Title__c> getLatestTitles() {
    return [
        SELECT Name, Genre__c, Poster__c, Available_Stock__c, Total_Stock__c
        FROM Title__c
        ORDER BY CreatedDate DESC
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

  @AuraEnabled (cacheable = true)
    public static List<Title__c> getFilteredTitles(String filters, String sortBy){

        String query = 'SELECT Name, Genre__c, Poster__c, Available_Stock__c,Total_Stock__c, Release_Date__c, Date_Released__c, Average_User_Rating__c  FROM Title__c';
        String whereClause = '';
        String sortCriteria = '';
        String orderBy = '';


        if(sortBy != ''){

          if(sortBy == 'highestRated'){
            sortCriteria = 'Average_User_Rating__c';
          } 
          else if(sortBy == 'release'){
            sortCriteria = 'Date_Released__c';
          }      
          orderBy = ' ORDER BY ' + sortCriteria + ' DESC';  
        }
       
        if(filters != 'All'){
            whereClause = ' WHERE Genre__c INCLUDES(\'' + filters + '\')';
        }

        List<Title__c> titleList = new List<Title__c>();

        titleList = Database.query(query + whereClause + orderBy);
        return titleList;
    }
}