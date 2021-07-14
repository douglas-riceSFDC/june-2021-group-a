public with sharing class TestDataFactory {
    public static User createUser( String firstName, String lastName) {
        return new User(
            FirstName = firstName,
            LastName = lastName,
            Username = firstName + '.' + lastname + '@test.net',
            Email = firstName + '.' + lastname + '@test.net',
            Alias = firstName.substring(1, 4) + lastName.substring(1,2),
            TimeZoneSidKey = 'America/New_York',
            LocaleSidKey = 'en_US',
            EmailEncodingKey = 'ISO-8859-1',
            ProfileId = [SELECT Id
                         FROM Profile
                         WHERE Name = 'System Administrator'
                         LIMIT 1].Id,
            LanguageLocaleKey = 'en_US');
    }

    public static Title__c createTitle(String name, String genre) {
        Title__c t = new Title__c();
        t.Name = name;
        t.Genre__c = genre;

        return t;
    }

    public static Stock__c createStock(Id titleId, String status) {
        Stock__c s = new Stock__c();
        s.Title__c = titleId;
        s.Status__c = 'Available';

        return s;
    }

    public static Movie_Review__c createReview(
            Id titleId,
            Id reviewerId,
            String review,
            Integer rating) {
        Movie_Review__c r = new Movie_Review__c();
        r.Title__c = titleId;
        r.Reviewer__c = reviewerId;
        r.Review__c = review;
        r.Rating__c = rating;

        return r;
    }
}
