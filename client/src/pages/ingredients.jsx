import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Pagination from "../components/pagination";

import Modal from "../components/modal";
import { SearchBar, NumberField, Select, CancelButton } from "../components/formComponents";

import "./ingredients.css";

function IngredientCard({ingredient, darkMode}){
    return (
<<<<<<< HEAD:client/src/pages/ingredients.jsx
        <div className="relative flex flex-col items-center px-2 py-4 bg-transparent bg-gray-200 shadow-lg cursor-pointer w-72 rounded-xl" onClick={() => window.location.href += "/" + ingredient.product_id}>
            <img className="object-contain w-full mt-2 mb-4 rounded-xl max-h-52" src={ingredient.image} alt="Ingredient" />
            <div className="flex items-center gap-2 mt-auto">
                <h3 className="text-xl font-bold">{ingredient.name}</h3>
                <p className="bg-transparent macro-badge-purple">{ingredient.category}</p>
            </div>
            <div className="p-2 macros">
                <div className="flex justify-center gap-2">
                    <p className="bg-transparent macro-badge-green">P: {ingredient.proteins}g</p>
                    <p className="bg-transparent macro-badge-d-green">F: {ingredient.fats}g</p>
                    <p className="bg-transparent macro-badge-brown">C: {ingredient.carbs}g</p>
=======
        <div className={`${darkMode && "dark"}`} >
            <div className="relative flex flex-col items-center px-2 py-4 bg-transparent bg-gray-200 shadow-lg dark:shadow-custom1 cursor-pointer w-72 rounded-xl" onClick={() => window.location.href += "/" + ingredient.id}>
                <img className="w-full mt-2 mb-4 rounded" src="https://via.placeholder.com/150" alt="Ingredient" />
                <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold dark:text-white">{ingredient.name}</h3>
                    <p className="bg-transparent macro-badge-purple">{ingredient.category}</p>
>>>>>>> 46672b7 (Complete darkMode):client/src/pages/ingredients.js
                </div>
                <div className="p-2 macros">
                    <div className="flex justify-center gap-2">
                        <p className="bg-transparent macro-badge-green">P: {ingredient.proteins}g</p>
                        <p className="bg-transparent macro-badge-d-green">F: {ingredient.fats}g</p>
                        <p className="bg-transparent macro-badge-brown">C: {ingredient.carbs}g</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 pt-2">
                        <p className="bg-transparent macro-badge-purple">Glycemic index: {ingredient.glycemic_index}</p>
                        <p className="bg-transparent macro-badge-green">Calories: {ingredient.calories}kcal</p>
                    </div>
                </div>
                {/* <div className="w-full p-2 bg-transparent border-2 border-b-indigo-500 border-t-transparent border-r-transparent border-l-transparent">
                    <p>Vitamins: {ingredient.vitamins?.join(", ")}</p>
                    <p>Allergens: {ingredient.allergens?.join(", ")}</p>
                </div> */}
            </div>
        </div>
    );
}

async function getIngredients(){
    const response = await fetch("http://localhost:8000/products/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    data.products = data.products.map((product, index) => {
        product.image = product.image.replace("http://localhost:8000/media/", "").replace("%3A", ":/");
        return product;
    })
    return data.products;
}

