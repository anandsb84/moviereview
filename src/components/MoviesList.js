import React,{Fragment, useEffect,useState} from "react";
import Button from "./UI/Button";
import Card from "./UI/Card";
//import {Route,Redirect} from 'react-router-dom';

import Movies from "./Movies";
import MovieCard from "./MovieCard";
import classes from '../components/MoviesList.module.css';
import "../components/Css/Global.css";

const MoviesList=(props)=>{
    const[movies,setMovies]=useState([]);
    const[flag,setFlag]=useState(false);

    const fetchMovies=async()=>{
        const response=await fetch('https://localhost:44307/api/Movies/GetMovies');
        const responseData=await response.json();
        console.log(responseData);

        const  moviesdb=[];

        responseData.forEach(element => {
            moviesdb.push({
                "movieId":element.movieId,
                "movieName":element.movieName
            })
        });
        setMovies(moviesdb);
       };

    useEffect(()=> {
        
        fetchMovies();

    },[]);

    

    const handleAddMovie = () => {
        if(flag === true){
            setFlag(false)
        }
        else setFlag(true)
    }

    const fetchAgain=()=>{
        fetchMovies();
        console.log("reached");
    }

  return (<Fragment>
      <h1 className="head">Movies</h1>
    <div className={classes.mainContainer}>
        <button className="addBtnRvw" onClick={handleAddMovie}>Add Movie and Reviews</button>
        <div classsName={classes.movieListStyle}>
        {flag && <Movies fetchMovies={fetchMovies} />}
        {movies.map(mov => {
            return (
            <MovieCard movie={mov} afterdelete={fetchAgain}/>
            )
        })}
        </div>
    </div>
    </Fragment>
  )
};

export default MoviesList;