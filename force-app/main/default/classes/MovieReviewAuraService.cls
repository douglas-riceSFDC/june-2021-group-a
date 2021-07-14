public with sharing class MovieReviewAuraService {

    @AuraEnabled (cacheable = true)
    public static List<Movie_Review__c> getTitleReviews(ID titleId) {
        return [
            SELECT Name, Rating__c, Review__c, Reviewer__r.Name,
            Reviewer__r.MediumPhotoURL, Title__c
            FROM Movie_Review__c
            WHERE Title__c = :titleId
        ];
    }


    @AuraEnabled (cacheable = true)
    public static void generateMovieReview(ID titleId, ID reviewerId, String review, Integer rating) {
        Movie_Review__c newReview = new Movie_Review__c();
        newReview.Title__c = titleId;
        newReview.Reviewer__c = reviewerId;
        newReview.Review__c = review;
        newReview.Rating__c = rating;

        insert newReview;
    }

    @AuraEnabled
    public static List<Movie_Review__c> generateUserReviews(){
      String uid = UserInfo.getUserId();
        return [
          SELECT Name, Rating__c, Review__c, Reviewer__r.Name,
          Reviewer__r.MediumPhotoURL, Title__r.id, Title__r.Name, Title__r.Poster__c
          FROM Movie_Review__c
          WHERE Reviewer__r.Id = :uid
      ];
    }
}