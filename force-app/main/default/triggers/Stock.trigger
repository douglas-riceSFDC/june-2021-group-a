trigger Stock on Stock__c (after insert, after update) {

    MaintenanceCaseGenerator caseGenerator = new MaintenanceCaseGenerator();
    caseGenerator.generateRentalCases(Trigger.new);

    if(Trigger.isAfter && Trigger.isUpdate) {
        RentalGenerator generator = new RentalGenerator();
        generator.generateRentalsForRentedStock(Trigger.new, Trigger.oldMap);
    }


}