import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import { TextArea, TextField, Toggle } from "../../components/formComponents";
import Modal from "../../components/modal";

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
    const [username, password] = [localStorage.getItem("username"), localStorage.getItem("password")];
    const [toggleStates, setToggleStates] = useState(platformSettings.map(setting => setting.enabled));
    const [informationEdit, setInformationEdit] = useState(false);
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");

    const setEnabled = (index, enabled) => {
        let newToggleStates = [...toggleStates];
        newToggleStates[index] = enabled;
        setToggleStates(newToggleStates);
    }

    useEffect(() => {
        fetch('http://localhost:8000/profile/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(username + ':' + password),
            },
        }).catch((error) => {
            console.error('Error:', error);
        }).then(response => response.json()).then(data => {
            setBio(data.bio);
            setLocation(data.location);
        })
    }, [username, password])

    function saveInformation(){
        fetch('http://localhost:8000/profile/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(username + ':' + password),
            },
            body: JSON.stringify({bio: bio, location: location})
        }).catch((error) => {
            console.error('Error:', error);
        }
        ).then(response => response.json()).then(data => {
            setBio(data.bio);
            setLocation(data.location);
        })
    }

    return (
        <>
            <Modal isOpen={informationEdit} onClose={() => setInformationEdit(false)}>
                <div className="flex flex-col gap-4 p-4">
                    <h2 className="font-bold">Edit profile information</h2>
                    <TextArea type="text" placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
                    <TextField type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                    <button className="p-2 text-white bg-green-400 rounded-lg" onClick={() => {saveInformation(); setInformationEdit(false)}}>Save</button>
                </div>
            </Modal>
            <div className="w-full p-4 mb-4 bg-white dark:bg-neutral-800 shadow dark:shadow-none rounded-xl">
                    <h2 className="font-bold dark:text-white ">Bio</h2>
                    <p className="text-sm text-gray-400">{bio}</p>
            </div>
            <div className="flex w-full gap-4">
                <div className="w-full p-4 bg-white dark:bg-neutral-800 shadow dark:shadow-none rounded-xl">
                    <h2 className="font-bold dark:text-white">Platform settings</h2>
                    <p className="text-sm font-bold text-gray-400">Account</p>
                    <div className="flex flex-col gap-2 m-2">
                        {platformSettings.map((setting, index) => (
                            <Toggle value={toggleStates[index]} onChange={(e) => {setEnabled(index, e)}} key={index}> {setting.name} </Toggle>
                        ))}
                    </div>
                </div>

                <div className="flex w-full gap-2 p-4 bg-white dark:bg-neutral-800 shadow rounded-xl ">
                    <div className="flex-col items-center w-full gap-2 m-2">
                        <div className="flex">
                            <h2 className="font-bold dark:text-white">Profile information</h2>
                            <FontAwesomeIcon onClick={() => {setInformationEdit(true)}} icon={faPen} className='h-4 p-1 ml-auto bg-white rounded shadow cursor-pointer justify-self-end hover:bg-gray-200' />
                        </div>
                        <div className="flex mt-4 text-sm text-gray-500 dark:text-gray-300"><p className="mr-auto font-semibold">Username:</p> Joe Doe</div>
                        <div className="flex mt-4 text-sm text-gray-500 dark:text-gray-300"><p className="mr-auto font-semibold">Email:</p> {username}</div>
                        <div className="flex mt-4 text-sm text-gray-500 dark:text-gray-300"><p className="mr-auto font-semibold">Location:</p> {location}</div>
                        <div className="flex mt-4 text-sm text-gray-500 dark:text-gray-300"><p className="mr-auto font-semibold">Registration date:</p> 34.23.1234</div>
                        
                    </div>
                    <div className="w-px h-full bg-gradient-to-b from-gray-400 to-white"></div>
                    <div className="flex flex-col w-full gap-2 m-2">
                        <div className="flex">
                            <h2 className="font-bold dark:text-white">Personal data</h2>
                            <FontAwesomeIcon icon={faPen} className='h-4 p-1 ml-auto bg-white rounded shadow cursor-pointer justify-self-end hover:bg-gray-200' />
                        </div>
                        <div className="flex mt-4 text-sm text-gray-500 dark:text-gray-300 dark:text-gray-300"><p className="mr-auto font-semibold">Height:</p> 183cm</div>
                        <div className="flex mt-4 text-sm text-gray-500 dark:text-gray-300"><p className="mr-auto font-semibold">Weight:</p> 85kg</div>
                        <div className="flex mt-4 text-sm text-gray-500 dark:text-gray-300"><p className="mr-auto font-semibold">Age:</p> 24 years</div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}