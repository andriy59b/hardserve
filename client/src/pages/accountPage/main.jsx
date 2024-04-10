import React, { useEffect, useState } from 'react';
import { 
        Tabs, 
        TabTriggers, 
        TabTrigger,
        TabsContent,
        TabContent,
    } from '../../components/tabs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faUtensils, faBowlRice, faGear, faList } from '@fortawesome/free-solid-svg-icons';

import Navbar from '../../components/navbar';

import UserBar from './userbar';
import Settings from './settings';
import Dashboard from './dashboard';
import Plans from './plans';
import Ingredients from './ingredients';
import Modal from '../../components/modal';

export default function AccountPage() {

    const [invalidAuthOpen, setInvalidAuthOpen] = useState(false);

    const access_token = localStorage.getItem('access_token');
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    if (!access_token || !username || !password) {
        window.location.href = '/login';
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
            if (data.detail) {
                setInvalidAuthOpen(true);
            }
            console.log(data);
        })
    })

    return (
        <div className="">
            <Modal isOpen={invalidAuthOpen}>
            <div className="flex flex-col gap-4">
                <p>Sorry invalid auth data, please re-login</p>
                <button className='p-2 text-white bg-green-400 rounded-lg' onClick={() => {
                    window.location.href = '/login';
                }
                }>Log In</button>
            </div> 
            </Modal>
            <Navbar />
            <Tabs defaultTab="dashboard">
                <TabTriggers>
                    <TabTrigger tab="dashboard"><FontAwesomeIcon icon={faChartSimple} className='m-1' />Dashboard</TabTrigger>
                    <TabTrigger tab="plans"><FontAwesomeIcon icon={faList} className='m-1' />Nutrition Plans</TabTrigger>
                    <TabTrigger tab="ingredients"><FontAwesomeIcon icon={faBowlRice} className='m-1' />Ingredients</TabTrigger>
                    <TabTrigger tab="settings"><FontAwesomeIcon icon={faGear} className='m-1' />Settings</TabTrigger>
                </TabTriggers>
                <TabsContent>
                    <UserBar />
                    <TabContent tab="dashboard">
                        <Dashboard />
                    </TabContent>
                    <TabContent tab="plans">
                        <Plans />
                    </TabContent>
                    <TabContent tab="ingredients">
                        <Ingredients />
                    </TabContent>
                    <TabContent tab="settings">
                        <Settings />
                    </TabContent>
                </TabsContent>
            </Tabs>
        </div>
    )
}