public with sharing class AdvancedSearchController {
    @AuraEnabled(cacheable=true)
    public static List<Title__c> getMovieList(String searchKey) {
        String searchKeyword = '%' + searchKey + '%';
		
       // create movie list to store search result 
        List<Title__c> movieListRecord = new List<Title__c>();
     
	   // query movie records
       if(searchKey == ''){return movieListRecord;}
        for(Title__c titleObj : [SELECT id,Name,Director__c,Writer__c,Notable_Actors__c
                            FROM Title__c
                            WHERE name LIKE : searchKeyword OR Director__c LIKE : searchKeyword OR 
                            Writer__c LIKE : searchKeyword OR Notable_Actors__c LIKE : searchKeyword]){
                                movieListRecord.add(titleObj);
        }
        
       /*()  if(movieListRecord.size() == 0){
            throw new AuraHandledException('No Record Found..'); 
         } /*else if (movieListRecord.size() == 1){
            throw new AuraHandledException('One Record Found!'); 
         }*/
    
        return movieListRecord;
    }
}
