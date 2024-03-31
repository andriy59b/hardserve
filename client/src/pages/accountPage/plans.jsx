import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPen, faCheck } from "@fortawesome/free-solid-svg-icons"


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
    return (
        <div className="flex justify-between gap-2 px-6 py-3 bg-white shadow min-h-20 h-fit rounded-xl">
            <div>
                <p className="font-bold">
                    {plan.name}
                    {plan.selected && <span className="text-xs text-green-400"> - Following</span>}
                </p>
                <p>{plan.description}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
                <div className="flex gap-1 text-center">
                    <a className="h-5 text-xs text-red-600 cursor-pointer hover:text-gray-400 w-fit"><FontAwesomeIcon icon={faTrash}/> DELETE</a>
                    <a className="h-5 text-xs cursor-pointer hover:text-gray-400 w-fit"><FontAwesomeIcon icon={faPen}/> EDIT</a>
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
                <p className="text-xl font-bold">My Plans</p>
                <button className="px-4 py-2 font-bold text-white bg-green-400 rounded-lg hover:bg-green-600">Add Plan +</button>
            </div>
            <div className="flex flex-col gap-2 p-3 m-2 bg-gray-300 shadow-inner rounded-2xl">
                {demoPlans.map((plan, index) => (
                    <PlanCard plan={plan} key={index} />
                ))}
            </div>
        </div>
    )
}
