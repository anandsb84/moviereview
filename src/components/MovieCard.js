import React,{useState,useEffect} from 'react';
import Card from './UI/Card';
import Button from './UI/Button';
import EditReview from './EditReview';
//import classes from './components/UI/Butto'
import '../components/Css/Global.css';

const MovieCard = (props) => {   //{movie}
    const[flag,setFlag]=useState(false);
    const[reviewList,FetchReviewlist]=useState([]);
    const[editOpen,setEditOpen]=useState(false);
    const[editReview,setEditReview]=useState();
    const[AddNewReview,setAddNewReviewFlag]=useState(false);
    const[newReview,setNewReview]=useState();
        /// console.log(props.id);
        useEffect(()=>{
            const fetchReviews=async()=>{
        const response=await fetch("https://localhost:44307/api/Movies/GetReview/"+props.movie.movieId);

        const responsedata=await response.json();
         console.log(responsedata);
         console.log("a");
         const reviewdb=[];
                console.log("start");
         responsedata.forEach(element => {
             reviewdb.push({
                "reviewId":element.reviewId,
                "review":element.review,
                "movieId":element.movieId
             });
         });
         console.log(props.movie.movieId);

         FetchReviewlist(reviewdb);

         console.log(reviewList+"end");
         
         

    }
     fetchReviews();
},[]);
    
console.log(reviewList+" this is 1");
    const handleViewReview = () => {
        if(flag === true){
            setFlag(false)
        }
        else setFlag(true)
    }
    const handleDelete=()=>{
        const deleteMovie = async()=>{
            const response= await fetch("https://localhost:44307/api/Movies/DeleteMovie/"+props.movie.movieId,
            {
                method:'DELETE'
            });
            console.log(props.movie.movieId);
           //    const responsedata= await response.json();
            console.log("deleted");
            props.afterdelete();    
        }
        deleteMovie();
        
        
    }

    const editButtonHandler=()=>{
        if(editOpen==false)
            setEditOpen(true);
        else
            setEditOpen(false);
    }
    const reviewChangeHandler=(event)=>{
        setEditReview(event.target.value);
    }

    // useEffect(()=>{
    //     const editReviewHandler=async()=>{

    //         const response=await fetch("https://localhost:44307/api/Movies/EditReview?ReviewId=1&review="+editReview,{
    //             method:'PUT'
    //         });

    //     }

    //     editReviewHandler();
    // },[]);
    const addNewReviewHandler=()=>{
        setAddNewReviewFlag(true);
    }

    const crossHandler=()=>{
        setFlag(false);
    }

    const newReviewHandler=(event)=>{
        setNewReview(event.target.value);
    }

    const addNewReveiwHandler=()=>{

        const fetchReview = async ()=>{
            const response = await fetch('https://localhost:44307/api/Movies/AddNewReview?movieID='+props.movie.movieId+'&review='+newReview,{
                method:'POST'
            });
        }
        fetchReview();
    }

  return (
    <div>
                    <h3>{props.movie.movieName}</h3>
                    <button className="editButton" onClick={handleViewReview}>{!flag ? "View Reviews" : "Close"}</button>
                    <span>    </span>
                    <button className="deleteButton" id={props.movie.movieId} onClick={handleDelete}>Del Movie & Reviews</button>
                    {flag && <div className="popUpBackground">
                    <div className="reviewPopUp">
                        <div className='addNewReviewPopUp'><button className='addNewButton' onClick={addNewReviewHandler}>+</button></div>
                    <div className="closeButton" onClick={crossHandler}>X</div> 
                     {AddNewReview && <Card>
                        <form onSubmit={addNewReveiwHandler}>
                          <label htmlFor="Review">Enter New Review</label>
                          <input
                            id="Review"
                            type="text"
                            value={newReview}
                            onChange={newReviewHandler}
                          /> 
                          <Button type="submit">Add</Button>
                        </form>
                      </Card>}
                    {flag && reviewList.map(ele=>                    
                       
                       <div className="reviewListPopUp">
                           <div>
                    <h2>{ele.review}</h2></div>
                        <EditReview rev={ele}/></div>
                        )                        
                    
                    
                    }
                    </div>
                    </div>}
                   
                    
                </div>
  )
}

export default MovieCard