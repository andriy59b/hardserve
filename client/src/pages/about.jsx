import Navbar from "../components/navbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons";

import dj from "./django.svg";

import andrii_v from "../components/img/Andrii_v.jpeg";
import andrii_p from "../components/img/Andrii_p.jpeg";
import vlad from "../components/img/Vlad.jpeg";
import yura from "../components/img/Yura.jpeg";
import mykyta from "../components/img/Mykyta.jpeg";
import maks from "../components/img/Maks.jpeg";



const teamMembers = [
  {
    name: "Vladyslav Vybyranyi",
    role: "Frontend Developer",
    description: "FEI-21",
    img: vlad,
  },
  {
    name: "Yurii Zborivskyi",
    role: "Backend Developer",
    description: "FEI-21",
    img: yura,
  },
  {
    name: "Mykyta Nykytiuk",
    role: "Database Developer",
    description: "FEI-21",
    img: mykyta,
  },
  {
    name: "Andrii Vovk",
    role: "Database Developer",
    description: "FEI-21",
    img: andrii_v,
  },
  {
    name: "Maksym Pavliv",
    role: "Backend Developer",
    description: "FEI-21",
    img: maks,
  },
  {
    name: "Andrii Pentsak",
    role: "Frontend Developer",
    description: "FEI-25",
    img: andrii_p,
  },
];

export default function About({darkMode, setDarkMode}) {
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode); // Зберігаємо нове значення в локальному сховищі
};
  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className={darkMode && "dark"}>
        <div className="flex flex-col items-center w-full mx-auto text-center dark:bg-neutral-900">
          <div className="w-10/12">
            <h1 className="text-4xl font-bold text-[#2d3748] mb-5 dark:text-white p-5">
              About The Project
            </h1>
            <p className="text-2xl font-light text-[#2d3748] mb-5 dark:text-white">
              This is a project for the 2023-2024 school year at the{" "}
              <b className="font-medium text-[#2d3748] dark:text-white">
                Lviv National University of Ivan Franko
              </b>{" "}
              for{" "}
              <b className="font-medium text-[#2d3748] dark:text-white">
                SoftServe Educational Team Project
              </b>
              . It is a website that allows users to create their healthy nutrition
              plan. Users can also favorite recipes and ingredients, and view their
              favorite items on their account page. Users can also update their
              profile information and change their settings on their account page.
              Project was built using{" "}
              <b className="text-sky-500">
                <FontAwesomeIcon icon={faReact} /> React
              </b>{" "}
              for the frontend and{" "}
              <b className="text-green-600 ">
                <img
                  className="inline h-6 translate-y-1 select-none"
                  src={dj}
                  alt="dj"
                />{" "}
                Django
              </b>{" "}
              for backend.
            </p>

            <h1 className="p-5 text-4xl font-bold text-[#2d3748] mb-5 dark:text-white">
              About Our Team
            </h1>
            <div className="flex flex-wrap justify-center gap-4 mb-10 ">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 bg-white shadow-md dark:bg-neutral-800 w-60 rounded-xl"
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    className="rounded-xl w-36 h-36"
                  />
                  <h2 className="mt-5 text-2xl font-bold text-[#2d3748] dark:text-white">
                    {member.name}
                  </h2>
                  <p className="text-lg dark:text-white">{member.role}</p>
                  <p className="p-1 font-medium dark:text-white">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
