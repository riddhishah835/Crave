import { useState, useEffect } from "react";
import './Liked.css'

function getIngredients(meal) {
  const items = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const mea = meal[`strMeasure${i}`];
    if (ing && ing.trim()) items.push({ ing, mea: mea?.trim() || "" });
  }
  return items;
}

function LikedCard({ recipe, onRemove }) {
  const [open, setOpen] = useState(false);
  const ingredients = getIngredients(recipe);

  return (
    <div className="liked-card">
      <div className="liked-ribbon" />
      <span className="liked-ribbon-heart">♥</span>
      <div className="card-pin" />

      <div className="card-img-wrap">
        <img className="card-img" src={recipe.strMealThumb} alt={recipe.strMeal} loading="lazy" />
        <button className="unlike-btn" onClick={onRemove} title="Remove from liked">
          ♥ Liked
        </button>
      </div>

      <div className="card-body">
        {recipe.strArea && <div className="card-area">{recipe.strArea}</div>}
        <div className="title-row">
          <div className="card-title">{recipe.strMeal}</div>
          {recipe.strYoutube && (
            <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer" className="video-link" title="Watch Video">▶</a>
          )}
        </div>
        <hr className="card-divider" />
        <div className="card-btns">
          <button className="details-btn" onClick={() => setOpen(o => !o)}>
            {open ? "Hide Details" : "View Details"}
            <span className={`btn-arrow${open ? " open" : ""}`}>▼</span>
          </button>
          <button className="remove-btn" onClick={onRemove} title="Remove from liked">🗑</button>
        </div>
      </div>

      <div className={`details-panel${open ? " open" : ""}`}>
        <div className="details-inner">
          {recipe.strCategory && <span className="cat-tag">{recipe.strCategory}</span>}
          <div className="details-section-title">Ingredients</div>
          <div className="ingredients-list">
            {ingredients.map(({ ing, mea }, i) => (
              <span key={i} className="ing-chip">{mea ? `${mea} ${ing}` : ing}</span>
            ))}
          </div>
          <div className="details-section-title">Instructions</div>
          <div className="instructions-text">{recipe.strInstructions}</div>
        </div>
      </div>
    </div>
  );
}

export default function Liked({ likedMeals = [] }) {
  const [meals, setMeals] = useState(() => {
    const stored = localStorage.getItem("likedMeals");
    return stored ? JSON.parse(stored) : likedMeals;
  });

  useEffect(() => {
    localStorage.setItem("likedMeals", JSON.stringify(meals));
  }, [meals]);

  function removeMeal(id) {
    setMeals(prev => prev.filter(m => m.idMeal !== id));
  }

  return (
    <div className="liked-page">
      <div className="liked-content">
        <div className="liked-hero">
          <span className="hero-heart">♥</span>
          <div className="hero-text">
            <div className="hero-title">Liked Recipes</div>
            <div className="hero-sub">Your hand-picked collection of favourites</div>
          </div>
          <div className="hero-count">
            <div className="hero-count-num">{meals.length}</div>
            <div className="hero-count-label">Saved</div>
          </div>
        </div>

        {meals.length === 0 ? (
          <div className="liked-empty">
            <div className="empty-icon">🍽️</div>
            <div className="empty-title">No liked recipes yet</div>
            <div className="empty-sub">Heart a recipe from the main page to save it here</div>
          </div>
        ) : (
          <>
            <div className="section-divider" style={{ paddingTop: 28 }}>
              <div className="divider-line" />
              <div className="divider-text">{meals.length} recipe{meals.length !== 1 ? "s" : ""} saved</div>
              <div className="divider-line" />
            </div>

            <div className="liked-grid">
              {meals.map((meal) => (
                <LikedCard
                  key={meal.idMeal}
                  recipe={meal}
                  onRemove={() => removeMeal(meal.idMeal)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}