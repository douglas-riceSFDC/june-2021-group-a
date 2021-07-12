public with sharing class MovieRecommendationsEngine {
    @AuraEnabled
    public static List<Title__c> getRecommendedMovies(){
        List<String> rentedGenres = getRentedGenres();
        List<Title__c> rentedTitles = getRentedTitles();

        List<Title__c> similarTitles = [SELECT
                                            Id,
                                            Name,
                                            Genre__c
                                            FROM Title__c
                                            WHERE Genre__c INCLUDES (:rentedGenres)
                                        ];
        
        for (Title__c rentedTitle : rentedTitles) {
            if (similarTitles.contains(rentedTitle)) {
                similarTitles.remove(similarTitles.indexOf(rentedTitle));
            }
        }

        return similarTitles;
    }

    private static List<String> getRentedGenres() {
        List<Title__c> rentedTitles = getRentedTitles();
        
        List<String> rentedGenres = new List<String>();

        for (Title__c title : rentedTitles) {
            String genres = title.Genre__c;
            rentedGenres.add(genres);
        }

        return rentedGenres;
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
