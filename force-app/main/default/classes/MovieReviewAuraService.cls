public with sharing class MovieReviewAuraService {

    @AuraEnabled (cacheable = true)
    public static List<Movie_Review__c> getTitleReviews(ID titleId) {
      return [
          SELECT Name, Rating__c, Review__c, Reviewer__r.Name,
          Reviewer__r.MediumPhotoURL, Title__c, Title__r.Average_User_Rating__c
          FROM Movie_Review__c
          WHERE Title__c = :titleId
      ];
    }
}
