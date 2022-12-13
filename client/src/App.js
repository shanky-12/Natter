import React from 'react';
//import logo from './img/marvel.jpg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
//import Home from './components/Home';
//import CharactersList from './components/CharactersList';
//import ComicsList from './components/ComicsList';
//import StoriesList from './components/StoriesList';
//import Character from './components/Character';
//import Comic from './components/Comic';
//import Story from './components/Story';
//import CharacterHistory from './components/CharacterHistory';
//import AllPost from './components/AllPost';
import AllPost from './components/AllPost';
import Comment from './components/Comment';




  return (
   
  <Router>
    <div className='App'>
     {/*  <header className='App-header'>
         <img src={logo} className='App-logo' alt='logo' />
         <h1 className='App-title'>Welcome to the React.js Marvel API</h1>
        <Link className='showlink' to='/'>
          Home
        </Link>
         <Link className='showlink' to='/characters/page/1'>
          Characters
        </Link>  
        <Link className='showlink' to='/comics/page/1'>
          Comics
        </Link>
        <Link className='showlink' to='/stories/page/1'>
          Stories
        </Link>
      </header> */}
      <br />
      <br />
      <div className='App-body'>
        <Routes>
       {/*  <Route exact path='/' component={Home} /> */}
        <Route path='/' element={<AllPost/>}></Route>
        <Route path='/posts/:postnum' element={<Comment/>}></Route>
      {/*   <Route path='/characters/page/:pagenum' element={<CharactersList />} /> 
        <Route path='/comics/page/:pagenum' element={<ComicsList />} /> 
        <Route path='/stories/page/:pagenum' element={<StoriesList />} />
        <Route path='/characters/:id' element={<Character />} />
        <Route path='/comics/:id' element={<Comic />} />       
        <Route path='/stories/:id' element={<Story />} />
        <Route path='/characters/history' element={<CharacterHistory />} /> */}
  
        </Routes>
      </div>
    </div>
  </Router>
  );
};

export default App;
