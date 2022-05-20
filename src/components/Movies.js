import React,{useState} from "react";
import Card from "./UI/Card";
import Button from "./UI/Button";
import classes from '../components/Movies.module.css';
import MoviesList from "./MoviesList";

const Movies=(props)=>{const [enteredMoviename, setEnteredMoviename] = useState('');
const [enteredReview, setEnteredReview] = useState('');
const [error, setError] = useState();

  const addMovieHandler=(event)=>{
      event.preventDefault();
      if(enteredMoviename.trim().length===0 || enteredReview.trim().length===0){
          setError(true);
          return;
      }
      console.log(enteredMoviename);
      //api call//
      const submitMoviesHandler=async()=>{
        await fetch("https://localhost:44307/api/Movies/AddNewMovie?movie="+enteredMoviename+"&review="+enteredReview,{
          method:'POST'         
        })

        props.fetchMovies()
      };

      submitMoviesHandler();

      setEnteredMoviename('');
      setEnteredReview('');
      

  }

  const movieChangeHandler=(event)=>{
      setEnteredMoviename(event.target.value);
  }

  const reviewChangeHandler =(event)=>{
    setEnteredReview(event.target.value);
  }
return (
  <div>
  <Card className={classes.input}>
  <form onSubmit={addMovieHandler}>
    <label htmlFor="MovieName">Movie Name</label>
    <input
      id="MovieName"
      type="text"
      value={enteredMoviename}
      onChange={movieChangeHandler}
    />
    <label htmlFor="Review">Enter Review</label>
    <input
      id="Review"
      type="text"
      value={enteredReview}
      onChange={reviewChangeHandler}
    />
    <Button type="submit">Add</Button>
  </form>
</Card>
</div>

    );
}

export default Movies;