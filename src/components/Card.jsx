import { useEffect, useState } from "react";
import  './Card.css'



const nonVegIngredients = [
  "chicken",
  "beef",
  "pork",
  "bacon",
  "ham",
  "turkey",
  "fish",
  "tuna",
  "salmon",
  "shrimp",
  "prawn",
  "crab",
  "lamb",
  "duck",
  "anchovy",
  "sausage",
  'egg',
  'mincemeat',
  'sardines'

];
const nonVegCategories = [
  "chicken",
  "beef",
  "pork",
  "lamb",
  "seafood",
  "goat"
];
function getIngredients(meal) {
  const items = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const mea = meal[`strMeasure${i}`];
    if (ing && ing.trim()) items.push({ ing, mea: mea?.trim() || "" });
  }
  return items;
}

function RecipeCard({ recipe, matchCount, onLike}) {
  const [liked, setLiked] = useState(false);
  const [open, setOpen] = useState(false);
  const ingredients = getIngredients(recipe);
  

  return (
    <div className="recipe-card" style={{ animationDelay: `${Math.random() * 0.3}s` }}>
      <div className="card-pin" />

      
      <div className="card-img-wrap">
        <img
          className="card-img"
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
         />


        <span className="match-badge">🌿 {matchCount} matched</span>
        <button
          className={`like-btn${liked ? " liked" : ""}`}
          onClick={() => {setLiked(l => !l)
            onLike(recipe);
          }}
        >
          <span>{liked ? "♥" : "♡"}</span> Like
        </button>
      </div>

     
      <div className="card-body">
        {recipe.strArea && <div className="card-area">{recipe.strArea}</div>}
        <div className="title-row">
  <div className="card-title">{recipe.strMeal}</div>

  {recipe.strYoutube && (
    <a
      href={recipe.strYoutube}
      target="_blank"
      rel="noopener noreferrer"
      className="video-link"
      title="Watch Video"
    >
      ▶
    </a>
  )}
</div>
        
        <hr className="card-divider" />
        <button className="details-btn" onClick={() => setOpen(o => !o)}>
          {open ? "Hide Details" : "View Details"}
          <span className={`btn-arrow${open ? " open" : ""}`}>▼</span>
        </button>
      </div>

      
      <div className={`details-panel${open ? " open" : ""}`}>
        <div className="details-inner">
          {recipe.strCategory && (
            <span className="cat-tag">{recipe.strCategory}</span>
          )}

          <div className="details-section-title">Ingredients</div>
          <div className="ingredients-list">
            {ingredients.map(({ ing, mea }, i) => (
              <span key={i} className="ing-chip">
                {mea ? `${mea} ${ing}` : ing}
              </span>
            ))}
          </div>

          <div className="details-section-title">Instructions</div>
          <div className="instructions-text">
            {recipe.strInstructions}
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default function Card({ tag = [],onLike,vegMode }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
const [visibleCount, setVisibleCount] = useState(10);
  async function fetchRecipes() {
  setLoading(true);

  const requests = Array.from({ length: 40 }, () =>
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then(r => r.json())
      .then(d => d.meals[0])
  );

  const meals = await Promise.all(requests);

  const unique = Array.from(
    new Map(meals.map(m => [m.idMeal, m])).values()
  );

  setData(unique);
  setLoading(false);
}
useEffect(() => {
  fetchRecipes();
}, []);

  const scoredRecipes = data
    .map(recipe => {
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ing = recipe[`strIngredient${i}`];
        if (ing && ing.trim()) ingredients.push(ing.toLowerCase());
      }
      const matchCount = tag.length === 0? 1: tag.filter(t => ingredients.some(ing => ing.includes(t.toLowerCase()))).length;
      return { recipe, matchCount };
    })
    .filter(({ recipe, matchCount }) => {
  if (matchCount <= 0) return false;

  if (!vegMode) return true;

  const category = recipe.strCategory?.toLowerCase() || "";

  const isNonVegCategory = nonVegCategories.some(c =>
    category.includes(c)
  );

  if (isNonVegCategory) return false;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = recipe[`strIngredient${i}`];
    if (ing) ingredients.push(ing.toLowerCase());
  }

  const hasNonVegIngredient = ingredients.some(ing =>
    nonVegIngredients.some(nv => ing.includes(nv))
  );

  return !hasNonVegIngredient;
})
    .sort((a, b) => b.matchCount - a.matchCount);

  if (loading) return (
    <div className="crave-state">
      
      <div className="crave-spinner" />
      <div>Gathering recipes…</div>
    </div>
  );

  if (!scoredRecipes.length) return (
    <div className="crave-state">
      
      No recipes found — try different ingredients.
    </div>
  );
return (
  <>
    <div className="cards-grid">
      {scoredRecipes.slice(0, visibleCount).map(({ recipe, matchCount }) => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          matchCount={matchCount}
          onLike={onLike}
        />
      ))}
    </div>

    <div className="load-more-wrap">

  {visibleCount < scoredRecipes.length && (
    <button
      className="load-more-btn"
      onClick={() => setVisibleCount(v => v + 5)}
    >
      Load More 🍽
    </button>
  )}

  <button
    className="refresh-btn"
    onClick={fetchRecipes}
  >
    🎲 Get New Recipes
  </button>

</div>
  </>
);
}