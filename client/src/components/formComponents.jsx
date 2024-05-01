import { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot, faMagnifyingGlass, faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

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

export function NumberField({label, value, onChange, placeholder, name, className, id, min, max, defaultValue}) {
    return (
        <div className={"flex flex-col gap-2 " + className}>
            <label>{label}</label>
            <input type="number" min={min} max={max} value={value} name={name} defaultValue={defaultValue} onChange={onChange} id={id} placeholder={placeholder} className="p-2 border-2 border-gray-300 rounded-lg shadow-inner focus:ring-0 focus:border-green-500"/>
        </div>
    )
}

export function SearchBar({value, onChange, placeholder, className, id, darkMode}) {
    return (
        <div className={`${darkMode && "dark"}`} >
        <div className={"group h-10 p-2 flex ring-2 dark:bg-neutral-900 ring-gray-300 rounded-xl shadow-inner focus-within:ring-green-500 " + className}>
            <input type="text" value={value} onChange={onChange} id={id} placeholder={placeholder} className="p-0 border-none dark:bg-neutral-900 dark:text-[#fefdfd] rounded-none focus:ring-0 h-fit caret-green-500"/>
            <FontAwesomeIcon className="h-6 text-gray-300  group-focus-within:text-green-500" icon={faMagnifyingGlass} />
        </div>
        </div>
    )
}

export function Toggle({value, onChange, className, id, children}) {
    const [state, setState] = useState(value || false);
    onChange = onChange || setState;
    value = value !== undefined ? value : state;
    return (
        <div className="flex gap-2 dark:text-white" id={id}>
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
            <input type="checkbox" checked={value} onChange={onChange} id={id} name={name} className="w-5 h-5 m-0 text-green-500 border-gray-300 rounded-md shadow-inner cursor-pointer focus:ring-green-500"/>
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

export function TriStateCheckBox({label, value, onChange, className, id}) {
    const values = [true, false, null];

    const nextValue = () => {
        const index = values.indexOf(value);
        onChange(values[(index + 1) % values.length]);
    }

    let icon = value === true ? faPlus : value === false ? faMinus : faXmark;

    let color = value === true ? "bg-green-500" : value === false ? "bg-red-500" : "bg-gray-300";

    return (
        <div onClick={nextValue} className={"flex items-center gap-2 " + className}>
            <div type="checkbox" className={"w-5 h-5 m-0 flex justify-center transition-colors items-center border-gray-300 text-white rounded-md shadow-inner cursor-pointer " + color}>
                <FontAwesomeIcon icon={icon} />
            </div>
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

export function Select({label, options, value, onChange, className, id}) {
    return (
        <div className={"flex flex-col " + className}>
            <label>{label}</label>
            <select value={value} onChange={onChange} id={id} className="p-2 rounded-lg ring-2 ring-gray-300 focus:ring-2 focus:ring-green-500">
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
        <button onClick={onClick} className={"px-4 py-2 font-bold text-white dark:text-neutral-900 bg-green-400 rounded-lg hover:bg-green-700 " + className}>{children}</button>
    )
}

export function DeleteButton({onClick, className, children}) {
    return (
        <button onClick={onClick} className={"px-4 py-2 font-bold text-white bg-red-500 rounded-lg hover:bg-red-700 " + className}>{children}</button>
    )
}

export function IngredientPicker({ingredients, selected, setSelected, className}) {
    const [prompt, setPrompt] = useState("");
    const [active, setActive] = useState(false);
    const [filteredIngredients, setFilteredIngredients] = useState(ingredients);
    const ref = useRef()

    const handleClick = (event) => {
        if(!ref.current || !ref.current.contains(event.target)){
            setActive(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        }
    }, []);

    useEffect(() => {
        setFilteredIngredients(ingredients.filter((ingredient) => {
            if (!ingredient.name) return false;
            if (!prompt) return true;
            return ingredient.name.includes(prompt.toLowerCase()) || !prompt
        }).filter((ingredient) => selected.map((item) => item.product_id).indexOf(ingredient.product_id) === -1));
    }, [prompt, ingredients, selected]);

    return (
        <div ref={ref} className={"relative flex flex-col gap-2 " + className}>
            <div className={"h-10 z-10 bg-white p-2 flex border-solid border-2 rounded-xl duration-100 transition-all shadow-inner " + (active ? "border-green-500 rounded-b-none" : "border-gray-300 delay-150")}>
                <input type="text" onFocus={() => {setActive(true)}} value={prompt} onChange={(e) => {setPrompt(e.target.value)}} placeholder="Ingredients..." className="h-full p-0 border-none rounded-none focus:ring-0 caret-green-500"/>
                <FontAwesomeIcon onClick={() => setActive(!active)} className={"h-full cursor-pointer duration-150 transition-all " + (active ? "-rotate-45 text-green-500" : " text-gray-300")} icon={faCarrot} />
            </div>
            <div className={"absolute z-50 p-2 overflow-y-scroll shadow-inner transition-all duration-150 rounded-b-xl border-solid border-t-0 border-2 border-green-500 no-scrollbar bg-white w-full pt-1 top-10 flex flex-col gap-1 " + (active ? " delay-100 visible max-h-60" : " invisible max-h-0")}>
                {filteredIngredients.map((ingredient, index) => (
                    <div key={index} onClick={() => {setSelected([...selected, ingredient])}} className={"p-1 flex items-center text-xs rounded-full " + (selected.includes(ingredient) ? "bg-green-500 text-white" : "bg-gray-100 text-gray-700")}>
                        <img src={ingredient.image} alt={ingredient.name} className="inline-block w-6 h-6 mr-1 rounded-full"/>
                        {ingredient.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export function BadgeToggle({value, onChange, className, id, children}) {
    const [state, setState] = useState(value || false);
    onChange = onChange || setState;
    value = value !== undefined ? value : state;
    return (
        <div id={id} onClick={() => {onChange(!value)}} className={"bg-white rounded-md hover:bg-gray-200 px-2 py-0.5 text-sm font-semibold cursor-pointer w-fit " + (value ? "text-green-500 " : "text-gray-500 ") + className}>
            {children}
        </div>
    )
}