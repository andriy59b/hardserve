import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./navbar.css";

import "../App";


const access_token = localStorage.getItem('access_token');

const elements = (
    <>
        <li>
            <a className="dark:text-[#fefdfd]" href="/">Home</a>           
        </li>
        <li>
            <a className="dark:text-[#fefdfd]" href="/about">About Us</a>
        </li>
        <li>
            <a className="dark:text-[#fefdfd]" href="/blog">Blog</a>
        </li>
        <li>
            <a className="dark:text-[#fefdfd]" href="/recipes">Recipes</a>
        </li>
        <li>
            <a className="dark:text-[#fefdfd]" href="/ingredients">Ingredients</a>
        </li>
        <li>
            {access_token ? <a href="/account" className="login-button text-[#696969] dark:text-[#346D75] border-2 border-[#696969] dark:border-[#346D75] rounded-md">Account</a> : <a href="/login" className="login-button text-[#696969] dark:text-[#346D75] border-2 border-[#696969] dark:border-[#346D75] rounded-md">Log In</a>}
        </li>
        <li>
        
        </li>
    </>
)


export default function Navbar({darkMode, toggleDarkMode}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={`${darkMode && "dark"}`} >
        <nav id="nav" className=" min-w-screen max-w-screen bg-[#fefdfd] dark:bg-neutral-900">
            <button className="logo-section" onClick={() => {window.location.href = '/';}}>
                <img src="/icons/logo.svg" alt="logo" className="logo"  />
                <h1 className="logo-text dark:text-[#fefdfd]">Ration</h1>
            </button>
            <div className="hamburger dark:text-[#fefdfd]" onClick={() => {setIsOpen(!isOpen)}}>
                <FontAwesomeIcon icon={ faBars } />
            </div>
            <ul className="ml-auto links min-w-fit max-w-fit w-fit dark:bg-neutral-900 ">
                {elements}
            </ul>
            <div className={"mobile-menu bg-[#fefdfd] dark:bg-neutral-900 " + (isOpen ? "enabled" : "")}>
                <ul>
                    {elements}
                </ul>
            </div>

            <div class="flex flex-col justify-center ml-3" onClick={toggleDarkMode}>
            <input type="checkbox" name="light-switch" class="light-switch sr-only" />
            <label class="relative cursor-pointer p-2" for="light-switch">
                <svg class="dark:hidden" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                    <path class="fill-slate-300" d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z" />
                    <path class="fill-slate-400" d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z" />
                </svg>
                <svg class="hidden dark:block" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                    <path class="fill-slate-400" d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z" />
                    <path class="fill-slate-500" d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z" />
                </svg>
                <span class="sr-only">Switch to light / dark version</span>
            </label>
        </div>
            
        </nav>
        </div>
    );
}