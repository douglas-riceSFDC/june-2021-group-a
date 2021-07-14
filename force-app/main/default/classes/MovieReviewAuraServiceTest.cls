@isTest
private class MovieReviewAuraServiceTest {
    
    @TestSetup
    static void setupReviewData() {
        Test.setMock(HttpCalloutMock.class, new MovieDatabaseServiceMock());

        Title__c testTitle = TestDataFactory.createTitle('Review Test Title', 'Action');
        insert testTitle;

        User testReviewer = TestDataFactory.createUser('Test', 'Reviewer');
        insert testReviewer;

        Movie_Review__c testReview = TestDataFactory.createReview(
            testTitle.Id,
            testReviewer.Id,
            'This is a test review.',
            5
        );
        insert testReview;
    }

    @isTest
    static void getTitleReviews_givenTitleId_shouldReturnReviews() {

        Title__c testTitle = [SELECT Id FROM Title__c LIMIT 1];
        User testReviewer = [SELECT Id
                             FROM User
                             WHERE FirstName = 'Test'
                             AND LastName = 'Reviewer'
                             LIMIT 1];

        List<Movie_Review__c> testReview = MovieReviewAuraService.getTitleReviews(testTitle.Id);

        System.assertEquals(testTitle.Id, testReview[0].Title__c);
        System.assertEquals(testReviewer.Id, testReview[0].Reviewer__c);
        System.assertEquals('This is a test review.', testReview[0].Review__c);
        System.assertEquals(5, testReview[0].Rating__c);
    }
}
