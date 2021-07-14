trigger Title on Title__c (after insert) {
    System.debug(Trigger.newMap);
    if (Trigger.isAfter) {
        System.debug('Trigger isAfter Ttile');
        MovieDatabaseService.populateTitleFields(new List<Id>(Trigger.newMap.keySet()));
    }
}