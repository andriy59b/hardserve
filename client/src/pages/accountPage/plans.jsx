import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faCheck, faBowlRice, faMugSaucer, faBurger } from "@fortawesome/free-solid-svg-icons"

import { useState, useEffect } from "react"

import Modal from "../../components/modal"
import { TextField, TextArea, AcceptButton, CancelButton, DeleteButton, Select, RecipePicker, RecipeRecommendation, MultiSlider, Locked, PopUpChat } from "../../components/formComponents"
import { Tabs, TabTriggers, TabTrigger, TabsContent, TabContent } from "../../components/tabs"


function PlanCard({ plan, refreshPlans }) {

    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [detailsModal, setDetailsModal] = useState(false);

    function deletePlan() {
        setDeleteModal(false);
        fetch(`http://localhost:8000/ration/basic/profile/${plan.id}/`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ':' + localStorage.getItem("password")),
            }
        })
        refreshPlans();
    }

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
                    <DeleteButton onClick={deletePlan}>Delete</DeleteButton>
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
                </div>
                { !plan.selected &&
                <p className="h-5 text-xs cursor-pointer dark:text-white dark:hover:text-gray-600 hover:text-gray-400 w-fit"><FontAwesomeIcon icon={faCheck}/> FOLLOW</p>}
            </div>
        </div>
    )
}

export function BasicPlanCard({plan, refreshPlans, added}) {
    const [detailsModal, setDetailsModal] = useState(false);
    const [planDetails, setPlanDetails] = useState({components: []});

    useEffect(() => {
            plan.components = plan.components.map((component, index) => {
                component.meal_time = component.meal_time.toLowerCase();
                let promises = component.recipe.map((recipe, index) => {
                    return new Promise((resolve) => {
                        fetch(`http://localhost:8000/recipes/${recipe}/`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        }).then(response => response.json()).then(data => {
                            data.recipe.image = data.recipe.image.replace("http://localhost:8000/media/", "").replace("%3A", ":/");
                            resolve(data.recipe);
                        })
                    })
                })
                Promise.all(promises).then((recipes) => {
                    component.recipe = recipes;
                })
                return component;
            })
            setPlanDetails(plan);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function followPlan(){
        fetch(`http://localhost:8000/ration/basic/profile/${plan.id}/`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(localStorage.getItem("username") + ':' + localStorage.getItem("password")),
            }
        }).then(response => response.json()).then(data => {
            console.log(data);
        })
        refreshPlans();
    }

    return (
        <>
            <Modal isOpen={detailsModal} title={`${plan.name} plan`} onClose={() => {setDetailsModal(false)}}>
                <div className="flex flex-col gap-2">
                    {planDetails.components.map((component, index) => (
                        <div key={index} className="px-6 py-3 bg-[#F8F9FA] dark:bg-neutral-800 min-h-20 h-fit rounded-xl">
                            <div>
                                <p className="font-bold dark:text-white">{component.meal_time}</p>
                            </div>
                            <div className="flex flex-col items-center h-full gap-2">
                                {component.recipe.map((recipe, index) => (
                                    <div key={index} className="flex items-center gap-2 p-1 bg-gray-200 rounded-lg h-fit">
                                        <img src={recipe.image} alt={recipe.name} className="w-5 h-5 rounded-full" />
                                        <p className="my-0 text-xs font-bold">{recipe.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                
            </Modal>
            <div className="flex justify-between gap-2 px-6 py-3 bg-[#F8F9FA] dark:bg-neutral-800 min-h-20 h-fit rounded-xl">
                <div className="cursor-pointer" onClick={() => {setDetailsModal(true)}} >
                    <p className="font-bold dark:text-white">{plan.name}</p>
                </div>
                <div className="flex items-center h-full gap-2">
                    {!added && <AcceptButton onClick={followPlan} className="h-10">Add + </AcceptButton>}
                </div>
            </div>
        </>
    )

}

export default function Plans() {
    const [username, password] = [localStorage.getItem("username"), localStorage.getItem("password")]
    const [addModal, setAddModal] = useState(false);
    const [selectedRecipes, setSelectedRecipes] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [basicPlans, setBasicPlans] = useState([]);
    const [addedPlans, setAddedPlans] = useState([]);
    const [messages, setMessages] = useState(["Hello I'm your digital assistant. I can provide you with any dietary advice. Just type any question and i'll try to answer it."]);

    useEffect(() => {
        fetch("http://localhost:8000/ration/basic",
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(username + ':' + password),
            }
        }).then(response => response.json()).then(data => {
            setBasicPlans(data);
        })
    }, [username, password])

    function getMyPlans(){
        setTimeout(() => {
            fetch("http://localhost:8000/ration/basic/profile/",
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(username + ':' + password),
                }
            }).then(response => response.json()).then(data => {
                setAddedPlans(data);
            })
        }, 1500)
    }

    useEffect(() => {
        getMyPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

    function onSend(message) {
        setMessages([...messages, message]);
        fetch("http://localhost:8000/ration/query-openai/?prompt="+message,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(username + ':' + password),
            }
        }).then(response => response.json()).then(data => {
            setMessages([...messages, message, data.response]);
        })
    }

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
            <div className="w-full p-4 mb-10 bg-white rounded-lg shadow dark:bg-neutral-900 dark:shadow-custom1">
                <h1 className="text-2xl font-bold dark:text-white">Check out our plans</h1>
                <div className="flex flex-col gap-3 p-3 m-2">
                    {basicPlans.map((plan, index) => (
                        <BasicPlanCard plan={plan} added={addedPlans.map((plan) => plan.id).includes(plan.id)} refreshPlans={getMyPlans} key={index} />
                    ))}
                </div>
            </div>
            <div className="w-full p-4 bg-white rounded-lg shadow dark:bg-neutral-900 dark:shadow-custom1">
                <div className="flex items-center justify-between px-5">
                    <h2 className="text-xl font-bold dark:text-white">My Plans</h2>
                    <Locked locked label="Purchase Premium plan to unlock">
                        <AcceptButton onClick={() => {setAddModal(true)}}>Create Plan +</AcceptButton>
                    </Locked>
                </div>
                <div className="flex flex-col gap-3 p-3 m-2">
                    {addedPlans.map((plan, index) => (
                        <PlanCard plan={plan} refreshPlans={getMyPlans} key={index} />
                    ))}
                </div>
            </div>

            <div className="w-full p-4 mt-10 bg-white rounded-lg shadow dark:bg-neutral-900 dark:shadow-custom1">
                <PopUpChat className="" messages={messages} onSend={onSend} />
            </div>
        </>
    )
}
