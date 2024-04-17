import React, { useState, useEffect } from "react";

import Modal from "../components/modal";
import Navbar from "../components/navbar";
import { SearchBar, CheckBox, CancelButton } from "../components/formComponents";

import Pagination from "../components/pagination";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const checkBoxStyle = "p-2 rounded-lg shadow bg-white w-fit h-fit ring-green-500 hover:ring";

function RecipeCard({ recipe }) {
    return (
        <div className="flex flex-col px-2 py-4 bg-white shadow-sm cursor-pointer w-72 rounded-xl" >

            <div className="flex flex-col items-center " onClick={() => window.location.href += "/" + recipe.id}>
                <img className="w-full mb-4 -mt-2 rounded" src={recipe.image} alt="Recipe" />
            </div>

            <div className="flex flex-col items-left" >
                <p className="pl-2 text-xs font-light text-left text-gray-600" >{recipe.date}</p>
            </div>

            <div className="flex flex-col h-full pl-1 pr-1" onClick={() => window.location.href += "/" + recipe.id}>
                <div className="flex justify-between p-1">
                    <h3 className="text-xl font-bold">{recipe.name}</h3>
                </div>
                <div className="flex flex-col h-full p-1 macros">
                    <div className="flex flex-wrap gap-2 mb-2 justify-begin">
                        {recipe.categories.map((category, index) => (
                            <p key={index} className="inline-flex items-center px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-md ring-1 ring-inset ring-gray-100">{category.name}</p>
                        ))}
                    </div>
                    <div class="flex items-center mt-auto">
                        <svg class="w-3 h-3 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg class="w-3 h-3 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg class="w-3 h-3 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg class="w-3 h-3 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg class="w-3 h-3 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <p class="ms-1 text-xs font-medium text-gray-500 dark:text-gray-400">{recipe.points}</p>
                        <p class="ms-1 text-xs font-medium text-gray-500 dark:text-gray-400">out of</p>
                        <p class="ms-1 text-xs font-medium text-gray-500 dark:text-gray-400">5</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [filterModal, setFilterModal] = useState(false);
    const [filters, setFilters] = useState({
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        dairyFree: false,
        lowFodmap: false,
        veryHealthy: false,
    });

    useEffect(() => {
        fetch("http://localhost:8000/recipes/",
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json()).then(data => {
            data.recipes.forEach(recipe => {
                recipe.image = recipe.image.replace("http://localhost:8000/media/", "").replace("%3A", ":/");
            });
            setRecipes(data.recipes);
        })
    }
    , [])
    

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

    useEffect(() => {
        setFilteredRecipes(recipes.filter(recipe => {
            for (const [key, value] of Object.entries(filters)) {
                if (value && !recipe.categories.map(category => category.name).includes(key)) return false;
            }
            return true;
        }));
    }, [filters, recipes])

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
                <CancelButton onClick={ResetFilters} className="mt-2">Reset Filters</CancelButton>
            </Modal>
        )
    }


    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center p-4">
                <FilterModal />
                <h1 className="pb-5 text-4xl font-bold text-center">Recipes</h1>
                <div className="w-[30rem]">
                    <SearchBar type="text" value={search} onChange={handleSearch} placeholder="Search..."/>
                    <div className="flex flex-wrap justify-start gap-4 p-2 mx-5">
                        <p onClick={() => {setFilterModal(true)}} className="text-sm font-bold text-gray-500 cursor-pointer hover:text-green-500"><FontAwesomeIcon icon={ faFilter }/> Filters</p>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center w-full gap-4 p-2 mx-5">
                    <Pagination itemsPerPage={9}>
                        {filteredRecipes.filter(recipe => recipe.name.toLowerCase().includes(search.toLowerCase())).map(recipe => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))}
                    </Pagination>
                </div>
            </div>
        </>
    );
}