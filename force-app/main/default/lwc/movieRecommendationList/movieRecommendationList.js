import { LightningElement, wire } from 'lwc';
import getRecommendedMovies from '@salesforce/apex/MovieRecommendationsEngine.getRecommendedMovies';

export default class MovieRecommendationList extends LightningElement {
    @wire(getRecommendedMovies) movies;
    // wiredRecommendations({error, data}) {
    //     if (error) {
    //         console.log(error);
    //     }

    //     if (data) {
    //         console.log(data);
    //     }
    // }
}