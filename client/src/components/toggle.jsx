
export default function Toggle({enabled, setEnabled, children}) {
    return (
        <div className="flex gap-2">
            <div onClick={() => {setEnabled(!enabled)}} className={" cursor-pointer rounded-full h-5 min-w-9 max-w-9 toggle " + (enabled ? "bg-green-400 shadow shadow-green-300" : "bg-gray-400")}>
                <div className={" shadow-inner transition-all rounded-full m-0.5 h-4 w-4 toggle-button bg-white " + (enabled ? " translate-x-4" : "")}></div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}