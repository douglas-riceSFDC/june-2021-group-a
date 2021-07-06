@isTest
private class MovieDatabaseServiceTest {
    @isTest
    static void getInfoTest() {
        Test.setMock(HttpCalloutMock.class, new MovieDatabaseServiceMock());
    }
}
