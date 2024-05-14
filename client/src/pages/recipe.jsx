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
                <p className="mb-2 dark:text-white">{recipe.description}</p>
                <button type="button" className="px-4 py-2 text-xs font-medium text-green-900 bg-green-300 rounded-full dark:bg-green-900 dark:text-green-300 hover:bg-green-200">VIEW ALL</button>
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
            <div className="flex flex-col justify-center max-w-screen bg-[#fefdfd] dark:bg-neutral-900">
                <div className="relative flex flex-col items-center">
                    <div className="flex flex-col items-center lg:items-start lg:flex-row h-fit bg-white dark:bg-neutral-800 border-2 dark:border-0 my-16 shadow-custom1 w-[80vw] min-w-fit max-w-full rounded-xl p-5">
                        <img className="object-contain mr-4 rounded-xl h-96" src={recipe.recipe && recipe.recipe.image} alt="Ingredient" />
                        <div className="flex flex-col items-center w-full mt-4 justify-begin h-fit">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-5xl font-medium text-gray-600 dark:text-gray-300">{recipe.recipe && recipe.recipe.name}</h3>
                                </div>
                                
                            </div>

                            <div className="flex flex-col mt-6">

                                <div className="flex flex-row items-center w-full mt-4 justify-begin h-fit">
                                        
                                        <div className="flex flex-row gap-2 p-2">
                                            {recipe.recipe &&
                                            recipe.recipe.categories.map(category => (
                                                    <p key={category.id} className="inline-flex items-center px-6 py-4 text-sm font-medium text-[#3c7e86] dark:text-[#a1f480] dark:bg-[#3c7e86]/50 rounded-[10px] bg-[#a1f480]/50">{category.name}</p>
                                            ))}
                                        </div>
                                    {/* <div className="w-full h-56 p-4 overflow-y-scroll min-w-fit">
                                        <h3 className="text-2xl font-medium text-gray-600">Nutritional Information</h3>
                                        <h4>Product description</h4>
                                        <br />
                                        {recipe.nutrients.map((nutrient, index) => {
                                            return (
                                                <div className={"flex flex-row justify-between " + (index % 2 === 0 ? "bg-gray-200" : "")}>
                                                    <p>{nutrient.name}</p>
                                                    <p>{nutrient.amount} {nutrient.units}</p>
                                                </div>
                                            )

                                            })
                                        }
                                    </div> */}
                                </div>

                                <div className="flex flex-col gap-2 p-5 bg-transperent h-96 w-96">
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
                        </div>

                    <div className="flex flex-row justify-end gap-4 p-2 lg:ml-2 min-w-9 h-fit items-right lg:flex-col">
                        <FontAwesomeIcon className={"h-5 w-5 aspect-square cursor-pointer " + (favorited ? "text-rose-500" : "hover:text-rose-500")} onClick={favorited ? unfavoriteRecipe : favoriteRecipe} icon={faHeart} />
                        <FontAwesomeIcon className="w-5 h-5 cursor-pointer aspect-square hover:text-green-500" icon={faScaleUnbalanced} />
                    </div>

                    </div>

                    <div className="flex flex-col w-full gap-2 p-5 mx-8 bg-white rounded-lg dark:bg-neutral-800 shadow-custom1 max-w-fit">
                        <h3 className="mb-4 text-2xl font-medium text-gray-600 dark:text-gray-300">Description</h3>
                        <div className="flex flex-col gap-2 dark:text-white">
                            {recipe.recipe &&
                            parse(recipe.recipe.short_description)}
                        </div>

                        <div className="flex flex-col items-center gap-10 p-10 lg:flex-row">
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
    </div>
    )
}