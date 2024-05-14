import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faScaleUnbalanced,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ingredient.css";

import Nav from "../components/navbar";
import Modal from "../components/modal";

async function getIngredient(ingredientId) {
  const response = await fetch(
    "http://localhost:8000/products/" + ingredientId + "/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  let result = data.product_nutrients[0].product;
  result.image = result.image.replace("http://localhost:8000/media/", "").replace("%3A", ":/");
  result.nutrients = data.product_nutrients.map((record) => {
    return {
      name: record.nutrient.name,
      units: record.nutrient.unit,
      amount: record.amount,
    };
  });
  return result;
}

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

function IngredientCard({ product }) {
  return (
    <div className="flex flex-col gap-2 p-2 dark:bg-neytral-800">
      <img className="rounded-lg" src={product.imgSrc} alt="Product" />
      <div>
        <h4 className="text-lg font-medium text-gray-600 dark:text-gray-300">{product.name}</h4>
        <p className="dark:text-white">{product.description}</p>
        <button
          type="button"
          className="px-4 py-2 text-xs font-medium text-[#3c7e86] dark:text-[#a1f480] dark:bg-[#3c7e86]/50 bg-[#a1f480]/50 rounded-full hover:bg-green-300 dark:hover:bg-green-800"
        >
          VIEW ALL
        </button>
      </div>
    </div>
  );
}

export default function Ingredient({darkMode, setDarkMode}) {
  const { id: ingredientId } = useParams();
  const [ingredient, setIngredient] = useState();
  const [favorited, setFavorited] = useState(false);
  const [username, password] = [
    localStorage.getItem("username"),
    localStorage.getItem("password"),
  ];
  const [loginQuery, setLoginQuery] = useState(false);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode); // Зберігаємо нове значення в локальному сховищі
};

  useEffect(() => {
    if (username && password && ingredient) {
      fetch("http://localhost:8000/favorites/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(username + ":" + password),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setFavorited(
            data
              .map((record) => (record.product ? record.product.id : null))
              .includes(parseInt(ingredient.id))
          );
        });
    }
  }, [ingredient, username, password]);

  function favoriteIngredient() {
    if (!username || !password) {
      setLoginQuery(true);
      return;
    }

    fetch("http://localhost:8000/favorites/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(username + ":" + password),
      },
      body: JSON.stringify({ product: ingredient.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFavorited(true);
      });
  }

  function unfavoriteIngredient() {
    if (!username || !password) {
      setLoginQuery(true);
      return;
    }

    fetch(`http://localhost:8000/favorites/${ingredient.id}/remove/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(username + ':' + password),
            }
        }).catch((error) => {
            console.error('Error:', error);
        }).then(response => {
            response.status === 204 ? setFavorited(false) : console.log(response);
        })
  }

  useEffect(() => {
    if (ingredientId === undefined) return;
    getIngredient(ingredientId).then((data) => {
      setIngredient(data);
    });
  }, [ingredientId]);

  if (ingredient === undefined) return <div>Loading...</div>;
  else
    return (
      <>
        <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
        <Modal
          isOpen={loginQuery}
          onClose={() => setLoginQuery(false)}
          title="Log In"
        >
          <div className="flex flex-col gap-4">
            <p>You need to login to perform this action</p>
            <button
              className="p-2 text-white bg-green-400 rounded-lg"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              Log In
            </button>
          </div>
        </Modal>
        <div className={darkMode && "dark"}>
          <div className="flex justify-center bg-[#fefdfd] dark:bg-neutral-900">
            <div className="relative flex flex-col items-center ">
              <div className="flex flex-col lg:flex-row items-center h-fit my-16 shadow-sm rounded-[15px] bg-white dark:bg-neutral-800 min-w-fit p-5" style={{ boxShadow: "0px 3.5px 5.499999523162842px 0 rgba(0,0,0,0.02)" }}>
                <img
                  className="object-contain mr-5 rounded-xl h-96"
                  src={ingredient.image}
                  alt="Ingredient"
                />
                <div className="flex flex-col items-center justify-around w-full h-96">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-4xl font-bold text-[#2d3748] mb-5 dark:text-white">
                        {ingredient.name}
                      </h3>
                    </div>

                    <div className="p-2 macros">
                      <div className="flex justify-center gap-2 pt-2">
                      <p className="inline-flex items-center px-6 py-4 text-sm font-medium text-[#3c7e86] dark:text-[#a1f480] dark:bg-[#3c7e86]/50 rounded-[10px] bg-[#a1f480]/50">
                        {ingredient.category}
                      </p>
                        <p className="inline-flex items-center px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-100 dark:bg-gray-600 rounded-[10px] bg-gray-100">
                          Glycemic index: {ingredient.glycemic_index}
                        </p>
                        <p className="inline-flex items-center px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-100 dark:bg-gray-600 rounded-[10px] bg-gray-100">
                          Calories: {ingredient.calories}kcal
                        </p>
                      </div>
                      <div className="flex justify-center gap-2 pt-2">
                        <p className="inline-flex items-center px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-100 dark:bg-gray-600 rounded-[10px] bg-gray-100">
                          P: {ingredient.proteins}g
                        </p>
                        <p className="inline-flex items-center px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-100 dark:bg-gray-600 rounded-[10px] bg-gray-100">
                          F: {ingredient.fats}g
                        </p>
                        <p className="inline-flex items-center px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-100 dark:bg-gray-600 rounded-[10px] bg-gray-100">
                          C: {ingredient.carbs}g
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-56 p-4 overflow-y-scroll min-w-fit">
                    <h3 className="text-2xl font-medium text-[#2d3748] mb-5 dark:text-white">
                      Nutritional Information
                    </h3>
                    <h4 className="dark:text-white" >Product description</h4>
                    <br />
                    {ingredient.nutrients.map((nutrient, index) => {
                      return (
                        <div
                          className={
                            "flex flex-row justify-between " +
                            (index % 2 === 0 ? "bg-gray-200 dark:bg-gray-600" : "")
                          }
                        >
                          <p className="dark:text-white">{nutrient.name}</p>
                          <p className="dark:text-white">
                            {nutrient.amount} {nutrient.units}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-row items-center justify-start w-full gap-4 mt-2 h-fit max-w-9 lg:flex-col lg:h-full">
                  <FontAwesomeIcon
                    className={
                      "w-5 h-5 aspect-square text-neutral-900 dark:text-white cursor-pointer " +
                      (favorited ? "text-rose-500 dark:text-rose-500" : "hover:text-rose-500 dark:hover:text-rose-500")
                    }
                    onClick={favorited ? unfavoriteIngredient : favoriteIngredient}
                    icon={faBookmark}
                  />
                  <FontAwesomeIcon
                    className="w-5 h-5 cursor-pointer text-neutral-900 dark:text-white aspect-square hover:text-green-500 dark:hover:text-green-500"
                    icon={faScaleUnbalanced}
                  />
                </div>
              </div>

              <div className="flex flex-col items-center gap-10 p-10 lg:flex-row">
                <div className="flex flex-col gap-2 p-5 bg-white shadow-sm dark:bg-neutral-800 rounded-[15px] w-max" style={{ boxShadow: "0px 3.5px 5.499999523162842px 0 rgba(0,0,0,0.02)" }}>
                  <h3 className="mb-4 text-2xl font-bold text-[#2d3748] dark:text-white">
                    Recipes with this ingredient
                  </h3>
                  <div className="flex flex-row flex-wrap gap-2 ">
                    {RecipeCard({
                      recipe: {
                        name: "Recipe 1",
                        description: "Description 1",
                        imgSrc: "https://via.placeholder.com/150",
                      },
                    })}
                    {RecipeCard({
                      recipe: {
                        name: "Recipe 2",
                        description: "Description 2",
                        imgSrc: "https://via.placeholder.com/150",
                      },
                    })}
                    {RecipeCard({
                      recipe: {
                        name: "Recipe 3",
                        description: "Description 3",
                        imgSrc: "https://via.placeholder.com/150",
                      },
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-2 p-5 bg-white shadow-sm dark:bg-neutral-800 rounded-[15px] w-max" style={{ boxShadow: "0px 3.5px 5.499999523162842px 0 rgba(0,0,0,0.02)" }}>
                  <h3 className="mb-4 text-2xl font-bold text-[#2d3748] dark:text-white">
                    Similar ingredients
                  </h3>
                  <div className="flex flex-row flex-wrap gap-2">
                    {IngredientCard({
                      product: {
                        name: "Product 1",
                        description: "Description 1",
                        imgSrc: "https://via.placeholder.com/150",
                      },
                    })}
                    {IngredientCard({
                      product: {
                        name: "Product 2",
                        description: "Description 2",
                        imgSrc: "https://via.placeholder.com/150",
                      },
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
