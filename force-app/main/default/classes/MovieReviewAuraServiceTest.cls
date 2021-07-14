@isTest
private class MovieReviewAuraServiceTest {
    
    @TestSetup
    static void setupReviewData() {

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
}
