// Cliccando il  bottone, si devono cercare sull’API 
// tutti i film che contengono ciò che ha scritto l’utente.
// Sostituiamo quindi le nostre schede con quelle generate dalla chiamata,
// tralasciando per ora le stelline.


/* {
    "adult": false,
    "backdrop_path": "/fq3wyOs1RHyz2yfzsb4sck7aWRG.jpg",
    "genre_ids": [
        12,
        35,
        878,
        10751
    ],
    "id": 105,
    "original_language": "en",
    "original_title": "Back to the Future",
    "overview": "Marty McFly è stato catapultato per errore nel 1955, grazie alla macchina del tempo ideata dal suo amico scienziato Doc. Non avendo più \"carburante\" per poter tornare nel futuro si rivolge alla versione più giovane di Doc, che nonostante l'incredulità iniziale si farà in quattro per aiutarlo. Ma nel 1955 non è solo Doc ad essere più giovane, Marty infatti si imbatte casualmente nei suoi genitori, all'epoca teenager, ma l'incontro aggiungerà altri problemi.",
    "popularity": 65.051,
    "poster_path": "/AkmUoSHkxW9txpzZ52gCcWweEkE.jpg",
    "release_date": "1985-07-03",
    "title": "Ritorno al futuro",
    "video": false,
    "vote_average": 8.3,
    "vote_count": 14236
}, */


/* {
    "backdrop_path": "/cqkGeSKrX7hKGYdsr3qiq8THyDo.jpg",
    "first_air_date": "2001-10-02",
    "genre_ids": [
        35,
        18
    ],
    "id": 4556,
    "name": "Scrubs",
    "origin_country": [
        "US"
    ],
    "original_language": "en",
    "original_name": "Scrubs",
    "overview": "In the unreal world of Sacred Heart Hospital, John \"J.D\" Dorian learns the ways of medicine, friendship and life.",
    "popularity": 60.904,
    "poster_path": "/u1z05trCA7AuSuDhi365grwdos1.jpg",
    "vote_average": 7.9,
    "vote_count": 873
},
 */



var app = new Vue(
    {
        el: '#root',
        data: {
            searchQuery: "",
            movies: [],
            series: [],
            flags: ["it", "en", "es", "fr", "de", "ja", "zh"],
            genresMovies: [],
            selected: "all",
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
              // funzione per effettuare la ricerca 
            getTitles: function() {
                
                this.getMovies();
                this.getSeries();
                
                this.searchQuery = "";
                this.renderMessage = true;
            },
        }, 
        mounted: function() {

            axios
                .get('https://api.themoviedb.org/3/genre/movie/list', {
                    params: {
                        api_key: "b2f2dc9b456519ffb2d7406a9523fda2",
                        language: "it-IT",
                    }
                })
                .then((element)=> {

                    this.genresMovies = element.data.genres;

                });
                
        }
    }
);

