import React, { useState, useEffect } from "react";

import Modal from "../components/modal";
import Navbar from "../components/navbar";
import { SearchBar, NumberField, CheckBox } from "../components/formComponents";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const checkBoxStyle = "p-2 bg-white rounded-lg shadow w-fit h-fit ring-green-500 hover:ring";

function RecipeCard({ recipe }) {
    return (
        <div className="relative flex flex-col items-center px-2 py-4 bg-transparent bg-gray-200 shadow-lg cursor-pointer w-72 rounded-xl" onClick={() => window.location.href += "/" + recipe.id}>
            <img className="w-full mb-4 -mt-2 rounded" src={recipe.image} alt="Recipe" />
            <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">{recipe.name}</h3>
                <p className="bg-transparent macro-badge-purple">{recipe.category}</p>
            </div>
            <div className="p-1 macros">
                <div className="flex justify-center gap-2">
                    <p className="bg-transparent macro-badge-green">P: {recipe.proteins}g</p>
                    <p className="bg-transparent macro-badge-d-green">F: {recipe.fats}g</p>
                    <p className="bg-transparent macro-badge-brown">C: {recipe.carbs}g</p>
                </div>
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                    <p className="bg-transparent macro-badge-green">Calories: {recipe.calories}kcal</p>
                    <p className="bg-transparent macro-badge-purple">Cuisine: {recipe.cuisine}</p>
                </div>
            </div>
        </div>
    );
}

const demoRecipes = [
    {
        id: 1,
        name: "Pasta",
        image: "https://via.placeholder.com/150",
        category: "Main Course",
        proteins: 10,
        fats: 5,
        carbs: 20,
        calories: 250,
        cuisine: "Italian"
    },
    {
        id: 2,
        name: "Salad",
        image: "https://via.placeholder.com/150",
        category: "Appetizer",
        proteins: 5,
        fats: 2,
        carbs: 10,
        calories: 100,
        cuisine: "Mediterranean"
    },
    {
        id: 3,
        name: "Cake",
        image: "https://via.placeholder.com/150",
        category: "Dessert",
        proteins: 15,
        fats: 10,
        carbs: 30,
        calories: 350,
        cuisine: "French"
    }
];