export default function Ingredients({darkMode, setDarkMode}) {
    const [loadedIngredients, setLoadedIngredients] = useState();

    const [filteredIngredients, setFilteredIngredients] = useState([]);
    const [category, setCategory] = useState("all");
    const [search, setSearch] = useState("");
    const [proteins, setProteins] = useState(0);
    const [fats, setFats] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [glycemic, setGlycemic] = useState(0);
    const [calories, setCalories] = useState(0);
    const [filterModal, setFilterModal] = useState(false);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode); // Зберігаємо нове значення в локальному сховищі
    };

    useEffect(() => {
        getIngredients().then(data => {
            data = data.map((ingredient, index) => {
                ingredient.id = index+1;
                return ingredient;
            });
            setLoadedIngredients(data);
            console.log(data);
        });
    }, []);

    useEffect(() => {
        if (loadedIngredients === undefined){
            return;
        }
        setFilteredIngredients(
            loadedIngredients.filter(ingredient => {
            if(category === "all"){
                return true;
            }
            return ingredient.category.toLowerCase() === category.toLowerCase();
            })
            .filter(ingredient => {
                return ingredient.name.toLowerCase().includes(search.toLowerCase());
            })
            .filter(ingredient => {
                return ingredient.proteins >= proteins;
            })
            .filter(ingredient => {
                return ingredient.fats >= fats;
            })
            .filter(ingredient => {
                return ingredient.carbs >= carbs;
            })
            .filter(ingredient => {
                return ingredient.glycemic_index >= glycemic;
            })
            .filter(ingredient => {
                return ingredient.calories >= calories;
            })
        )
    }, [category, search, proteins, fats, carbs, glycemic, calories, loadedIngredients]);

    function resetFilters(){
        setCategory("all");
        setSearch("");
        setProteins(0);
        setFats(0);
        setCarbs(0);
        setGlycemic(0);
        setCalories(0);
    }

    const options = ["all", "vegetable", "fruit", "meat", "seafood", "grains", "legumes", "dairy", "spices"]

    return (
<<<<<<< HEAD:client/src/pages/ingredients.jsx
        <>
            <Navbar />
            <Modal className="relative z-50 select-none w-96" isOpen={filterModal} onClose={() => {setFilterModal(false)}}>
                <div className="">
                    <h2 className="text-xl font-bold">Filters</h2>
                    <div className="flex items-center">
                        <p>Category</p>
                        <Select className="w-40 ml-auto" value={category} onChange={(e) => {setCategory(e.target.value)}} options={options} />
                    </div>
                    <h4 className="mt-2 text-lg text-center">Nutrients</h4>
                    <div className="flex items-center">
                        <p>Proteins</p>
                        <NumberField value={proteins} onChange={(e) => {setProteins(e.target.value)}} className="w-16 ml-auto mr-2" min="0" defaultValue={0} />
                        g/100g
                    </div>
                    <div className="flex items-center">
                        <p>Fats</p>
                        <NumberField value={fats} onChange={(e) => {setFats(e.target.value)}} className="w-16 ml-auto mr-2" min="0" defaultValue={0} />
                        g/100g
                    </div>
                    <div className="flex items-center">
                        <p>Carbs</p>
                        <NumberField value={carbs} onChange={(e) => {setCarbs(e.target.value)}} className="w-16 ml-auto mr-2" min="0" defaultValue={0} />
                        g/100g
                    </div>
                    <div className="flex items-center">
                        <p>Glycemic index</p>
                        <NumberField value={glycemic} onChange={(e) => {setGlycemic(e.target.value)}} className="w-16 ml-auto mr-2" min="0" defaultValue={0} />
                    </div>
                    <div className="flex items-center">
                        <p>Calories</p>
                        <NumberField value={calories} onChange={(e) => {setCalories(e.target.value)}} className="w-16 ml-auto mr-2" min="0" defaultValue={0} />
                        kcal/100g
                    </div>
                    <CancelButton onClick={resetFilters} className="w-full mt-2">Reset Filters</CancelButton>
                </div>
                
            </Modal>
            <main className="flex flex-col items-center">
            <h1 className="pb-5 text-4xl font-bold text-center">Ingredients</h1>
                <div className="w-[30rem]">
                    <SearchBar type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..."/>
                    <div className="flex flex-wrap justify-start gap-4 p-2 mx-5">
                        <p onClick={() => {setFilterModal(true)}} className="text-sm font-bold text-gray-500 cursor-pointer hover:text-green-500"><FontAwesomeIcon icon={ faFilter }/> Filters</p>
                    </div>
                </div>
                <div className="container px-5 h-fit">
                    <Pagination itemsPerPage={9}>{
                        filteredIngredients.map((ingredient, index) => (
                                <IngredientCard key={index} ingredient={ingredient} />
                            )
                        )
                    }
                    </Pagination>
                </div>
                <Footer />
            </main>
        </>
=======
        <div className="flex flex-col">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
        <div className={`${darkMode && "dark"}`} >
            <main className="flex flex-col items-center dark:bg-neutral-900">
                <div className="search-bar dark:text-white dark:border-white">
                    <input onChange={(e) => {setSearch(e.target.value)}} type="text" />
                    <button className="dark:text-white"><FontAwesomeIcon icon={ faMagnifyingGlass } /></button>
                </div>
                <div className="container h-fit">
                    <div className="filters dark:border-white">
                        <h2 className="text-xl font-bold dark:text-white">Filters</h2>
                        <div className="filter dark:text-white">
                            <p>Category</p>
                            <select className="dark:border-white" onChange={(e) => {setCategory(e.target.value)}} defaultValue="all">
                                <option value="all">All</option>
                                <option value="vegetable">Vegetables</option>
                                <option value="fruit">Fruits</option>
                                <option value="meat">Meat</option>
                                <option value="seafood">Seafood</option>
                                <option value="grains">Grains</option>
                                <option value="legumes">Legumes</option>
                                <option value="dairy">Dairy</option>
                                <option value="spices">Spices</option>
                            </select>
                        </div>
                        <h4 className="text-lg dark:text-white">Nutrients</h4>
                        <div className="filter dark:text-white">
                            <p>Proteins</p>
                            <input className="dark:bg-neutral-900 dark:border-white" onChange={(e) => {setProteins(e.target.value)}} type="number" min="0" defaultValue={0} />
                            g/kg
                        </div>
                        <div className="filter dark:text-white">
                            <p>Fats</p>
                            <input className="dark:bg-neutral-900 dark:border-white" onChange={(e) => {setFats(e.target.value)}} type="number" min="0" defaultValue={0} />
                            g/kg
                        </div>
                        <div className="filter dark:text-white">
                            <p>Carbs</p>
                            <input className="dark:bg-neutral-900 dark:border-white" onChange={(e) => {setCarbs(e.target.value)}} type="number" min="0" defaultValue={0} />
                            g/kg
                        </div>
                        <div className="filter dark:text-white">
                            <p>Glycemic index</p>
                            <input className="dark:bg-neutral-900 dark:border-white" onChange={(e) => {setGlycemic(e.target.value)}} type="number" min="0" defaultValue={0} />
                            g/kg
                        </div>
                        <div className="filter dark:text-white">
                            <p>Calories</p>
                            <input className="dark:bg-neutral-900 dark:border-white" onChange={(e) => {setCalories(e.target.value)}} type="number" min="0" defaultValue={0} />
                            kcal/kg
                        </div>
                        <div className="filter">
                            <p className="dark:text-white">Vitamins</p>
                            <MultiSelect darkMode={darkMode} className="rounded-full" placeholder="Select" prefix="Vitamin " options={[
                                "A", 
                                "B", 
                                "C", 
                                "D", 
                                "E", 
                                "K"]} selected={selectedVitamins} setSelected={setSelectedVitamins} />
                        </div>
                        <h4 className="text-lg dark:text-white">Allergies</h4>
                        <div className="filter">
                            <p className="dark:text-white" >Allergens</p>
                            <MultiSelect darkMode={darkMode} className="rounded-full" placeholder="Select" options={[
                                "Nuts", 
                                "Milk", 
                                "Fish", 
                                "Meats", 
                                "Soy", 
                                "Citrus"]} selected={selectedAllergies} setSelected={setSelectedAllergies} />
                        </div>
                    </div>
                        <Pagination darkMode={darkMode} itemsPerPage={10}>{
                            filteredIngredients.map((ingredient, index) => (
                                    <IngredientCard key={index} ingredient={ingredient} />
                                )
                            )
                        }
                        </Pagination>
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
>>>>>>> 46672b7 (Complete darkMode):client/src/pages/ingredients.js
    );
}