@isTest
global class MovieDatabaseServiceMock {
    global HttpResponse respond(HttpRequest request) {
        HttpResponse response = new HttpResponse();
        response.setHeader('contentType', 'application/json');
        response.setBody('{"Title":"Inception","Year":"2010","Rated":"PG-13","Released":"16 Jul 2010","Runtime":"148 min","Genre":"Action, Adventure, Sci-Fi, Thriller","Director":"Christopher Nolan","Writer":"Christopher Nolan","Actors":"Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Tom Hardy","Plot":"A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.","Language":"English, Japanese, French","Country":"USA, UK","Awards":"Won 4 Oscars. Another 153 wins & 220 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.8/10"},{"Source":"Rotten Tomatoes","Value":"87%"},{"Source":"Metacritic","Value":"74/100"}],"Metascore":"74","imdbRating":"8.8","imdbVotes":"2,124,584","imdbID":"tt1375666","Type":"movie","DVD":"20 Jun 2013","BoxOffice":"$292,576,195","Production":"Syncopy, Warner Bros.","Website":"N/A","Response":"True"}');
        response.setStatus('200');
        return response;
    }
}