export default function Recipes() {
    const [recipes, setRecipes] = useState(demoRecipes);
    const [search, setSearch] = useState("");
    const [filterModal, setFilterModal] = useState(false);
    const [filters, setFilters] = useState({
        proteins: 0,
        fats: 0,
        carbs: 0,
        glycemic: 0,
        calories: 0,
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        dairyFree: false,
        nutFree: false,
        eggFree: false,
        soyFree: false,
        Ukrainian: false,
        Italian: false,
        French: false,
        Japanese: false,
        Chinese: false,
        Indian: false,
        Mexican: false,
        American: false,
        Mediterranean: false,
    });

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

    useEffect(() => {
        fetch("/api/recipes")
            .then(res => res.json())
            .then(data => {
                setRecipes(data);
            });
    }, []);

    function handleSearch(e) {
        setSearch(e.target.value);
    }

    function FilterModal(){
        return (
            <Modal className="relative select-none w-96" isOpen={filterModal} onClose={() => {setFilterModal(false)}}>
                <h1 className="pb-2 text-2xl font-bold text-center">Filters</h1>
                <div className="flex flex-col relative items-center overflow-auto no-scrollbar max-h-[80vh]">
                    <div className="w-full p-4">
                        <h4 className="mb-3 text-xl font-bold text-center">Nutrients</h4>
                        <div className="flex items-center justify-between -my-2">
                            <p className="text-lg h-min">Proteins</p>
                            <span className="flex items-center gap-2"><NumberField value={filters.proteins} onChange={handleChange} className="w-16" name="proteins" min="0" /> g/kg</span>
                        </div>
                        <div className="flex items-center justify-between -my-2">
                            <p className="text-lg h-min">Fats</p>
                            <span className="flex items-center gap-2"><NumberField value={filters.fats} onChange={handleChange} className="w-16" name="fats" min="0" /> g/kg</span>
                        </div>
                        <div className="flex items-center justify-between -my-2">
                            <p className="text-lg h-min">Carbs</p>
                            <span className="flex items-center gap-2"><NumberField value={filters.carbs} onChange={handleChange} className="w-16" name="carbs" min="0" /> g/kg</span>
                        </div>
                        <div className="flex items-center justify-between -my-2">
                            <p className="text-lg h-min">Glycemic index</p>
                            <span className="flex items-center gap-2"><NumberField value={filters.glycemic} onChange={handleChange} className="w-16" name="glycemic" min="0" /> g/kg</span>
                        </div>
                        <div className="flex items-center justify-between -my-2">
                            <p className="text-lg h-min">Calories</p>
                            <span className="flex items-center gap-2"><NumberField value={filters.calories} onChange={handleChange} className="w-16" name="calories" min="0" /> kcal</span>
                        </div>
                    </div>
                    <div className="p-2 bg-gray-300 shadow-inner w-fit rounded-xl">
                        <h4 className="mb-3 text-lg font-bold text-center bg-white rounded-lg shadow-inner">Dietary Restrictions</h4>
                        <div className="grid grid-cols-2 gap-2 ">
                            <CheckBox className={checkBoxStyle} label="Vegan" value={filters.vegan} onChange={handleToggle} name="vegan" id="vegan"/>
                            <CheckBox className={checkBoxStyle} label="Vegetarian" value={filters.vegetarian} onChange={handleToggle} name="vegetarian" id="vegetarian"/>
                            <CheckBox className={checkBoxStyle} label="Gluten Free" value={filters.glutenFree} onChange={handleToggle} name="glutenFree" id="glutenFree"/>
                            <CheckBox className={checkBoxStyle} label="Dairy Free" value={filters.dairyFree} onChange={handleToggle} name="dairyFree" id="dairyFree"/>
                            <CheckBox className={checkBoxStyle} label="Nut Free" value={filters.nutFree} onChange={handleToggle} name="nutFree" id="nutFree"/>
                            <CheckBox className={checkBoxStyle} label="Egg Free" value={filters.eggFree} onChange={handleToggle} name="eggFree" id="eggFree"/>
                            <CheckBox className={checkBoxStyle} label="Soy Free" value={filters.soyFree} onChange={handleToggle} name="soyFree" id="soyFree"/>
                        </div>
                    </div>
                    <div className="p-2 mt-4 bg-gray-300 shadow-inner w-fit rounded-xl">
                        <h4 className="mb-3 text-lg font-bold text-center bg-white rounded-lg shadow-inner">Cuisine</h4>
                        <div className="grid grid-cols-2 gap-2">
                            <CheckBox className={checkBoxStyle} label="Ukrainian" value={filters.Ukrainian} onChange={handleToggle} name="Ukrainian" id="Ukrainian"/>
                            <CheckBox className={checkBoxStyle} label="Italian" value={filters.Italian} onChange={handleToggle} name="Italian" id="Italian"/>
                            <CheckBox className={checkBoxStyle} label="French" value={filters.French} onChange={handleToggle} name="French" id="French"/>
                            <CheckBox className={checkBoxStyle} label="Japanese" value={filters.Japanese} onChange={handleToggle} name="Japanese" id="Japanese"/>
                            <CheckBox className={checkBoxStyle} label="Chinese" value={filters.Chinese} onChange={handleToggle} name="Chinese" id="Chinese"/>
                            <CheckBox className={checkBoxStyle} label="Indian" value={filters.Indian} onChange={handleToggle} name="Indian" id="Indian"/>
                            <CheckBox className={checkBoxStyle} label="Mexican" value={filters.Mexican} onChange={handleToggle} name="Mexican" id="Mexican"/>
                            <CheckBox className={checkBoxStyle} label="American" value={filters.American} onChange={handleToggle} name="American" id="American"/>
                            <CheckBox className={checkBoxStyle} label="Mediterranean" value={filters.Mediterranean} onChange={handleToggle} name="Mediterranean" id="Mediterranean"/>
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
                <div className="flex flex-wrap justify-center gap-4 p-2 mx-5">
                    {recipes.filter(recipe => recipe.name.toLowerCase().includes(search.toLowerCase())).map(recipe => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </div>
        </>
    );
}