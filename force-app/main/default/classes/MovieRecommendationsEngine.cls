public with sharing class MovieRecommendationsEngine {
    @AuraEnabled (cacheable = true)
    public static List<Title__c> getRecommendedMovies(){
        String rentedGenres = getRentedGenres();
        List<Title__c> rentedTitles = getRentedTitles();

        String queryString = 'SELECT Id, Name, Genre__c FROM Title__c WHERE Genre__c INCLUDES (' + rentedGenres + ')';

        List<Title__c> similarTitles = Database.query(queryString);
        for (Title__c rentedTitle : rentedTitles) {
            if (similarTitles.contains(rentedTitle)) {
                similarTitles.remove(similarTitles.indexOf(rentedTitle));
            }
        }

        return similarTitles;
    }

    private static String getRentedGenres() {
        List<Title__c> rentedTitles = getRentedTitles();
        
        String includesRentalStr = '';

        for (Title__c title : rentedTitles) {
            String genres = title.Genre__c;
            includesRentalStr = includesRentalStr + '\'' + genres.replace(';', '\',\'') + '\',';
        }
        
        return includesRentalStr.substring(0, includesRentalStr.length() - 1);
    }

    private static List<Title__c> getRentedTitles() {
        String uid = UserInfo.getUserId();
        List<Rental__c> rentals = [SELECT
                                    Id, 
                                    Customer__c,
                                    Stock__r.Title__c,
                                    Title_Name__c
                                    FROM Rental__c 
                                    WHERE Customer__c = :uid
                                ];
        List<String> rentedTitleNames = new List<String>();

        for (Rental__c rental : rentals) {
            rentedTitleNames.add(rental.Title_Name__c);
        }

        List<Title__c> rentedTitles = [SELECT
                                        Id,
                                        Name,
                                        Genre__c
                                        FROM Title__c
                                        WHERE Name IN :rentedTitleNames
                                    ];
        return rentedTitles;
    }
}
