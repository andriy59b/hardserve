import React from 'react';
import ReactDOM from 'react-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const modal = document.getElementById("modal");

export default function Modal({children, isOpen, onClose, title, className}) {
    return (
    ReactDOM.createPortal(
        <div className={"z-50 fixed top-0 left-0 w-screen h-screen bg-black flex justify-center items-center " + (isOpen ? "bg-opacity-50 " : "hidden ")}>
            <div className={"max-w-4xl p-4 bg-white rounded-lg max-h-[90vh] shadow min-w-36 " + className}>
                <h1 className="pr-8 text-lg font-bold">{title}</h1>
                <FontAwesomeIcon icon={faX} className="absolute top-0 right-0 h-4 p-1 m-2 text-white bg-red-500 rounded-md cursor-pointer aspect-square" onClick={onClose}/>
                <div className='p-2 overflow-y-scroll no-scrollbar'>
                    {children}
                </div>
            </div>
        </div>
        ,modal
    ))
}