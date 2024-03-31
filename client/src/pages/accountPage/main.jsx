import React from 'react';
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

export default function AccountPage() {
    return (
        <div className="">
            <Navbar />
            <Tabs defaultTab="dashboard">
                <TabTriggers>
                    <TabTrigger tab="dashboard"><FontAwesomeIcon icon={faChartSimple} className='m-1' />Dashboard</TabTrigger>
                    <TabTrigger tab="plans"><FontAwesomeIcon icon={faList} className='m-1' />Nutrition Plans</TabTrigger>
                    <TabTrigger tab="recipes"><FontAwesomeIcon icon={faUtensils} className='m-1' />Recipes</TabTrigger>
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
                    <TabContent tab="recipes">
                        <h2>Recipes</h2>
                        <p>Recipes content</p>
                    </TabContent>
                    <TabContent tab="ingredients">
                        <h2>Ingredients</h2>
                        <p>Ingredients content</p>
                    </TabContent>
                    <TabContent tab="settings">
                        <Settings />
                    </TabContent>
                </TabsContent>
            </Tabs>
        </div>
    )
}