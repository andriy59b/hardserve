import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./navbar.css";

const access_token = localStorage.getItem('access_token');

const elements = (
    <>
        <li>
            <a href="/">Home</a>
        </li>
        <li>
            <a href="/about">About Us</a>
        </li>
        <li>
            <a href="/blog">Blog</a>
        </li>
        <li>
            <a href="/recipes">Recipes</a>
        </li>
        <li>
            <a href="/ingredients">Ingredients</a>
        </li>
        <li>
            {access_token ? <a href="/account" className="login-button">Account</a> : <a href="/login" className="login-button">Log In</a>}
        </li>
    </>
)

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav id="nav" className="min-w-screen max-w-screen">
            <button className="logo-section" onClick={() => {window.location.href = '/';}}>
                <img src="/icons/logo.svg" alt="logo" className="logo"  />
                <h1 className="logo-text">Ration</h1>
            </button>
            <div className="hamburger" onClick={() => {setIsOpen(!isOpen)}}>
                <FontAwesomeIcon icon={ faBars } />
            </div>
            <ul className="ml-auto links min-w-fit max-w-fit w-fit">
                {elements}
            </ul>
            <div className={"mobile-menu " + (isOpen ? "enabled" : "")}>
                <ul>
                    {elements}
                </ul>
            </div>
        </nav>
    );
}