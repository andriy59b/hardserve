import { useEffect, useState } from "react";
import { useParams } from "react-router";

import parse from "html-react-parser"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faScaleUnbalanced } from "@fortawesome/free-solid-svg-icons";

import Nav from "../components/navbar";
import Modal from "../components/modal";


function RecipeCard({recipe}) {
    return (
        <div className="flex flex-col gap-2 p-2 dark:bg-neutral-800 ">
            <img className="rounded-lg" src={recipe.imgSrc} alt="Recipe" />
            <div>
            <h4 className="text-lg font-medium text-gray-600 dark:text-gray-300">{recipe.name}</h4>
                <p className="dark:text-white">{recipe.description}</p>
                <button type="button" className="px-4 py-2 text-xs font-medium text-[#3c7e86] dark:text-[#a1f480] dark:bg-[#3c7e86]/50 bg-[#a1f480]/50 rounded-full hover:bg-green-300 dark:hover:bg-green-800">VIEW ALL</button>
            </div>
        </div>
    )
}

function IngredientCard(ingredient, key) {
    return (
        <div className="flex gap-2 p-2" key={key}>
            <img className="object-contain w-20 h-20 rounded-lg" src={ingredient.image.replace("/media/", "").replace("%3A", ":/")} alt="Product" />
            <div>
            <a className="p-0 text-lg font-medium text-gray-600 dark:text-gray-300" href={`/ingredients/${ingredient.ingredient_id}`}>{ingredient.ingredient}</a>
                <p className="dark:text-white">Amount: {ingredient.amount} {ingredient.unit}</p>
            </div>
        </div>
    )
}

