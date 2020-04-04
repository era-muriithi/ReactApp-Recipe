import React, {useEffect, useState} from 'react';
import style from './recipe.module.css'
import Recipe from './Recipe';
import './App.css';
const App = () => {

  const App_ID = "e647fd64";
  const App_Key = "d8fda05ea4ef846a06abf26c9a67b833";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken ')

  useEffect(() => {
    getRecipe();
  }, [query]);

  const getRecipe = async () => {

    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${App_ID}&app_key=${App_Key}`);
  

    
    
    const data = await response.json();

    setRecipes(data.hits);
    console.log(data.hits);

  };

  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search)
  };

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
    <form onSubmit={getSearch} className="search-form">
    <h1 className={style.logo}>Aromas</h1>
    <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
    <button className="search-button" type="submit">Search</button>
    
    </form>
    <div className='recipes'>

    {recipes.map(recipe => (
      <Recipe
      key={recipe.recipe.label}
      title={recipe.recipe.label}
      calories={recipe.recipe.calories}
      image={recipe.recipe.image}
      ingredients={recipe.recipe.ingredients}
      />
    ))}
    </div>

    </div>
  );
};

export default App;
