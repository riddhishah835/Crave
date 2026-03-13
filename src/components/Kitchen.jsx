import { useState } from "react";
import './Kitchen.css'
import Card from "./Card";

export default function Kitchen({onLike}) {
    
  const [tags, setTags] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [vegMode, setVegMode] = useState(true); 
  

  function removeTag(tag) {
    setTags(prev => prev.filter(t => t !== tag));
  }
  function add()
  {
    if(!searchVal.trim())
        return ;
    setTags(prev=>[...prev,searchVal.trim()]);
    setSearchVal("");
  }
  function handleLike(recipe) {

  const stored = localStorage.getItem("likedMeals");
  const liked = stored ? JSON.parse(stored) : [];

 
  if (!liked.find(r => r.idMeal === recipe.idMeal)) {
    liked.push(recipe);
    localStorage.setItem("likedMeals", JSON.stringify(liked));
  }
}

  return (
    <>
    <div className="page-root">
     
      <div className="kitchen-root">

      
        <div className="kitchen-search-row">
          <div className="search-wrap">
            <input
              className="search-input"
              type="text"
              placeholder="Type in your ingredients..."
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              onKeyDown={(e)=>{
                if (e.key=='Enter')
                    add();
              }}
           
           />
            <span onClick={add} className="search-icon">🔍</span>
          </div>

        
          <div
            className="veg-toggle-wrap"
            onClick={() => setVegMode(v => !v)}
            title={vegMode ? "Switch to Non-Veg" : "Switch to Veg"}
          >
            <span className={`veg-label ${vegMode ? "active" : "inactive"}`}>Veg</span>

            <div className={`toggle-track ${vegMode ? "veg" : "nonveg"}`}>
              <div className="toggle-knob" />
            </div>

            <span className={`veg-label nonveg-label ${!vegMode ? "active" : "inactive"}`}>Non-Veg</span>
          </div>
        </div>

        
        <div className="tags-row">
          {tags.map(tag => (
            <div className="ingredient-tag" key={tag}>
              <span className="tag-text">{tag}</span>
              <span className="tag-x" onClick={() => removeTag(tag)} title={`Remove ${tag}`}>✕</span>
            </div>
          ))}

          
         
        </div>

      </div>
       <Card tag={tags} onLike={handleLike} vegMode={vegMode}/>
       
      </div>
     
    </>
  );
}