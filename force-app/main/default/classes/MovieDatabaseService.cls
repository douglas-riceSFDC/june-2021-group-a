public with sharing class MovieDatabaseService {
    @future(callout=true)
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
                                            Writer__c,
                                            Date_Released__c
                                            FROM Title__c
                                            WHERE Id IN :titleIds
                                            LIMIT 200
                                        ];
        
        for (Title__c title : titlesToUpdate) {
            Http http = new Http();
            HttpRequest request = new HttpRequest();

            String titleName = title.Name;

            request.setEndpoint('https://www.omdbapi.com/?t=' + titleName.replace(' ', '+') + '&apikey=4bfd514c');
            request.setMethod('GET');

            HttpResponse response = http.send(request);

            if (response.getStatusCode() == 200) {
                Map<String, Object> movieInfo  = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());

                if (!movieInfo.isEmpty()) {
                    String genreCommasToSemicolon = String.valueOf(movieInfo.get('Genre'));

                    title.Director__c = String.valueOf(movieInfo.get('Director'));
                    title.Genre__c = genreCommasToSemicolon.replace(', ', ';');
                    title.Language__c = String.valueOf(movieInfo.get('Language'));
                    title.Notable_Actors__c = String.valueOf(movieInfo.get('Actors'));
                    title.Plot_Description__c = String.valueOf(movieInfo.get('Plot'));
                    title.Release_Date__c = String.valueOf(movieInfo.get('Released'));
                    title.Date_Released__c = parseDate(String.valueOf(movieInfo.get('Released')));
                    title.Runtime__c = String.valueOf(movieInfo.get('Runtime'));
                    title.Poster__c = String.valueOf(movieInfo.get('Poster'));
                    title.Writer__c = String.valueOf(movieInfo.get('Writer'));
                }
            }
        }

        update titlesToUpdate;  
    }

    private static Date parseDate(String DateString) {
        String values;
        String month;
        String year;
        String day;
        Integer monthNumber = 0;
        String trimmedString = DateString.replaceAll(' ', '');

        day = trimmedString.substring(0,2);
        monthNumber = getMonthInteger(trimmedString.substring(2,5));
        year = trimmedString.substring(5);

        Date mydate = Date.newInstance(integer.valueOf(year),monthNumber,integer.valueOf(day));
        return mydate;
    }

    private static Integer getMonthInteger(String month){
        switch on month {
            when 'Jan'{
                return 1;
            }
            when 'Feb'{
                return 2;
            }
            when 'Mar'{
                return 3;
            }
            when 'Apr'{
                return 4;
            }
            when 'May'{
                return 5;
            }
            when 'Jun'{
                return 6;
            }
            when 'Jul'{
                return 7;
            }
            when 'Aug'{
                return 8;
            }
            when 'Sep'{
                return 9;
            }
            when 'Oct'{
                return 10;
            }
            when 'Nov'{
                return 11;
            }
            when 'Dec'{
                return 12;
            }
            when else {
                return -1;
            }
        }
}
}