// Cliccando il  bottone, si devono cercare sull’API 
// tutti i film che contengono ciò che ha scritto l’utente.
// Sostituiamo quindi le nostre schede con quelle generate dalla chiamata,
// tralasciando per ora le stelline.


var app = new Vue(
    {
        el: '#root',
        data: {
            searchQuery: "",
            movies: [],
        },
        methods: {
            getImages: function(element) {
                if(element.poster_path != null) {
                    return 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + element.poster_path;
                }

                return 'img/empty-image.jpg';
            },
            getMovies: function() {

                axios
                .get('https://api.themoviedb.org/3/search/movie', {
                    params: {
                        api_key: "b2f2dc9b456519ffb2d7406a9523fda2",
                        query: this.searchQuery,
                        language: "it-IT",
                    }
                })
                .then((element)=> {
                    this.movies = element.data.results;
                    // console.info("Array movies", this.movies);

                    this.searchQuery = "";
                });

            },
        },
    }
);