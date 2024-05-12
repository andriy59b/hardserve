import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faHeart, faBookmark, faScaleUnbalanced, faTrash } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect } from 'react';

import back from '../../components/img/back.png'
import Modal from '../../components/modal';

function Quit(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('refresh_token');
    window.location.href = '/';
}

export default function UserBar() {
    const [favoritedIngredientsModal, setFavoritedIngredientsModal] = useState(false);
    const [favoritedRecipesModal, setFavoritedRecipesModal] = useState(false);
    const [favoritedIngredients, setFavoritedIngredients] = useState([]);
    const [favoritedRecipes, setFavoritedRecipes] = useState([]);
    const [username, password] = [localStorage.getItem("username"), localStorage.getItem("password")];
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        fetch('http://localhost:8000/profile/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(username + ':' + password),
            },
        }).catch((error) => {
            console.error('Error:', error);
        }).then(response => response.json()).then(data => {
            setDisplayName(data.username);
            setEmail(data.email);
        })
    }, [username, password])

    useEffect(() => {
        fetch('http://localhost:8000/favorites/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(username + ':' + password),
            },
        }).catch((error) => {
            console.error('Error:', error);
        }
        ).then(response => response.json()).then(data => {
            if (data.detail) {
                return
            }
            setFavoritedIngredients(data.map(record => record.product));
        })
    }, [username, password])

    useEffect(() => {
        fetch('http://localhost:8000/favorites/recipes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(username + ':' + password),
            },
        }).catch((error) => {
            console.error('Error:', error);
        }
        ).then(response => response.json()).then(data => {
            if (data.detail) {
                return
            }
            setFavoritedRecipes(data.map(record => record.recipe));
        })
    }, [username, password])


    function DeleteIngredient(id){
        fetch(`http://localhost:8000/favorites/${id}/remove/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(username + ':' + password),
            }
        }).catch((error) => {
            console.error('Error:', error);
        }).then(response => {
            response.status === 204 ? setFavoritedIngredients(favoritedIngredients.filter(ingredient => ingredient ? ingredient.id !== id : false)) : console.log(response);
        })
    }

    function DeleteRecipe(id){
        fetch(`http://localhost:8000/favorites/recipes/${id}/remove/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(username + ':' + password),
            }
        }).catch((error) => {
            console.error('Error:', error);
        }).then(response => {
            response.status === 204 ? setFavoritedRecipes(favoritedRecipes.filter(recipe => recipe ? recipe.id !== id : false)) : console.log(response);
        })
    }


    return (
        <div className="flex flex-col items-end w-full p-5 -mt-5">
            <Modal isOpen={favoritedIngredientsModal} onClose={() => {setFavoritedIngredientsModal(false)}} title="Favorite ingredients">
                <div className="flex flex-col gap-4">
                    {favoritedIngredients.map((ingredient, index) => {
                        if (ingredient === null || ingredient === undefined) return null;
                        return (
                            <div key={index} className="flex p-2 bg-white shadow rounded-xl">
                                <div className="items-center gap-2" key={index}>
                                    <a href={"http://localhost:3000/ingredients/" + ingredient.id} className='text-xl font-bold'>{ingredient.name}</a>
                                    <div className="flex justify-center gap-2 pt-2">
                                        <p className="inline-flex items-center px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-md ring-1 ring-inset ring-gray-100">P: {ingredient.proteins}g</p>
                                        <p className="inline-flex items-center px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-md ring-1 ring-inset ring-gray-100">F: {ingredient.fats}g</p>
                                        <p className="inline-flex items-center px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-md ring-1 ring-inset ring-gray-100">C: {ingredient.carbs}g</p>
                                    </div>
                                </div>
                                <FontAwesomeIcon onClick={() => {DeleteIngredient(ingredient.id)}} icon={faTrash} className='h-6 p-2 ml-auto text-sm text-red-500 bg-white shadow cursor-pointer aspect-square rounded-xl hover:text-red-700 hover:bg-gray-200' />
                            </div>
                        )
                    })}
                </div>
            </Modal>
            <Modal isOpen={favoritedRecipesModal} onClose={() => {setFavoritedRecipesModal(false)}} title="Favorite recipes">
                <div className="flex flex-col gap-4">
                    {favoritedRecipes.map((recipe, index) => {
                        if (recipe === null || recipe === undefined) return null;
                        return (
                            <div className="flex gap-2 p-2 bg-white shadow rounded-xl" key={index}>
                                <img src={recipe.image.replace("/media/", "").replace("%3A", ":/")} alt="Recipe" className="object-cover h-24 rounded-lg" />
                                <div>
                                    <a href={"http://localhost:3000/recipes/" + recipe.id} className='pl-0 text-xl font-bold'>{recipe.name}</a>
                                    <div className="flex gap-2 pt-2">
                                        {
                                            recipe.categories.map(category => (
                                                <p key={category.id} className="inline-flex items-center px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-md ring-1 ring-inset ring-gray-100">{category.name}</p>
                                            ))
                                        }
                                    </div>
                                </div>
                                <FontAwesomeIcon onClick={() => {DeleteRecipe(recipe.id)}} icon={faTrash} className='h-6 p-2 ml-auto text-sm text-red-500 bg-white shadow cursor-pointer aspect-square rounded-xl hover:text-red-700 hover:bg-gray-200' />
                            </div>
                        )
                    })}
                </div>
            </Modal>
            <img src={back} alt="header" className="object-cover w-full h-60 rounded-2xl" />
            <div className="flex items-center w-11/12 h-20 p-2 mr-2 -mt-8 shadow-md bg-white/30 dark:bg-neutral-800/30 backdrop-blur-md rounded-2xl">
                <div className="absolute flex items-center w-20 h-20 py-2">
                    <img src="https://media.istockphoto.com/id/1327656409/vector/user-icon-admin-profile-pictogram.jpg?s=612x612&w=0&k=20&c=SCadkvBVVRHToUEiwBL5rxE2e8XS7ch5Eizf509kWeE=" alt="profile" className="object-cover h-full shadow dark:shadow-custom1 aspect-square rounded-xl" />
                    <FontAwesomeIcon icon={faPen} className='absolute bottom-0 h-4 p-1 bg-white rounded shadow cursor-pointer right-1 hover:bg-gray-200' />
                </div>
                <div className="flex flex-col justify-center w-full h-full pl-24">
                    <h1 className="text-xl font-bold dark:text-white">{displayName}</h1>
                    <p className="text-sm text-gray-400">{email}</p>
                </div>
                <FontAwesomeIcon onClick={() => {setFavoritedRecipesModal(true)}} icon={faHeart} className='h-6 p-2 mr-2 text-sm text-red-500 bg-white dark:bg-neutral-900 shadow dark:shadow-custom1 cursor-pointer aspect-square rounded-xl hover:text-red-700 hover:bg-gray-200' />
                <FontAwesomeIcon icon={faScaleUnbalanced} className='h-6 p-2 mr-2 text-sm text-green-500 bg-white dark:bg-neutral-900 shadow dark:shadow-custom1 cursor-pointer aspect-square rounded-xl hover:text-green-700 hover:bg-gray-200' />
                <FontAwesomeIcon onClick={() => {setFavoritedIngredientsModal(true)}} icon={faBookmark} className='h-6 p-2 mr-2 text-sm text-red-500 bg-white dark:bg-neutral-900 shadow dark:shadow-custom1 cursor-pointer aspect-square rounded-xl hover:text-red-700 hover:bg-gray-200' />
                <button onClick={Quit} className="w-20 h-10 p-2 mr-2 text-sm font-bold text-white dark:text-neutral-900 bg-red-500 shadow hover:bg-red-700 rounded-xl">Quit</button>
            </div>
        </div>
    );
}