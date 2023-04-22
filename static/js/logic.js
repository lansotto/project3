console.log("logic.js")

// Assign constant variable to the Movies Data
movie_csv = "/static/data/tmdb_5000_movies_clean.csv"

genre_array = [];

// Select the dropdown menu
let DropDownMenu = d3.select("#selDataset");

// Perform a GET request to the csv.
d3.csv(movie_csv).then(function (data) {
    console.log(data)
    data.map((row_data) => {

        if (genre_array.indexOf(row_data.genre) === -1) {
            genre_array.push(row_data.genre)
        }

    })

    DropDownMenu
        .append("option")
        .property("value", "")
        .text("Action");

    genre_array.sort();

    // Add the samples to dropdown menu
    genre_array.forEach((genre) => {

        // Log the value of id
        console.log(genre);

        DropDownMenu.append("option")
            .text(genre)
            .property("value", genre);
    });
    redraw1(data.filter(result => result.genre == "Action"));
    redraw2(data.filter(result => result.genre == "Action"));
    redraw3(data.filter(result => result.genre == "Action"));
});

function redraw(genre) {
    d3.csv(movie_csv).then(function (data) {
        let ValueofSample = data.filter(result => result.genre == genre);
        redraw1(ValueofSample);
        redraw2(ValueofSample);
        redraw3(ValueofSample);
    })
}

function redraw1(filteredData) {
        Budget_array = []
        Revenue_array = []

        filteredData.map((row_data) => {
            Budget_array.push(row_data.budget)
            Revenue_array.push(row_data.revenue)
        });

        // Build a Budget vs Revenue scatter plot
        let Scatter_Plot = {
            x: Budget_array,
            y: Revenue_array,
            mode: 'markers',
            type: 'scatter' 
        };

        // Setup the layout
        let layout = {
            title: "Budget vs Revenue of Movies",
            xaxis: {title: "Movie Budget"},
            yaxis: {title: "Movie Revenue"},
            width: 0.5,
            height: 0.5
        };
        
        Plotly.newPlot("scatter1", [Scatter_Plot], [layout]);
}

function redraw2(filteredData) {
        VoteAvg_array = []
        Revenue_array = []

        filteredData.map((row_data) => {
            VoteAvg_array.push(row_data.vote_average)
            Revenue_array.push(row_data.revenue)
        });


        // Build a Vote Average vs Revenue scatter plot
        let Scatter_Plot_2 = {
            x: VoteAvg_array,
            y: Revenue_array,
            mode: 'markers',
            type: 'scatter' 
        };

        // Setup the layout
        let layout = {
            title: "Average vote vs Revenue of Movies",
            xaxis: {title: "Average Vote (out of 10)"},
            yaxis: {title: "Movie Revenue"},
            width: 0.5,
            height: 0.5
        };

        Plotly.newPlot("scatter2", [Scatter_Plot_2], [layout]);  
}

    
function redraw3(filteredData) {
        ReleaseYear_array = []
        CountOfMovies_array = []

        filteredData.map((row_data) => {
            ReleaseYear_array.push(row_data.release_date)
        });

        let UniqueYears_array = ReleaseYear_array.filter((x, i, self) => self.indexOf(x) === i);

        // For each unique year, find out how many there are in RleaseYear_array
        for (let uniqueYear of UniqueYears_array ) {
            let count = 0;
            for (let releaseYear of ReleaseYear_array) {
                if (releaseYear === uniqueYear) {
                    count++;
                }
            }
            CountOfMovies_array.push(count);
        }
        console.log(UniqueYears_array);
        console.log(CountOfMovies_array);

        // Build a Release dates of Genres Line plot
        let Line_Plot = {
            x: UniqueYears_array,
            y: CountOfMovies_array,
            mode: 'lines',
            type: 'line',
            width: 0.5,
            height: 0.5 
        };
        
        Plotly.newPlot("line", [Line_Plot]); 
}