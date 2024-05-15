import React, { useState, useEffect } from "react";
import Modal from "../components/modal";
import Navbar from "../components/navbar";
import {
  SearchBar,
  CheckBox,
  TriStateCheckBox,
  CancelButton,
  IngredientPicker,
  BadgeToggle,
} from "../components/formComponents";
import Pagination from "../components/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faCarrot,
  faFilter,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

const checkBoxStyle =
  "p-2 rounded-lg shadow bg-white w-fit h-fit ring-green-500 hover:ring-2";

function RecipeCard({ recipe }) {
    console.log(recipe);
    return (
        
        <div className="px-2 py-4 m-0 bg-white shadow-sm cursor-pointer dark:bg-neutral-800 w-72 rounded-xl" onClick={() => window.location.href += "/" + recipe.id}>

            <img className="w-full mb-4 -mt-2 rounded" src={recipe.image} alt="Recipe" />

            {/* <div className="flex flex-col items-left" >
                <p className="pl-2 text-xs font-light text-left text-gray-600 dark:text-gray-400" >{recipe.date}</p>
            </div> */}

            <div className="flex flex-col h-full px-1 m-0">
                <h3 className="text-xl font-bold dark:text-[#fefdfd]">{recipe.name}</h3>
                <div className="flex flex-col p-1">
                    <div className="flex gap-2">
                        {recipe.categories.map((category, index) => (
                            <p key={index} className="inline-flex items-center px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-md dark:bg-gray-600 dark:text-gray-100 ring-1 ring-inset ring-gray-100 dark:ring-gray-600">{category.name}</p>
                        ))}
                    </div>
                    {/* <div className="flex flex-wrap justify-between gap-2 pt-2 mt-auto">
                        <div class="flex items-center">
                            <svg class="w-3 h-3 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg className="w-3 h-3 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg className="w-3 h-3 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg className="w-3 h-3 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg className="w-3 h-3 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <p className="text-xs font-medium text-gray-500 ms-1 dark:text-gray-400">{recipe.points}</p>
                            <p className="text-xs font-medium text-gray-500 ms-1 dark:text-gray-400">out of</p>
                            <p className="text-xs font-medium text-gray-500 ms-1 dark:text-gray-400">5</p>
                        </div>
                    </div> */}
                </div>
            </div>
          </div>
  );
}

