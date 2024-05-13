import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPen, faCheck, faBowlRice, faMugSaucer, faBurger } from "@fortawesome/free-solid-svg-icons"

import { useState, useEffect } from "react"

import Modal from "../../components/modal"
import { TextField, TextArea, AcceptButton, CancelButton, DeleteButton, Select, RecipePicker, RecipeRecommendation, MultiSlider, Locked } from "../../components/formComponents"
import { Tabs, TabTriggers, TabTrigger, TabsContent, TabContent } from "../../components/tabs"

const demoPlans = [
    {
        name: "Basic",
        description: "Basic plan",
        selected: true,
    },
    {
        name: "Standard",
        description: "Standard plan",
        selected: false,
    },
    {
        name: "Premium",
        description: "Premium plan",
        selected: false,
    }
]

function PlanCard({ plan }) {

    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [detailsModal, setDetailsModal] = useState(false);

    return (
        <div className="flex justify-between gap-2 px-6 py-3 bg-[#F8F9FA] dark:bg-neutral-800 min-h-20 h-fit rounded-xl">
            <Modal isOpen={editModal} title={`Edit ${plan.name} plan`} onClose={() => {setEditModal(false)}}>
                <TextField placeholder="Name" />
                <TextArea className="w-96" placeholder="Description" />
                <div className="flex justify-end gap-2 mt-4">
                    <CancelButton onClick={() => {setEditModal(false)}} >Cancel</CancelButton>
                    <AcceptButton >Save</AcceptButton>
                </div>
            </Modal>
            <Modal isOpen={deleteModal} title={`Delete ${plan.name} plan`} onClose={() => {setDeleteModal(false)}}>
                <p>Are you sure you want to delete {plan.name} plan?</p>
                <div className="flex justify-end gap-2 mt-4">
                    <CancelButton onClick={() => {setDeleteModal(false)}} >Cancel</CancelButton>
                    <DeleteButton>Delete</DeleteButton>
                </div>
            </Modal>
            <Modal isOpen={detailsModal} title={`${plan.name} plan`} onClose={() => {setDetailsModal(false)}}>
                <p>Details</p>
                
            </Modal>
            <div className="cursor-pointer " onClick={() => {setDetailsModal(true)}}>
                <p className="font-bold dark:text-white">
                    {plan.name}
                    {plan.selected && <span className="text-xs text-green-400"> - Following</span>}
                </p>
                <p className="dark:text-white" >{plan.description}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="flex gap-1 text-center">
                    <p onClick={() => {setDeleteModal(true)}} className="h-5 text-xs text-red-500 cursor-pointer hover:text-red-700 w-fit"><FontAwesomeIcon icon={faTrash}/> DELETE</p>
                    <p onClick={() => {setEditModal(true)}} className="h-5 text-xs text-green-500 cursor-pointer hover:text-green-700 w-fit"><FontAwesomeIcon icon={faPen}/> EDIT</p>
                </div>
                { !plan.selected &&
                <p className="h-5 text-xs cursor-pointer dark:text-white dark:hover:text-gray-600 hover:text-gray-400 w-fit"><FontAwesomeIcon icon={faCheck}/> FOLLOW</p>}
            </div>
        </div>
    )
}

export default function Plans() {
    const [addModal, setAddModal] = useState(false);
    const [selectedRecipes, setSelectedRecipes] = useState([]);
    const [recipes, setRecipes] = useState([]);

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
            setRecipes(data.recipes);
        })
    }, [])

    function deleteRecipe(recipe) {
        setSelectedRecipes(selectedRecipes.filter((selectedRecipe) => selectedRecipe !== recipe));
    }

    function addRecipe(recipe) {
        setSelectedRecipes([...selectedRecipes, recipe]);
    }

    const [test, setTest] = useState([20, 40, 20, 20]);
    const meals = [
        {
            name: "Breakfast",
            icon: faMugSaucer
        },
        {
            name: "Lunch",
            icon: faBurger
        },
        {
            name: "Diner",
            icon: faBowlRice
        }
    ];

    return (
        <>
            <Modal isOpen={addModal} title="Add Plan" onClose={() => {setAddModal(false)}}>
                <Locked locked label="Purchase Gold plan to unlock">
                    <TextField placeholder="Name" />
                </Locked>
                <Locked locked label="Purchase Gold plan to unlock">
                    <MultiSlider className="mb-4" label="Calories distributuion" min={1} max={100} step={1} value={test} onChange={setTest} constaints={[10, 10, 10, 10]} colors={["bg-green-400", "bg-amber-400", "bg-violet-400", "bg-red-400"]} />
                </Locked>
                <Select className="mb-4 w-52" label="Select your goal" options={["Lose weight", "Eat healthy", "Gain weight"]} />
                <div className="bg-gray-200 rounded-lg shadow-inner">
                    <Tabs className=" w-[700px]" defaultTab={meals[0].name.toLowerCase()}>
                        <TabTriggers>
                            {meals.map((meal, index) => (
                                <TabTrigger tab={meal.name.toLowerCase()} key={index}>{meal.name} <FontAwesomeIcon className="ml-1" icon={meal.icon}/></TabTrigger>
                            ))}
                        </TabTriggers>
                        <TabsContent>
                            {meals.map((meal, index) => (
                                <TabContent key={index} tab={meal.name.toLowerCase()}>
                                    <div className="p-2 bg-white shadow rounded-xl">
                                        <RecipePicker icon={faBowlRice} placeholder="Recipes..." recipes={recipes} selected={selectedRecipes} setSelected={setSelectedRecipes} />
                                        <RecipeRecommendation selected={selectedRecipes} onAccept={addRecipe} recommendations={recipes} />
                                        <div className="flex flex-wrap h-40 gap-2 p-2 mt-5 overflow-y-auto border-2 border-gray-300 border-dashed rounded-lg shadow-inner no-track">
                                            {selectedRecipes.map((recipe, index) => (
                                                <div key={index} className="flex items-center gap-2 p-1 bg-gray-200 rounded-lg h-fit">
                                                    <img src={recipe.image} alt={recipe.name} className="w-5 h-5 rounded-full" />
                                                    <p className="my-0 text-xs font-bold">{recipe.name}</p>
                                                    <button onClick={() => {deleteRecipe(recipe)}} className="p-1 text-red-500 rounded-full hover:bg-red-500 hover:text-white">
                                                        <FontAwesomeIcon className="w-3 max-w-3 min-w-3" icon={faTrash} />
                                                    </button>
                                                </div>

                                            ))}
                                        </div>
                                    </div>
                                </TabContent>
                            ))}
                            
                        </TabsContent>
                    </Tabs>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <CancelButton onClick={() => {setAddModal(false)}} >Cancel</CancelButton>
                    <AcceptButton >Add</AcceptButton>
                </div>
            </Modal>
            <div className="w-full p-4 bg-white rounded-lg shadow dark:bg-neutral-900 dark:shadow-custom1">
                <div className="flex items-center justify-between px-5">
                    <h2 className="text-xl font-bold dark:text-white">My Plans</h2>
                    <AcceptButton onClick={() => {setAddModal(true)}}>Add Plan +</AcceptButton>
                </div>
                <div className="flex flex-col gap-3 p-3 m-2">
                    {demoPlans.map((plan, index) => (
                        <PlanCard plan={plan} key={index} />
                    ))}
                </div>
            </div>
        </>
    )
}
