trigger Title on Title__c (after insert) {
    if (Trigger.isAfter) {
        MovieDatabaseService.populateTitleFields(new List<Id>(Trigger.newMap.keySet()));
    }
}