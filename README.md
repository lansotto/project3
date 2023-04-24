# TMDB and Chill


Table of Contents
=================

  * [Background](#background)
  * [Tools & Technology](#tools-&-technology)
  * [Method](#method)
  * [References & Acknowledgements](#references-&-acknowledgements)
  
  
  
## Background
  

TMDB and Chill is a Python Flask-powered API that summarizes and compares movies characteristics over the years in a visual manner. We obtained the dataset from Kaggle, which is a database comprised of nearly 5000 movies between the years 1916 and 2016. The criteria summarized and compared are genres, budget, revenue, voter rating (vote average) and production countries.

We wanted to draw comparisons between movie genres and determine if there are any differences between genres according to budget, revenue and voter rating. 

You can select see our interactive Dashboard here: https://lansotto.github.io/project3/templates


## Tools & Technology


Below outline some of the tools and technologies we used to create TMDB and Chill.

* Python
* Flask
* SQLite
* Javascript
* Node.js
* D3
* CSS
* HTML



## Method


The Python Flask API runs two main components from the 'Home' page, 'Map' and 'Movies Dashboard'. The 'Home' page provides general information regarding the overall project, including biases and further considerations.

    ** Map **

    A Leaflet Map was created which takes the total count of movies produced in a
    particular country and highlights the specific country. 


    ** Movies Dashboard ** 
    
    The interactive Movies Dashboard generates a visualization which explores how
    specific genres are influenced by other metrics, including budget, revenue and
    voter rating. 



## References & Acknowledgements


The dataset of the TMDB 5000 Movie Dataset was provided by [Kaggle.com](https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata?resource=download&select=tmdb_5000_movies.csv).

* A further thanks goes to all the instructors through the edX UofT
                Data Analytics program. 


- - -


