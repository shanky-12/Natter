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
import AllCommunities from './components/AllCommunities';
import Comment from './components/Comment';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Error from './components/Error';



function App() {
  return (
   
  <Router>
    <div className='App'>
      <header className='App-header'>
      <Navbar />
      </header>

      <br />
      <div className='App-body'>
        <Routes>
       {/*  <Route exact path='/' component={Home} /> */}
        {/* <Route path='/' element={<AllPost/>}></Route> */}
        <Route path='/' element={<AllCommunities/>}></Route>

        <Route path='/posts/:postnum' element={<Comment/>}></Route>
        <Route path='/allposts/:postnum' element={<AllPost/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/*' element={<Error/>}></Route>
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
}

export default App;