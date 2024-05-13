import Navbar from "../../components/navbar";

function SubscriptionCard({subscription}) {
    return (
        <div className={`flex flex-col h-96 w-64 justify-between gap-2 px-6 py-3 bg-[#F8F9FA] dark:bg-neutral-700 rounded-xl shadow-lg ${subscription.shadow}`}>
            <div className="cursor-pointer ">
                <p className="m-1 text-xl font-bold text-center dark:text-white">
                    {subscription.name}
                </p>
                <p className="mt-3 dark:text-white" >{subscription.description}</p>
            </div>
            {!subscription.active &&
                <div className="flex flex-col items-center gap-2">
                    <button className={`p-2 mb-2 ${subscription.button} w-full rounded-md text-white dark:text-neutral-700 text-md`}>Subscribe</button>
                </div>
            }
        </div>
    );
}

const subscriptions = [
    {
        name: "Basic",
        description: "Basic plan",
        active: true,
        button: "bg-green-500",
        shadow: "shadow-green-500",
    },
    {
        name: "Premium",
        description: "Premium plan",
        active: false,
        button: "bg-violet-500",
        shadow: "shadow-violet-500",
    },
    {
        name: "Gold",
        description: "Gold plan",
        active: false,
        button: "bg-yellow-500",
        shadow: "shadow-yellow-500",
    }

]

export default function Subscriptions({darkMode, setDarkMode}) {

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    return (
        <>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
            <div className={darkMode ? "dark w-screen" : ""}>
                <div className="w-full min-h-screen p-5 dark:bg-neutral-800 dark:text-white">
                    <h1 className="text-4xl font-bold text-center">Subscriptions</h1>
                    <div className="flex flex-col items-center justify-around w-full gap-10 mt-5 md:flex-row">
                        {subscriptions.map((subscription, index) => (
                            <SubscriptionCard key={index} subscription={subscription}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}