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
            popularMovies: [],
            popularSeries: [],
            flags: ["it", "en", "es", "fr", "de", "ja", "zh", "ko"],
            genresMovies: [],
            genresSeries: [],
            selectedMovieGenre: "selectedMovie",
            selectedSerieGenre: "selectedSerie",
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

                //chiamata ajax API movie
                axios
                .get('https://api.themoviedb.org/3/search/movie', {
                    params: {
                        api_key: "b2f2dc9b456519ffb2d7406a9523fda2",
                        query: this.searchQuery,
                        language: "it-IT",
                    }
                })
                .then((movie)=> {

                    this.movies = movie.data.results;

                    for (let i = 0; i < this.movies.length; i++) {

                        this.movies[i].castList = [];

                        //chiamata ajax API movie cast
                        axios
                        .get("https://api.themoviedb.org/3/movie/" + this.movies[i].id + "/credits", {
                            params: {
                                api_key: "b2f2dc9b456519ffb2d7406a9523fda2",
                                language: "it-IT",
                            }
                        })
                        .then((element)=> {

                            // console.log(element.data.cast.length);
                            for(let j = 0; j < element.data.cast.length; j++) {
                                if(this.movies[i].castList.length < 5) {
                                    this.movies[i].castList.push(element.data.cast[j].name);
                                }
                            }
                            
                            this.$forceUpdate();
                        });
                    }

                });
            },
            // funzione per prelevare la lista delle serie TV dall'API
            getSeries: function() {

                //chiamata ajax API serie tv
                axios
                .get('https://api.themoviedb.org/3/search/tv', {
                    params: {
                        api_key: "b2f2dc9b456519ffb2d7406a9523fda2",
                        query: this.searchQuery,
                        language: "it-IT",
                    }
                })
                .then((serie)=> {

                    this.series = serie.data.results;

                    for (let i = 0; i < this.series.length; i++) {

                        this.series[i].castList = [];

                        //chiamata ajax API serie tv cast
                        axios
                        .get("https://api.themoviedb.org/3/tv/" + this.series[i].id + "/credits", {
                            params: {
                                api_key: "b2f2dc9b456519ffb2d7406a9523fda2",
                                language: "it-IT",
                            }
                        })
                        .then((element)=> {

                            // console.log(element.data.cast.length);
                            for(let j = 0; j < element.data.cast.length; j++) {
                                if(this.series[i].castList.length < 5) {
                                    this.series[i].castList.push(element.data.cast[j].name);
                                }
                            }
                            
                            this.$forceUpdate();
                        });
                    }

                });

            },
              // funzione per effettuare la ricerca 
            getTitles: function() {
                
                if(this.searchQuery != "") {
                    this.getMovies();
                    this.getSeries();
                    
                    this.searchQuery = "";
                    this.renderMessage = true;
                }
                
            },
        }, 
        mounted: function() {

            // chiamata ajax film popolari
            axios
            .get('https://api.themoviedb.org/3/movie/popular', {
                params: {
                    api_key: "b2f2dc9b456519ffb2d7406a9523fda2",
                    language: "it-IT",
                }
            })
            .then((element)=> {

                for(let k = 0; k < 5; k++) {
                    this.popularMovies.push(element.data.results[k])
                }
                
                for (let i = 0; i < this.popularMovies.length; i++) {

                    this.popularMovies[i].castList = [];

                    //chiamata ajax API film popolari cast
                    axios
                    .get("https://api.themoviedb.org/3/movie/" + this.popularMovies[i].id + "/credits", {
                        params: {
                            api_key: "b2f2dc9b456519ffb2d7406a9523fda2",
                            language: "it-IT",
                        }
                    })
                    .then((element)=> {

                        // console.log(element.data.cast.length);
                        for(let j = 0; j < element.data.cast.length; j++) {
                            if(this.popularMovies[i].castList.length < 5) {
                                this.popularMovies[i].castList.push(element.data.cast[j].name);
                            }
                        }
                        
                        this.$forceUpdate();
                    });
                }

            });

            // chiamata ajax serieTv popolari
            axios
            .get('https://api.themoviedb.org/3/tv/popular', {
                params: {
                    api_key: "b2f2dc9b456519ffb2d7406a9523fda2",
                    language: "it-IT",
                }
            })
            .then((element)=> {

                for(let k = 0; k < 5; k++) {
                    this.popularSeries.push(element.data.results[k])
                }
                
                for (let i = 0; i < this.popularSeries.length; i++) {

                    this.popularSeries[i].castList = [];

                    //chiamata ajax API serieTv popolari cast
                    axios
                    .get("https://api.themoviedb.org/3/tv/" + this.popularSeries[i].id + "/credits", {
                        params: {
                            api_key: "b2f2dc9b456519ffb2d7406a9523fda2",
                            language: "it-IT",
                        }
                    })
                    .then((element)=> {

                        // console.log(element.data.cast.length);
                        for(let j = 0; j < element.data.cast.length; j++) {
                            if(this.popularSeries[i].castList.length < 5) {
                                this.popularSeries[i].castList.push(element.data.cast[j].name);
                            }
                        }
                        
                        this.$forceUpdate();
                    });
                }

            });

            // chiamata ajax generi film
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

            // chiamata ajax generi serieTv
            axios
            .get('https://api.themoviedb.org/3/genre/tv/list', {
                params: {
                    api_key: "b2f2dc9b456519ffb2d7406a9523fda2",
                    language: "it-IT",
                }
            })
            .then((element)=> {

                this.genresSeries = element.data.genres;

            });

                
        }
    }
);

