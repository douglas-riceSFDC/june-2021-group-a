public with sharing class MovieDatabaseService {
    
    @future
    public static void populateTitleFields(List<Id> titleIds) {

        List<Title__c> titlesToUpdate = [SELECT 
                                            Id,
                                            Name,
                                            Director__c, 
                                            Genre__c, 
                                            Language__c, 
                                            Notable_Actors__c, 
                                            Plot_Description__c, 
                                            Release_Date__c, 
                                            Runtime__c, 
                                            Poster__c, 
                                            Writer__c
                                            FROM Title__c
                                            WHERE Id IN :titleIds
                                        ];

        for (Title__c title : titlesToUpdate) {
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint('https://http://www.omdbapi.com/?t=' + title.Name + '&apikey=4bfd514c');
            request.setMethod('GET');

            HttpResponse response = http.send(request);

            if (response.getStatusCode() == 200) {
                Map<String, Object> movieInfo  = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());

                if (!movieInfo.isEmpty()) {
                    title.Director__c = (String) movieInfo.get('Director');
                    title.Genre__c = (String) movieInfo.get('Genre');
                    title.Language__c = (String) movieInfo.get('Language');
                    title.Notable_Actors__c = (String) movieInfo.get('Actors');
                    title.Plot_Description__c = (String) movieInfo.get('Plot');
                    title.Release_Date__c = Date.parse((String) movieInfo.get('Released'));
                    title.Runtime__c = (String) movieInfo.get('Runtime');
                    title.Poster__c = (String) movieInfo.get('Poster');
                    title.Writer__c = (String) movieInfo.get('Writer');
                }
            }
        }

        update titlesToUpdate;
        
    }

    public void autoFillTitle(List<Title__c> titles) {
        List<Id> titleIds = new List<Id>(new Map<Id, Title__c>(titles).keySet());

        populateTitleFields(titleIds);
    }
}
