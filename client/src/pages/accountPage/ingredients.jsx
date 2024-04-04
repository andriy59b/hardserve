import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons"

import { useState } from "react"
import Modal from "../../components/modal"
import { CancelButton, DeleteButton, AcceptButton } from "../../components/formComponents"

const demoIngredients = [
    {
        id: 1,
        name: "Apple",
        category: "Fruit",
        proteins: 0.3,
        fats: 0.2,
        carbs: 14,
        glycemic_index: 40,
        calories: 52,
        nutrients: [
            {
                name: "Vitamin C",
                amount: 10,
                units: "mg"
            },
            {
                name: "Vitamin A",
                amount: 5,
                units: "mg"
            },
            {
                name: "Vitamin B",
                amount: 2,
                units: "mg"
            },
        ]
    },
    {
        id: 2,
        name: "Banana",
        category: "Fruit",
        proteins: 1.1,
        fats: 0.3,
        carbs: 23,
        glycemic_index: 51,
        calories: 96,
        nutrients: [
            {
                name: "Vitamin C",
                amount: 10,
                units: "mg"
            },
            {
                name: "Vitamin A",
                amount: 5,
                units: "mg"
            },
            {
                name: "Vitamin B",
                amount: 2,
                units: "mg"
            },
        ]
    },
    {
        id: 3,
        name: "Orange",
        category: "Fruit",
        proteins: 1.2,
        fats: 0.2,
        carbs: 12,
        glycemic_index: 43,
        calories: 49,
        nutrients: [
            {
                name: "Vitamin C",
                amount: 10,
                units: "mg"
            },
            {
                name: "Vitamin A",
                amount: 5,
                units: "mg"
            },
            {
                name: "Vitamin B",
                amount: 2,
                units: "mg"
            },
        ]
    },
]

function IngredientCard({ingredient}){
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [detailsModal, setDetailsModal] = useState(false);

    return (
        <div className="relative flex items-center p-2 bg-transparent bg-white shadow-lg w-fit rounded-xl">

            <Modal isOpen={deleteModal} title={`Delete ${ingredient.name}`} onClose={() => {setDeleteModal(false)}}>
                <p>Are you sure you want to delete {ingredient.name}?</p>
                <div className="flex justify-end gap-2 mt-4">
                    <CancelButton onClick={() => {setDeleteModal(false)}} >Cancel</CancelButton>
                    <DeleteButton>Delete</DeleteButton>
                </div>
            </Modal>

            <Modal isOpen={detailsModal} title={`${ingredient.name} details`} onClose={() => {setDetailsModal(false)}}>
                <div className="w-full h-56 p-4 overflow-y-scroll min-w-fit">
                    <h3 className="text-2xl font-medium text-gray-600">Nutritional Information</h3>
                    <h4>Product description</h4>
                    <br />
                    {ingredient.nutrients.map((nutrient, index) => {
                        return (
                            <div className={"flex flex-row justify-between " + (index % 2 === 0 ? "bg-gray-200" : "")}>
                                <p>{nutrient.name}</p>
                                <p>{nutrient.amount} {nutrient.units}</p>
                            </div>
                        )

                        })
                    }
                </div>
            </Modal>

            <img className="w-32 rounded-lg" src="https://via.placeholder.com/150" alt="Ingredient" />
            <div className="flex flex-col items-center">
                
                <div className="flex items-center gap-2">
                    <h3 onClick={() => {setDetailsModal(true)}} className="text-xl font-bold cursor-pointer">{ingredient.name}</h3>
                    <p className="bg-transparent macro-badge-purple">{ingredient.category}</p>
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
                <div className="flex items-center justify-center w-full gap-2 px-2">
                    <p className="p-1 text-xs text-green-500 rounded-md cursor-pointer hover:text-green-700"><FontAwesomeIcon icon={faPen} /> EDIT</p>
                    <p onClick={() => {setDeleteModal(true)}} className="p-1 text-xs text-red-500 rounded-md cursor-pointer hover:text-red-700"><FontAwesomeIcon icon={faTrash} /> DELETE</p>
                </div>
            </div>
            {/* <div className="w-full p-2 bg-transparent border-2 border-b-indigo-500 border-t-transparent border-r-transparent border-l-transparent">
                <p>Vitamins: {ingredient.vitamins?.join(", ")}</p>
                <p>Allergens: {ingredient.allergens?.join(", ")}</p>
            </div> */}
        </div>
    );
}

export default function Ingredients() {
    return (
        <div className="w-full p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between px-5">
                <h2 className="text-xl font-bold">My Ingredients</h2>
                <AcceptButton>Add Ingredient +</AcceptButton>
            </div>
            <div className="flex flex-wrap gap-2 p-3 m-2 bg-gray-300 shadow-inner justify-evenly rounded-2xl">
                {demoIngredients.map((ingredient, index) => (
                    <IngredientCard ingredient={ingredient} key={index} />
                ))}
                
            </div>
        </div>
    )
}