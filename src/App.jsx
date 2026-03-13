import React, { useState } from 'react';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Kitchen from './components/Kitchen';
import Liked from './components/Liked';


function App() {
    const [likedMeals, setLikedMeals] = useState([]);
 
 function addLiked(meal) {
    setLikedMeals(prev => {
      if (prev.some(m => m.idMeal === meal.idMeal)) return prev;
      return [...prev, meal];
    });
  }
    function removeLiked(id) {
    setLikedMeals(prev => prev.filter(m => m.idMeal !== id));
  }
  return (
    <div>
     <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route path="/" element={<Kitchen onLike={addLiked}/>}></Route>
      <Route path="/liked" element={<Liked likedMeals={likedMeals} onUnlike={removeLiked}/>}></Route>


     </Routes>
     
     </BrowserRouter>
     

    </div>
  );
}

export default App;