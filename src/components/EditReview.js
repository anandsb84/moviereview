import React,{Fragment, useEffect, useState} from "react";
import Card from "./UI/Card";
import Button from "./UI/Button";
import "../components/Css/Global.css";
const EditReview=({rev})=>{

    const[buttonclick,setButtonClick]=useState(false);
    const[editReview,setEditReview]=useState();

   const changeHandler=()=>{
       if(buttonclick==false)
            setButtonClick(true);
        else
            setButtonClick(false);

   }
   const reviewChangeHandler=(event)=>{
       setEditReview(event.target.value);
   }

//    useEffect(()=>{

       const addReviewHandler=(event)=>{
           console.log(editReview);
           event.preventDefault();
       const resquest=async()=>{
           const response= await fetch('https://localhost:44307/api/Movies/EditReview?ReviewId='+rev.reviewId+'&review='+editReview,{
               method:'PUT'
           });

           console.log("pushing the changs");
           
           
       }
       resquest();

       

    }
     
//    },[])

    return    (
        
                    <div className="editButtonPopUp">   
                    <button className="editButton" onClick={changeHandler}>Edit</button>
                     {buttonclick && <Card>
                        <form onSubmit={addReviewHandler}>
                          <label htmlFor="Review">Enter Review</label>
                          <input
                            id="Review"
                            type="text"
                            value={editReview}
                            onChange={reviewChangeHandler}
                          /> 
                          <Button type="submit">Add</Button>
                        </form>
                      </Card>}
                      </div>
                   

    )

}

export default EditReview;