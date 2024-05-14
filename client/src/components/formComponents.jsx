import { useEffect, useRef, useState } from "react";

import Markdown from 'react-markdown'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faMagnifyingGlass, faMinus, faPlus, faXmark, faPause, faLock, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

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
            <textarea value={value} onChange={onChange} id={id} placeholder={placeholder} className="w-full p-2 border-0 rounded-lg shadow-inner ring-2 ring-gray-300 max-h-96 min-h-10 focus:ring-green-500 focus:ring-2"/>
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
                <FontAwesomeIcon className="h-6 text-gray-300 group-focus-within:text-green-500" icon={faMagnifyingGlass} />
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
        <div className={"flex m-1 flex-col " + className}>
            <label className="text-xs mb-0.5 text-gray-500">{label}</label>
            <select value={value} onChange={onChange} id={id} className="p-2 border-0 rounded-lg ring-2 ring-gray-300 focus:ring-2 focus:ring-green-500">
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

export function IngredientPicker({ingredients, selected, setSelected, className, icon, placeholder = "Ingredients..."}) {
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
                <input type="text" onFocus={() => {setActive(true)}} value={prompt} onChange={(e) => {setPrompt(e.target.value)}} placeholder={placeholder} className="h-full p-0 border-none rounded-none focus:ring-0 caret-green-500"/>
                <FontAwesomeIcon onClick={() => setActive(!active)} className={"h-full cursor-pointer duration-150 transition-all " + (active ? "-rotate-45 text-green-500" : " text-gray-300")} icon={icon} />
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

export function RecipePicker({recipes, selected, setSelected, className, icon, placeholder = "Recipes..."}) {
    const [prompt, setPrompt] = useState("");
    const [active, setActive] = useState(false);
    const [filteredRecipes, setFilteredRecipes] = useState(recipes);
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
        setFilteredRecipes(recipes.filter((recipe) => {
            if (!recipe.name) return false;
            if (!prompt) return true;
            return recipe.name.toLowerCase().includes(prompt.toLowerCase()) || !prompt
        }).filter((recipe) => selected.map((item) => item.id).indexOf(recipe.id) === -1));
    }, [prompt, recipes, selected]);

    return (
        <div ref={ref} className={"relative flex flex-col gap-2 " + className}>
            <div className={"h-10 z-10 bg-white p-2 flex border-solid border-2 rounded-xl duration-100 transition-all shadow-inner " + (active ? "border-green-500 rounded-b-none" : "border-gray-300 delay-150")}>
                <input type="text" onFocus={() => {setActive(true)}} value={prompt} onChange={(e) => {setPrompt(e.target.value)}} placeholder={placeholder} className="h-full p-0 border-none rounded-none focus:ring-0 caret-green-500"/>
                <FontAwesomeIcon onClick={() => setActive(!active)} className={"h-full cursor-pointer duration-150 transition-all " + (active ? " text-green-500" : " text-gray-300")} icon={icon} />
            </div>
            <div className={"absolute z-50 p-2 overflow-y-scroll shadow-inner transition-all duration-150 rounded-b-xl border-solid border-t-0 border-2 border-green-500 no-scrollbar bg-white w-full pt-1 top-10 flex flex-col gap-1 " + (active ? " delay-100 visible max-h-60" : " invisible max-h-0")}>
                {filteredRecipes.map((recipe, index) => (
                    <div key={index} onClick={() => {setSelected([...selected, recipe])}} className={"p-1 flex items-center text-xs rounded-full " + (selected.includes(recipe) ? "bg-green-500 text-white" : "bg-gray-100 text-gray-700")}>
                        <img src={recipe.image} alt={recipe.name} className="inline-block w-6 h-6 mr-1 rounded-full"/>
                        {recipe.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export function RecipeRecommendation({recommendations, selected, onAccept, className}) {
    const [shift, setShift] = useState(0);
    const ref = useRef();

    //translate the card to the top
    function nextCard() {
        if (ref.current) {
            ref.current.style.transform = `translateY(-200%)`;
        }
        const timeout = setTimeout(() => {
            if (ref.current) {
                ref.current.style.transform = `translateY(0)`;
            }
            setShift(shift + 1);
        }, 300)
        return () => {
            clearTimeout(timeout);
        }
    }

    useEffect(() => {
        try{
            if (selected.map((item) => item.id).indexOf(recommendations[shift].id) !== -1){
                setShift(shift + 1);
            }
        } catch (e) {
            
        }
    }, [shift, selected, recommendations]);

    function discardRecommendation() {
        nextCard();
    }

    function acceptRecommendation() {
        nextCard();
        onAccept(recommendations[shift]);
    }

    if (recommendations.length <= shift) return null;

    return (
        <div className="overflow-hidden">
            <div ref={ref} className={"flex gap-2 p-1 m-2 bg-gray-200 transition-all rounded-lg shadow-md ring-gray-300 ring-2 " + className}>
                <img src={recommendations[shift].image} alt={recommendations[shift].name} className="w-5 h-5 rounded-lg"/>
                <p className="text-sm font-bold">{recommendations[shift].name}</p>
                <div className="flex gap-1 ml-auto ">
                    <button onClick={discardRecommendation} className="max-h-full px-2 py-0 text-red-500 rounded-lg bg-red-500/30 hover:bg-red-500 hover:text-white">
                        <FontAwesomeIcon className="w-3 max-w-3 min-w-3" icon={faXmark} />
                    </button>

                    <button onClick={acceptRecommendation} className="max-h-full px-2 py-0 text-green-500 rounded-lg bg-green-500/30 hover:bg-green-500 hover:text-white">
                        <FontAwesomeIcon className="w-3 max-w-3 min-w-3" icon={faCheck} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export function MultiSlider({value, onChange, min, max, constaints, colors, label, step, units = "%", className, id}) {
    const [state, setState] = useState(value || [min, max]);
    onChange = onChange || setState;
    value = value !== undefined ? value : state;

    const [handles, setHandles] = useState(value.map((val, index) => {
        if (index === value.length - 1) return undefined;
        return value.reduce((acc, val, i) => {
            if (i <= index) return acc + val;
            return acc;
        })
    }).filter((val) => val !== undefined));

    function setThumb(e, i){
        setHandles(handles.map((val, index) => {
            if (index === i) return Math.max(Math.min(parseInt(e.target.value), (handles[index + 1] || max) - (constaints[index+1] || 0)), (handles[index - 1] || min) + (constaints[index] || 0));
            return val;
        }))
    }

    useEffect(() => {
        let newValues = handles.map((val, index) => (
            val - (handles[index - 1] || min)
        ));
        newValues.push(max - handles[handles.length - 1]);
        onChange(newValues);
    }, [handles, onChange, min, max]);

    return (
        <>
            <label className="text-xs text-gray-500 ">{label}</label>
            <div className={"relative pb-5 " + className} id={id}>
                <div className={`relative flex h-5 ${colors[0]} rounded-lg shadow-inner`}>
                    <p style={{left: `${(handles[0] - min) / (max - min) * 50}%`}} className="absolute font-bold text-white">{value[0] + units}</p>
                    <div className="relative w-full mr-5">
                        {handles.map((val, index) => (
                            <div key={index} style={{left: `${(val - min) / (max - min) * 100}%`}} className="absolute z-10 w-5 h-5 bg-gray-100 rounded-lg pointer-events-none ring-2 ring-gray-300">
                                <FontAwesomeIcon className="absolute top-0 bottom-0 left-0 right-0 w-3 h-3 m-auto text-gray-300" icon={faPause} />
                            </div>
                        ))}
                        {handles.map((val, index) => (
                            <div key={index} style={{left: `${(val - min) / (max - min) * 100}%`, right: `${(max - (handles[index+1] || max)) / (max - min) * 100}%`}} className={`absolute z-0 h-5 text-center -mr-5 rounded-lg pointer-events-none text-white font-bold text-outline shadow-inner ${colors[index+1]}`}>
                                {value[index+1] + units}
                            </div>
                        ))}
                    </div>
                    
                    {handles.map((val, index) => (
                        
                        <input key={index} type="range" step={step} value={val} onChange={(e) => {setThumb(e, index)}} className="absolute z-0 w-full p-0 border-0 appearance-none pointer-events-none thumb-enabled "/>
                    ))}

                </div>
            </div>
        </>
    )
}

export function Locked({locked, label, children}) {
    return (
        <div className={locked ? "my-2 opacity-50 bg-gray-300 px-2 pt-2 rounded-lg shadow-lg locked" : ""}>
            {locked && <label className="text-xs text-gray-500"><FontAwesomeIcon icon={faLock}/> {label}</label>}
            <div className="flex flex-col items-center p-2">
                {children}
            </div>
        </div>
    )
}

export function Chat({messages, onSend, className, placeholder = "Type a message..."}){
    const [message, setMessage] = useState("");

    function sendMessage() {
        onSend(message);
        setMessage("");
    }

    return (
        <div className={"flex flex-col gap-2 " + className}>
            <div className="flex flex-col gap-2 p-2 overflow-y-auto bg-gray-200 rounded-lg shadow-inner dark:bg-gray-700 max-h-96">
                {messages.map((message, index) => (
                    <div key={index} className="p-2 bg-white rounded-lg shadow-md even:bg-green-400 dark:odd:bg-gray-800 dark:text-white">
                        <Markdown>{message}</Markdown>
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <input type="text" value={message} onChange={(e) => {setMessage(e.target.value)}} placeholder={placeholder} className="p-2 border-2 border-gray-300 rounded-lg shadow-inner dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-0 focus:border-green-500"/>
                <button onClick={sendMessage} className="h-full p-2 text-white bg-green-500 rounded-lg shadow-md aspect-square hover:bg-green-700">
                    <FontAwesomeIcon className="" icon={faPaperPlane} />
                </button>
            </div>
        </div>
    )
}