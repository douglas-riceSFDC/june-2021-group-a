trigger Title on Title__c (after insert) {
    if (Trigger.isAfter) {
        System.enqueueJob(new MovieDatabaseService(new List<Id>(Trigger.newMap.keySet())));
    }

}