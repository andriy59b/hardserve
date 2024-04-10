import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export function TextField({label, type, name, value, onChange, placeholder, className, id}) {
    return (
        <div className={"flex flex-col " + className}>
            <label>{label}</label>
            <input type={type} value={value} name={name} onChange={onChange} id={id} placeholder={placeholder} className="p-2 border-2 border-gray-300 rounded-lg shadow-inner focus:ring-0 focus:border-green-500"/>
        </div>
    )
}

export function TextArea({label, value, onChange, placeholder, className, id}) {
    return (
        <div className={"flex flex-col " + className}>
            <label>{label}</label>
            <textarea value={value} onChange={onChange} id={id} placeholder={placeholder} className="w-full p-2 rounded-lg shadow-inner ring-2 ring-gray-300 max-h-96 min-h-10 focus:ring-green-500 focus:ring-2"/>
        </div>
    )
}

export function NumberField({label, value, onChange, placeholder, name, className, id, min, max}) {
    return (
        <div className={"flex flex-col gap-2 " + className}>
            <label>{label}</label>
            <input type="number" min={min} max={max} value={value} name={name} onChange={onChange} id={id} placeholder={placeholder} className="p-2 border-2 border-gray-300 rounded-lg shadow-inner focus:ring-0 focus:border-green-500"/>
        </div>
    )
}

export function SearchBar({value, onChange, placeholder, className, id}) {
    return (
        <div className={"group h-10 p-2 flex ring-2 ring-gray-300 rounded-xl shadow-inner focus-within:ring-green-500 " + className}>
            <input type="text" value={value} onChange={onChange} id={id} placeholder={placeholder} className="p-0 border-none rounded-none focus:ring-0 h-fit caret-green-500"/>
            <FontAwesomeIcon className="h-6 text-gray-300 group-focus-within:text-green-500" icon={faMagnifyingGlass} />
        </div>
    )
}

export function Toggle({value, onChange, className, id, children}) {
    const [state, setState] = useState(value || false);
    onChange = onChange || setState;
    value = value !== undefined ? value : state;
    return (
        <div className="flex gap-2" id={id}>
            <div onClick={() => {onChange(!value)}} className={" cursor-pointer rounded-full h-5 min-w-9 max-w-9 toggle " + (value ? "bg-green-400 shadow shadow-green-300" : "bg-gray-400")}>
                <div className={" shadow-inner transition-all rounded-full m-0.5 h-4 w-4 toggle-button bg-white " + (value ? " translate-x-4" : "")}></div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export function CheckBox({label, value, onChange, className, id, name}) {
    return (
        <div className={"flex gap-2 " + className}>
            <input type="checkbox" checked={value} onChange={onChange} id={id} name={name} className="w-5 h-5 m-0 text-green-500 bg-white border-gray-300 rounded-md shadow-inner cursor-pointer focus:ring-green-500"/>
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

export function Select({label, options, value, onChange, className, id}) {
    return (
        <div className={"flex flex-col " + className}>
            <label>{label}</label>
            <select value={value} onChange={onChange} id={id} className="p-2 border-2 border-gray-300 rounded-lg focus:border-green-500">
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export function MultiSelect({options, selected, setSelected, className, placeholder, prefix}) {
    return (
        <div className={"flex flex-col " + className}>
            <label>{placeholder}</label>
            <div className="flex flex-wrap gap-1">
                {options.map((option, index) => (
                    <button key={index} onClick={() => {
                        if(selected.includes(option)){
                            setSelected(selected.filter((item) => item !== option));
                        } else {
                            setSelected([...selected, option]);
                        }
                    }} className={"p-1 text-xs rounded-full " + (selected.includes(option) ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700")}>{prefix}{option}</button>
                ))}
            </div>
        </div>
    )
}

export function CancelButton({onClick, className, children}) {
    return (
        <button onClick={onClick} className={"px-4 py-2 font-bold text-white bg-gray-500 rounded-lg hover:bg-gray-700 " + className}>{children}</button>
    )
}

export function AcceptButton({onClick, className, children}) {
    return (
        <button onClick={onClick} className={"px-4 py-2 font-bold text-white bg-green-400 rounded-lg hover:bg-green-700 " + className}>{children}</button>
    )
}

export function DeleteButton({onClick, className, children}) {
    return (
        <button onClick={onClick} className={"px-4 py-2 font-bold text-white bg-red-500 rounded-lg hover:bg-red-700 " + className}>{children}</button>
    )
}