import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import Toggle from "../../components/toggle";

const platformSettings = [
    {
        name: "Email me when someone follows me",
        enabled: true
    },
    {
        name: "Email me when someone likes my post",
        enabled: false
    },
    {
        name: "Email me when someone comments on my post",
        enabled: false
    },
    {
        name: "Email me when someone mentions me in a post",
        enabled: true
    },
]


export default function Settings() {
    const [toggleStates, setToggleStates] = useState(platformSettings.map(setting => setting.enabled));

    const setEnabled = (index, enabled) => {
        let newToggleStates = [...toggleStates];
        newToggleStates[index] = enabled;
        setToggleStates(newToggleStates);
    }

    return (
        <div className="flex w-full gap-4">
            <div className="w-full p-4 bg-white rounded shadow">
                <h2 className="font-bold">Platform settings</h2>
                <p className="text-sm font-bold text-gray-400">Account</p>
                <div className="flex flex-col gap-2 m-2">
                    {platformSettings.map((setting, index) => (
                        <Toggle enabled={toggleStates[index]} setEnabled={(e) => {setEnabled(index, e)}} key={index}> {setting.name} </Toggle>
                    ))}
                </div>
            </div>

            <div className="flex w-full gap-2 p-4 bg-white rounded shadow ">
                <div className="flex-col items-center w-full gap-2 m-2">
                    <div className="flex">
                        <h2 className="font-bold">Profile information</h2>
                        <FontAwesomeIcon icon={faPen} className='h-4 p-1 ml-auto bg-white rounded shadow cursor-pointer justify-self-end hover:bg-gray-200' />
                    </div>
                    <div className="flex mt-4 text-sm text-gray-500"><p className="mr-auto font-semibold">Username:</p> Joe Doe</div>
                    <div className="flex mt-4 text-sm text-gray-500"><p className="mr-auto font-semibold">Email:</p> fdifngidufng@gmail.com</div>
                    <div className="flex mt-4 text-sm text-gray-500"><p className="mr-auto font-semibold">Location:</p> Ukraine</div>
                    <div className="flex mt-4 text-sm text-gray-500"><p className="mr-auto font-semibold">Registration date:</p> 34.23.1234</div>
                    
                </div>
                <div className="w-px h-full my-6 bg-gradient-to-b from-gray-400 to-white"></div>
                <div className="flex flex-col w-full gap-2 m-2">
                    <div className="flex">
                        <h2 className="font-bold">Personal data</h2>
                        <FontAwesomeIcon icon={faPen} className='h-4 p-1 ml-auto bg-white rounded shadow cursor-pointer justify-self-end hover:bg-gray-200' />
                    </div>
                    <div className="flex mt-4 text-sm text-gray-500"><p className="mr-auto font-semibold">Height:</p> 183cm</div>
                    <div className="flex mt-4 text-sm text-gray-500"><p className="mr-auto font-semibold">Weight:</p> 85kg</div>
                    <div className="flex mt-4 text-sm text-gray-500"><p className="mr-auto font-semibold">Age:</p> 24 years</div>
                    
                </div>
            </div>
        </div>
    )
}