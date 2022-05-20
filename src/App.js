import logo from './logo.svg';
import './App.css';
import MoviesList from './components/MoviesList';
import { Fragment ,useState} from 'react';
import Button from './components/UI/Button';
import Movies from './components/Movies'

function App() {
  // const[flagAdd,setFlagAdd]=useState(false);

  // const Buttonhandler=()=>{
  //   setFlagAdd(!flagAdd);
  // }
  return (
    // <Fragment>
    // <div className="App">
    //   <header className=""> Movies 
    //   </header>
    // </div>
    // <Button onClick={Buttonhandler}>Add Movie</Button>
    // {flagAdd && <Movies></Movies>}
    // <MoviesList></MoviesList>
    // </Fragment>
    
    <div className="App">
      <MoviesList />
    </div>
    
  );
}

export default App;
