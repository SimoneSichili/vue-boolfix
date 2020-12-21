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
            series: [],
            flags: ["it", "en", "es", "fr", "de", "ja", "zh"],
            renderMessage: false,
        },
        methods: {
            // funzione per impostare un'immagine alla card
            getImages: function(element) {
                if(element.poster_path != null) {
                    return 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + element.poster_path;
                }

                return 'img/empty-image.jpg';
            },
            // funzione per ottenere le bandiere
            getFlags: function(element) {
                if(element.original_language == "it") {
                    return 'img/italy.svg';
                } else if(element.original_language == "en") {
                    return 'img/england.svg';
                } else if(element.original_language == "es") {
                    return 'img/spain.svg';
                } else if(element.original_language == "fr") {
                    return 'img/france.svg';
                } else if(element.original_language == "de") {
                    return 'img/germany.svg';
                } else if(element.original_language == "ja") {
                    return 'img/japan.svg';
                } else if(element.original_language == "zh") {
                    return 'img/china.svg';
                }
            },
            // funzione per ottenere i voti
            getVote: function(element) {

                return Math.ceil(element / 2);

            },
            // funzione per prelevare la lista dei film dall'API
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
                    
                    this.getSeries();

                    this.searchQuery = "";

                    this.renderMessage = true;
                });

                

            },
            // funzione per prelevare la lista delle serie TV dall'API
            getSeries: function() {

                axios
                .get('https://api.themoviedb.org/3/search/tv', {
                    params: {
                        api_key: "b2f2dc9b456519ffb2d7406a9523fda2",
                        query: this.searchQuery,
                        language: "it-IT",
                    }
                })
                .then((element)=> {

                    this.series = element.data.results;

                });

            },
        },
    }
);