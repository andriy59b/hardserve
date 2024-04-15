
import Navbar from "../components/navbar"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faReact } from "@fortawesome/free-brands-svg-icons"

import dj from "./django.svg"

const teamMembers = [
    {
        name: "Vladyslav Vybyranyi",
        role: "Frontend Developer",
        description: "FEI-21",
        img: "https://via.placeholder.com/150"
    },
    {
        name: "Yurii Zborivskyi",
        role: "Backend Developer",
        description: "FEI-21",
        img: "https://via.placeholder.com/150"
    },
    {
        name: "Mykyta Nykytuk",
        role: "Database Developer",
        description: "FEI-21",
        img: "https://via.placeholder.com/150"
    },
    {
        name: "Andrii Vovk",
        role: "Database Developer",
        description: "FEI-21",
        img: "https://via.placeholder.com/150"
    },
    {
        name: "Maksym Pavliv",
        role: "Backend Developer",
        description: "FEI-21",
        img: "https://via.placeholder.com/150"
    },
    {
        name: "Andrii Pentsak",
        role: "Frontend Developer",
        description: "",
        img: "https://via.placeholder.com/150"
    },
]

export default function About() {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center w-10/12 mx-auto text-center">
                <h1 className="p-2 mt-10 mb-5 text-5xl font-bold text-transparent h-fit w-fit bg-clip-text bg-gradient-to-br from-green-500 to-indigo-500">About The Project</h1>
                <p className="text-2xl">This is a project for the 2021-2022 school year at the <b className=" text-emerald-500">Lviv National University of Ivan Franko</b> for <b className="text-transparent bg-gradient-to-r from-cyan-500 to-indigo-500 bg-clip-text">SoftServe Educational Team Project</b>.
                    It is a website that allows users to create their healthy nutrition plan.
                    Users can also favorite recipes and ingredients, and view their favorite items on their account page.
                    Users can also update their profile information and change their settings on their account page. 
                    Project was built using <b className="text-sky-500"><FontAwesomeIcon icon={ faReact } /> React</b> for the frontend and <b className="text-green-600 "><img className="inline h-6 translate-y-1 select-none" src={ dj } alt="dj"/> Django</b> for backend.
                </p>
                
                <h1 className="p-2 mt-10 mb-5 text-5xl font-bold text-transparent h-fit w-fit bg-clip-text bg-gradient-to-br from-sky-500 to-green-500">About Our Team</h1>
                <div className="flex flex-wrap justify-center gap-4 mb-10 ">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="flex flex-col items-center p-4 bg-white shadow-md w-60 rounded-xl">
                            <img src={member.img} alt={member.name} className="rounded-xl w-36 h-36"/>
                            <h2 className="mt-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-sky-500">{member.name}</h2>
                            <p className="text-lg">{member.role}</p>
                            <p className="p-4">{member.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}