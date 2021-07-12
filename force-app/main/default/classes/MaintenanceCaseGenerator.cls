public with sharing class MaintenanceCaseGenerator {
    public MaintenanceCaseGenerator() {

    }

    public void generateRentalCases(List<Stock__c> updatedStock){
        List<Case> newCases = new List<Case>();
        Map<Id,Case> currentCases = new Map<Id,Case>();
        for(Case i : [SELECT Id, Subject FROM Case WHERE Subject = 'Maintenance Required']){
            currentCases.put(i.Id, i);
        }

        AssignmentRule AR = new AssignmentRule();
        AR = [select id from AssignmentRule where SobjectType = 'Case' and Active = true limit 1];
        Database.DMLOptions dmlOpts = new Database.DMLOptions();
        dmlOpts.assignmentRuleHeader.assignmentRuleId= AR.id;

        Case newCase;
        for(Stock__c stock : updatedStock){
            if(stock.Status__c == 'Damaged' && !currentCases.containsKey(stock.Id)){
                System.Debug('got here');
                newCase = new Case(Subject = 'Maintenance Required', Stock__c = stock.Id, Status = 'New');
                newCase.setOptions(dmlOpts);
                newCases.add(newCase); //
            }
        }
    
        insert newCases;
    }
}
