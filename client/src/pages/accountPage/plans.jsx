import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPen, faCheck } from "@fortawesome/free-solid-svg-icons"

import { useState } from "react"

import Modal from "../../components/modal"
import { TextField, TextArea, AcceptButton, CancelButton, DeleteButton } from "../../components/formComponents"

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
        <div className="flex justify-between gap-2 px-6 py-3 bg-[#F8F9FA] min-h-20 h-fit rounded-xl">
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
                <p className="font-bold">
                    {plan.name}
                    {plan.selected && <span className="text-xs text-green-400"> - Following</span>}
                </p>
                <p>{plan.description}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="flex gap-1 text-center">
                    <a onClick={() => {setDeleteModal(true)}} className="h-5 text-xs text-red-500 cursor-pointer hover:text-red-700 w-fit"><FontAwesomeIcon icon={faTrash}/> DELETE</a>
                    <a onClick={() => {setEditModal(true)}} className="h-5 text-xs text-green-500 cursor-pointer hover:text-green-700 w-fit"><FontAwesomeIcon icon={faPen}/> EDIT</a>
                </div>
                { !plan.selected &&
                <a className="h-5 text-xs cursor-pointer hover:text-gray-400 w-fit"><FontAwesomeIcon icon={faCheck}/> FOLLOW</a>}
            </div>
        </div>
    )
}

export default function Plans() {

    return (
        <div className="w-full p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between px-5">
                <h2 className="text-xl font-bold">My Plans</h2>
                <AcceptButton>Add Plan +</AcceptButton>
            </div>
            <div className="flex flex-col gap-3 p-3 m-2">
                {demoPlans.map((plan, index) => (
                    <PlanCard plan={plan} key={index} />
                ))}
            </div>
        </div>
    )
}
