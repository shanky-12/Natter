import './App.css';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';


const App = () =>{
  // const [token, setToken] = useState();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

  return (
    <Router>
    <div className='App'>
      <div className='App-header'>
        <Link className='link' to='/'>
          Home
        </Link>
        </div>
      <br />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
    </div>
  </Router>
  );
};

export default App;
