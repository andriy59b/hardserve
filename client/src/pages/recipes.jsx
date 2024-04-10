import React, { useState, useEffect } from "react";

import Modal from "../components/modal";
import Navbar from "../components/navbar";
import { SearchBar, NumberField, CheckBox } from "../components/formComponents";

import Pagination from "../components/pagination";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const checkBoxStyle = "p-2 bg-white rounded-lg shadow w-fit h-fit ring-green-500 hover:ring";

function RecipeCard({ recipe }) {
    return (
        <div className="relative flex flex-col items-center px-2 py-4 bg-transparent bg-gray-200 shadow-lg cursor-pointer w-72 rounded-xl" onClick={() => window.location.href += "/" + recipe.id}>
            <img className="w-full mb-4 -mt-2 rounded" src={recipe.image} alt="Recipe" />
            <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-center">{recipe.name}</h3>
            </div>
            <div className="flex flex-wrap gap-2 p-2">
                    {recipe.categories.map(category => (
                        <p key={category.id} className="bg-transparent macro-badge-purple">{category.name}</p>
                    ))}
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
    

    function handleChange(e) {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    }

    function handleToggle(e) {
        setFilters({
            ...filters,
            [e.target.name]: e.target.checked
        });
    }

    function handleSearch(e) {
        setSearch(e.target.value);
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