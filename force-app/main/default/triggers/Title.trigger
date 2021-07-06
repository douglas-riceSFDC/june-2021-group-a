trigger Title on Title__c (after insert) {
    if (Trigger.isAfter) {
        MovieDatabaseService mds = new MovieDatabaseService();
        mds.autoFillTitle(Trigger.new);
    }

}