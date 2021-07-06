trigger Stock on Stock__c (after update) {
    if(Trigger.isAfter && Trigger.isUpdate) {
        RentalGenerator generator = new RentalGenerator();
        generator.generateRentalsForRentedStock(Trigger.new, Trigger.oldMap);
    }
}