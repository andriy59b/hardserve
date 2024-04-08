import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faScaleUnbalanced } from "@fortawesome/free-solid-svg-icons";

import Nav from "../components/navbar";

const demoRecipe = {
    name: "Recipe 1",
    category: "Category 1",
    cuisine: "Cuisine 1",
    calories: 100,
    proteins: 10,
    fats: 10,
    carbs: 10,
    nutrients: [
        {name: "Nutrient 1", amount: 10, units: "g"},
        {name: "Nutrient 2", amount: 20, units: "g"},
        {name: "Nutrient 3", amount: 30, units: "g"},
        {name: "Nutrient 4", amount: 40, units: "g"},
        {name: "Nutrient 5", amount: 50, units: "g"},
        {name: "Nutrient 6", amount: 60, units: "g"},
    ]
}

function RecipeCard({recipe}) {
    return (
        <div className="flex flex-col gap-2 p-2 ">
            <img className="rounded-lg" src={recipe.imgSrc} alt="Recipe" />
            <div>
                <h4 className="text-lg font-medium text-gray-600">{recipe.name}</h4>
                <p>{recipe.description}</p>
                <button type="button" className="px-4 py-2 text-xs font-medium text-green-900 bg-green-300 rounded-full hover:bg-green-200">VIEW ALL</button>
            </div>
        </div>
    )
}

function IngredientCard({product}) {
    return (
        <div className="flex gap-2 p-2">
            <img className="h-20 rounded-lg" src={product.imgSrc} alt="Product" />
            <div>
                <a className="p-0 text-lg font-medium text-gray-600" href={`/ingredients/${product.id}`}>{product.name}</a>
                <p>{product.description}</p>
                <p>Amount: {product.amount}{product.units}</p>
            </div>
        </div>
    )
}

export default function Recipe() {
    const { id: ingredientId } = useParams();
    const [recipe, setRecipe] = useState(demoRecipe)

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
        <>
        <Nav />
        <div className="flex justify-center bg-[#fefdfd]">
            <div className="relative flex flex-col items-center ">
                <div className="flex flex-col items-center md:items-start md:flex-row h-fit bg-white border-2 my-16 shadow-sm w-[80vw] min-w-fit rounded-xl p-10 gap-10">
                    <img className="object-contain m-2 rounded-xl h-96" src="https://via.placeholder.com/150" alt="Ingredient" />
                    <div className="flex flex-col items-center justify-around w-full h-96">
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-5xl font-medium text-gray-600">{recipe.name}</h3>
                                <p className="inline-flex items-center px-4 py-2 text-xs font-medium text-green-700 bg-green-100 rounded-md ring-1 ring-inset ring-green-50">{recipe.category}</p>
                            </div>
                            
                            <div className="p-2 macros">
                            <div className="flex justify-center gap-2 pt-2">
                                    <p className="inline-flex items-center px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-md ring-1 ring-inset ring-gray-100">Cuisine: {recipe.cuisine}</p>
                                    <p className="inline-flex items-center px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-md ring-1 ring-inset ring-gray-100">Calories: {recipe.calories}kcal</p>
                                </div>
                                <div className="flex justify-center gap-2 pt-2">
                                    <p className="inline-flex items-center px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-md ring-1 ring-inset ring-gray-100">P: {recipe.proteins}g</p>
                                    <p className="inline-flex items-center px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-md ring-1 ring-inset ring-gray-100">F: {recipe.fats}g</p>
                                    <p className="inline-flex items-center px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-md ring-1 ring-inset ring-gray-100">C: {recipe.carbs}g</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-56 p-4 overflow-y-scroll min-w-fit">
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
                        </div>
                    </div>

                    <div className="flex flex-row gap-4 p-4 items-right w-max md:flex-col">
                        <FontAwesomeIcon className="h-8 hover:text-rose-500 hover:cursor-pointer" icon={faBookmark} />
                        <FontAwesomeIcon className="h-8 hover:text-green-500 hover:cursor-pointer" icon={faScaleUnbalanced} />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-10 p-10">
                    <div className="flex justify-center gap-4">
                        <div className="flex flex-col gap-2 p-5 bg-white rounded-lg shadow-sm w-max">
                            <h3 className="mb-4 text-2xl font-medium text-gray-600">Ingredients</h3>
                            <div className="flex flex-col gap-2">
                            {IngredientCard({product: {id: 1, name: "Product 1", description: "Description 1", imgSrc: "https://via.placeholder.com/150", amount: 100, units: "g"}})}
                            {IngredientCard({product: {id: 2, name: "Product 2", description: "Description 2", imgSrc: "https://via.placeholder.com/150", amount: 2, units: "pcs"}})}
                            </div>
                        </div>
                        <div className="flex flex-col w-1/2 gap-2 p-5 bg-white rounded-lg shadow-sm">
                            <h3 className="mb-4 text-2xl font-medium text-gray-600">Recipe</h3>
                            <div className="flex flex-col gap-2">
                                <p className="text-lg font-bold text-gray-600">Instructions</p>
                                <p className="w-full">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Dolorum in quod itaque molestiae harum sed atque officiis laudantium, explicabo id porro magni quia placeat facere labore rerum? 
                                    Nisi quos saepe labore aliquid veritatis quae. 
                                    In, placeat quaerat quos nam, rem tenetur porro animi laborum, consequatur consectetur autem quisquam totam laudantium!
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 p-5 bg-white rounded-lg shadow-sm w-max">
                        <h3 className="mb-4 text-2xl font-medium text-gray-600">Similar recipes</h3>
                        <div className="flex flex-row flex-wrap gap-2">
                        {RecipeCard({recipe: {name: "Recipe 1", description: "Description 1", imgSrc: "https://via.placeholder.com/150"}})}
                        {RecipeCard({recipe: {name: "Recipe 2", description: "Description 2", imgSrc: "https://via.placeholder.com/150"}})}
                        {RecipeCard({recipe: {name: "Recipe 3", description: "Description 3", imgSrc: "https://via.placeholder.com/150"}})}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </>
    )
}