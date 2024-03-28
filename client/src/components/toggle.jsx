
export default function Toggle({enabled, setEnabled, children}) {
    return (
        <div className="flex gap-2">
            <div onClick={() => {setEnabled(!enabled)}} className={" cursor-pointer rounded-full h-5 w-10 toggle " + (enabled ? "bg-green-400 shadow shadow-green-300" : "bg-gray-400")}>
                <div className={" shadow-inner transition-all rounded-full h-5 w-5 toggle-button bg-white " + (enabled ? " translate-x-5" : "")}></div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}