export default function Recipe({darkMode, setDarkMode}) {
    const { id: recipeId } = useParams();
    const [recipe, setRecipe] = useState([])
    const [favorited, setFavorited] = useState(false)
    const [username, password] = [localStorage.getItem("username"), localStorage.getItem("password")]
    const [loginQuery, setLoginQuery] = useState(false)

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode); // Зберігаємо нове значення в локальному сховищі
    };

    useEffect(() => {
        if (username && password) {
            fetch("http://localhost:8000/favorites/recipes", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic " + btoa(username + ":" + password),
                }
            }).then(response => response.json()).then(data => {
                console.log(data)
                setFavorited(data.map(record => record.recipe ? record.recipe.id : null).includes(parseInt(recipeId)))
            })
        }
    }, [recipeId, username, password])

    function favoriteRecipe(){
        if (!username || !password) {
            setLoginQuery(true);
            return
        }

        fetch("http://localhost:8000/favorites/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa(username + ":" + password),
            },
            body: JSON.stringify({recipe: recipeId})
        }).then(response => response.json()).then(data => {
            setFavorited(true);
        })
    }

    function unfavoriteRecipe(){
        if (!username || !password) {
            setLoginQuery(true);
            return
        }

        fetch(`http://localhost:8000/favorites/recipes/${recipeId}/remove/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa(username + ":" + password),
            }
        }).then(response => setFavorited(false))
    }

    useEffect(() => {
        fetch("http://localhost:8000/recipes/" + recipeId + "/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json()).then(data => {
            data.recipe.image = data.recipe.image.replace("http://localhost:8000/media/", "").replace("%3A", ":/");
            console.log(data)
            setRecipe(data);
        })
    }, [recipeId])
    
    // useEffect(() => {
    //     if (ingredientId === undefined) return;
    //     getIngredient(ingredientId).then(data => {
    //         setRecipe(data);
    //         console.log(data);
    //     }
    //     );
    // }, [ingredientId])

    if (recipe === undefined) return <div>Loading...</div>
    else return (
        <div className="w-screen overflow-x-clip">
        <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
        <Modal darkMode={darkMode} isOpen={loginQuery} onClose={() => setLoginQuery(false)} title="Log In">
            <div className="flex flex-col gap-4">
                <p>You need to login to perform this action</p>
                <button className='p-2 text-white bg-green-400 rounded-lg' onClick={() => {
                    window.location.href = '/login';
                }
                }>Log In</button>
            </div> 
        </Modal>
        <div className={`${darkMode && "dark"}`} >
            <div className="flex justify-center max-w-screen bg-[#fefdfd] dark:bg-neutral-900">
                <div className="relative flex flex-col items-center">
                    <div className="flex flex-col lg:flex-row items-center h-fit my-16 shadow-sm rounded-[15px] bg-white dark:bg-neutral-800 min-w-fit p-5" style={{ boxShadow: "0px 3.5px 5.499999523162842px 0 rgba(0,0,0,0.02)" }}>
                        <div className="flex flex-col items-start">
                            <h3 className="text-2xl font-bold text-[#2d3748] mb-5 dark:text-white">{recipe.recipe && recipe.recipe.name}</h3>
                            <img className="object-contain mr-4 rounded-xl h-100 mb-2" src={recipe.recipe && recipe.recipe.image} alt="Ingredient" />
                            <div className="flex gap-4 p-2 lg:ml-2 min-w-9 h-fit md:flex-row">
                                <FontAwesomeIcon className={"h-10 w-10 aspect-square cursor-pointer " + (favorited ? "text-rose-500" : "hover:text-rose-500")} onClick={favorited ? null : favoriteRecipe} icon={faHeart} />
                                <FontAwesomeIcon className="w-10 h-10 cursor-pointer text-neutral-900 dark:text-white aspect-square hover:text-green-500 dark:hover:text-green-500" icon={faScaleUnbalanced} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 p-5 bg-transperent h-96 w-max">
                                <h3 className="mb-4 text-lg text-center font-bold text-[#2d3748] dark:text-white">Ingredients</h3>
                            <div className="flex flex-col gap-2 overflow-y-scroll">
                                {recipe.recipe_ingredients &&
                                    recipe.recipe_ingredients.map((ingredient, index) => (
                                        IngredientCard(ingredient, index)
                                     ))
                                }
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 p-5 mx-8 bg-white dark:bg-neutral-800 shadow-sm w-[80vw] rounded-[15px] max-w-fit" style={{ boxShadow: "0px 3.5px 5.499999523162842px 0 rgba(0,0,0,0.02)" }}>
                        <h3 className="mb-4 text-xl font-bold text-[#2d3748] dark:text-white">Description</h3>
                        <div className="flex flex-col text-left text-sm gap-2 dark:text-gray-300">
                            {recipe.recipe &&
                            parse(recipe.recipe.short_description)}
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-10 p-10">
                        <div className="flex flex-col w-1/2 gap-2 p-5 bg-white dark:bg-neutral-800 shadow-sm rounded-[15px]" style={{ boxShadow: "0px 3.5px 5.499999523162842px 0 rgba(0,0,0,0.02)" }}>
                            <h3 className="mb-2 text-xl font-bold text-[#2d3748] dark:text-white">Recipe</h3>
                            <div className="flex flex-col gap-2">
                                <p className="text-lg font-bold text-gray-600 dark:text-gray-300">Steps</p>
                                <ol type="1">
                                    {recipe.recipe_steps &&
                                    recipe.recipe_steps.map((step, index) => (
                                        <div className="p-1" key={index}>
                                            <li className="text-gray-600 dark:text-gray-300 text-md">{step.step_number}. {step.description}</li>
                                        </div>
                                    ))}
                                </ol>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 p-5 bg-white dark:bg-neutral-800 shadow-sm rounded-[15px]" style={{ boxShadow: "0px 3.5px 5.499999523162842px 0 rgba(0,0,0,0.02)" }}>
                            <h3 className="mb-4 text-xl font-bold text-[#2d3748] dark:text-white">Similar recipes</h3>
                            <div className="flex flex-row flex-wrap gap-2">
                            {RecipeCard({recipe: {name: "Recipe 1", description: "Description 1", imgSrc: "https://via.placeholder.com/150"}})}
                            {RecipeCard({recipe: {name: "Recipe 2", description: "Description 2", imgSrc: "https://via.placeholder.com/150"}})}
                            {RecipeCard({recipe: {name: "Recipe 3", description: "Description 3", imgSrc: "https://via.placeholder.com/150"}})}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}