function IngredientCheckBox({
  ingredient,
  setIncludedIngredients,
  setExcludedIngredients,
  includedIngredients,
  excludedIngredients,
}) {
  const [value, setValue] = useState(null);
  const id = ingredient.product_id;

  useEffect(() => {
    if (value === null) {
      setIncludedIngredients(includedIngredients.filter((ing) => ing !== id));
      setExcludedIngredients(excludedIngredients.filter((ing) => ing !== id));
    } else if (value) {
      setIncludedIngredients([...includedIngredients, id]);
      setExcludedIngredients(excludedIngredients.filter((ing) => ing !== id));
    } else {
      setExcludedIngredients([...excludedIngredients, id]);
      setIncludedIngredients(includedIngredients.filter((ing) => ing !== id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <TriStateCheckBox value={value} onChange={setValue} className={checkBoxStyle} label={ingredient.name} id={ingredient.name} />;
}

export default function Recipes({ darkMode, setDarkMode }) {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [filterModal, setFilterModal] = useState(false);
  const [ingredientsModal, setIngredientsModal] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [favoritedIngredients, setFavoritedIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [includedIngredients, setIncludedIngredients] = useState([]);
  const [excludedIngredients, setExcludedIngredients] = useState([]);
  const [filters, setFilters] = useState({
    vegan: false,
    vegetarian: false,
    glutenFree: false,
    dairyFree: false,
    lowFodmap: false,
    veryHealthy: false,
  });
  const [username, password] = [
    localStorage.getItem("username"),
    localStorage.getItem("password"),
  ];


  useEffect(() => {
    fetch("http://localhost:8000/favorites/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(username + ":" + password),
      },
    })
      .catch((error) => {
        console.error("Error:", error);
      })
      .then((response) => response.json())
      .then(data => {
            if (data.detail) {
                return
            }
            data = data.map((el) => {
                el.product.image = el.product.image.replace("/media/", "").replace("%3A", ":/");
                return el;
            })
            setFavoritedIngredients(data.map(record => record.product));
        })
    }, [username, password])


    useEffect(() => {
        fetch("http://localhost:8000/recipes/",
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json()).then(data => {
            data.recipes = data.recipes.map((recipe, index) => {
                recipe.image = recipe.image.replace("http://localhost:8000/media/", "").replace("%3A", ":/");
                return recipe;
            })
            setRecipes(data.recipes)
        })
    }
    , [])

    useEffect(() => {
        fetch("http://localhost:8000/products/",
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json()).then(data => {
            data.products = data.products.map((product, index) => {
                product.image = product.image.replace("http://localhost:8000/media/", "").replace("%3A", ":/");
                return product;
            })
            setIngredients(data.products);
        })
    }, [])
    

    // function handleChange(e) {
    //     setFilters({
    //         ...filters,
    //         [e.target.name]: e.target.value
    //     });
    // }

    function handleToggle(e) {
        setFilters({
            ...filters,
            [e.target.name]: e.target.checked
        });
    }

    function handleSearch(e) {
        setSearch(e.target.value);
    }

    function ResetFilters(){
        setFilters({
            vegan: false,
            vegetarian: false,
            glutenFree: false,
            dairyFree: false,
            lowFodmap: false,
            veryHealthy: false,
        });
    }

    function ResetIngredients(){
        setSelectedIngredients([]);
        setIncludedIngredients([]);
        setExcludedIngredients([]);
    
    }

    useEffect(() => {
        setFilteredRecipes(recipes.filter(recipe => {
            if (!includedIngredients.every(ingredient => (
                recipe.ingredient_ids.includes(ingredient)
            ))) return false;
            if (excludedIngredients.some(ingredient => (
                recipe.ingredient_ids.includes(ingredient)
            ))) return false;
            for (const [key, value] of Object.entries(filters)) {
                if (value && !recipe.categories.map(category => category.name).includes(key)) return false;
            }
            return true;
        }));
    }, [filters, recipes, includedIngredients, excludedIngredients])

    function FilterModal(){
        return (
            <Modal className="relative select-none w-96" isOpen={filterModal} onClose={() => {setFilterModal(false)}}>
                <h1 className="pb-2 text-2xl font-bold text-center">Filters</h1>
                <div className="flex flex-col relative items-center overflow-auto no-scrollbar max-h-[80vh]">
                    <div className="p-2 bg-gray-300 shadow-inner w-fit rounded-xl">
                        <h4 className="mb-3 text-lg font-bold text-center bg-white rounded-lg shadow-inner">Dietary Restrictions</h4>
                        <div className="grid grid-cols-2 gap-2 ">
                            <CheckBox className={checkBoxStyle} label="Vegan" value={filters.vegan} onChange={handleToggle} name="vegan" id="vegan"/>
                            <CheckBox className={checkBoxStyle} label="Vegetarian" value={filters.vegetarian} onChange={handleToggle} name="vegetarian" id="vegetarian"/>
                            <CheckBox className={checkBoxStyle} label="Gluten Free" value={filters.glutenFree} onChange={handleToggle} name="glutenFree" id="glutenFree"/>
                            <CheckBox className={checkBoxStyle} label="Dairy Free" value={filters.dairyFree} onChange={handleToggle} name="dairyFree" id="dairyFree"/>
                            <CheckBox className={checkBoxStyle} label="Low Fodmap" value={filters.lowFodmap} onChange={handleToggle} name="lowFodmap" id="lowFodmap"/>
                            <CheckBox className={checkBoxStyle} label="Very Healthy" value={filters.veryHealthy} onChange={handleToggle} name="veryHealthy" id="veryHealthy"/>
                        </div>
                    </div>
                </div>
                <CancelButton onClick={ResetFilters} className="w-full mt-5">Reset Filters</CancelButton>
            </Modal>
        )
    }

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode); // Зберігаємо нове значення в локальному сховищі
    }

    return (

        <>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <div className={`${darkMode && "dark"}`} >
                <div className="flex flex-col items-center p-4 bg-[#fefdfd] dark:bg-neutral-900">
                    <FilterModal />
                    <Modal className="relative select-none w-96 h-96" isOpen={ingredientsModal} onClose={() => {setIngredientsModal(false)}}>
                        <div className="flex flex-col h-full">
                            <h1 className="pb-2 text-2xl font-bold text-center">Ingredients</h1>
                            <IngredientPicker icon={faCarrot} className="" ingredients={onlyFavorites ? favoritedIngredients : ingredients} selected={selectedIngredients} setSelected={setSelectedIngredients} />
                            { username && password ? 

                            <BadgeToggle value={onlyFavorites} onChange={setOnlyFavorites} className="mt-1 ml-4" label="Included Ingredients">
                                <FontAwesomeIcon icon={faHeart} /> Favorites
                            </BadgeToggle>

                            : null }

                            <div className="flex flex-wrap h-40 gap-2 p-2 mt-5 overflow-y-auto border-2 border-gray-300 border-dashed rounded-lg shadow-inner">
                                {selectedIngredients.map((ingredient, index) => (

                                    <IngredientCheckBox 
                                        includedIngredients={includedIngredients} 
                                        excludedIngredients={excludedIngredients} 
                                        setExcludedIngredients={setExcludedIngredients}
                                        setIncludedIngredients={setIncludedIngredients}
                                        ingredient={ingredient} 
                                        key={index}/>

                                ))}
                            </div>
                            <CancelButton onClick={ResetIngredients} className="w-full mt-auto">Reset Ingredients</CancelButton>
                        </div>
                    </Modal>
                    <h1 className="pb-5 text-4xl font-bold text-center dark:text-white">Recipes</h1>
                    <div className="flex flex-col items-center w-fit dark:text-[#fefdfd]">
                        <SearchBar className="w-[30rem] max-w-[70vw]" darkMode={darkMode} type="text" value={search} onChange={handleSearch} placeholder="Search..."/>
                        <div className="flex flex-wrap justify-start w-full gap-4 p-2 mx-5">
                            <p onClick={() => {setFilterModal(true)}} className="text-sm font-bold text-gray-500 cursor-pointer hover:text-green-500"><FontAwesomeIcon icon={ faFilter }/> Filters</p>
                            <p onClick={() => {setIngredientsModal(true)}} className="text-sm font-bold text-gray-500 cursor-pointer hover:text-green-500"><FontAwesomeIcon icon={ faCarrot }/> Ingredients</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center w-full gap-4 p-2 mx-5">
                        {recipes.length === 0 ? <p className="text-lg font-bold text-gray-500">
                            <FontAwesomeIcon icon={faArrowsRotate} className="mx-1 animate-spin" /> Loading...</p> : 
                            (
                                <Pagination itemsPerPage={9}>
                                    {filteredRecipes.filter(recipe => recipe.name.toLowerCase().includes(search.toLowerCase())).map(recipe => (
                                        <RecipeCard key={recipe.id} recipe={recipe} />
                                    ))}
                                </Pagination>
                            )
                        }
                    </div>
                </div>
              </div>
            
    </>
  );
}
