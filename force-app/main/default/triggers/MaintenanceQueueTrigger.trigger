trigger MaintenanceQueueTrigger on Stock__c(after update,after insert) {
    //creates list for new cases and current maintenance cases
    List<Case> newCases = new List<Case>();
    Map<Id,Case> currentCases = new Map<Id,Case>();
    for(Case i : [SELECT Id, Subject FROM Case WHERE Subject = 'Maintenance Required']){
        currentCases.put(i.Id, i);
    }
    
    //allows for assignment through apex
    AssignmentRule AR = new AssignmentRule();
    AR = [select id from AssignmentRule where SobjectType = 'Case' and Active = true limit 1];
    Database.DMLOptions dmlOpts = new Database.DMLOptions();
    dmlOpts.assignmentRuleHeader.assignmentRuleId= AR.id;

    //creation of case if Damaged and case not already opened
    Case newCase;
    for(Stock__c stock : trigger.new){
        if(stock.Status__c == 'Damaged' && !currentCases.containsKey(stock.Id)){
            System.Debug('got here');
            newCase = new Case(Subject = 'Maintenance Required', Stock__c = stock.Id, Status = 'New');
            newCase.setOptions(dmlOpts);
            newCases.add(newCase);
        }
    }

    insert newCases;
}