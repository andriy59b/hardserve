import React, { useState } from 'react';

export function Tabs({ children, defaultTab}) {
    const [currentTab, setCurrentTab] = useState(defaultTab);

    let tabTriggers = React.Children.map(children, (child) => {
        if (child.type.name === 'TabTriggers') {
            child = React.cloneElement(child, { tabUpdate: setCurrentTab, currentTab: currentTab});
            return child;
        }
    });

    let tabsContent = React.Children.map(children, (child) => {
        if (child.type.name === 'TabsContent') {
            child = React.cloneElement(child, { currentTab: currentTab });
            return child;
        }
    })

    return (
        <div className='flex'>
            <div className="p-4 tabs-triggers-block basis-3/12">
                {tabTriggers}
            </div>
            <div className="w-full p-4 tabs-content-block">
                {tabsContent}
            </div>
        </div>
    );
}

export function TabTriggers({ children, tabUpdate, currentTab }) {
    return (
        <div className="flex flex-col gap-2 mt-4">
            {children.map((child, i) => {
                if (child.type.name === 'TabTrigger') {
                    child = React.cloneElement(child, { tabUpdate: tabUpdate, currentTab: currentTab, key: i});
                }
                return child;
            })}
        </div>
    );
}

export function TabTrigger({ tabUpdate, currentTab, tab, children }) {
    return (
        <div className={"flex items-center p-2 cursor-pointer rounded-xl text-sm font-bold  " + (currentTab === tab ? "bg-white dark:text-white dark:bg-neutral-800 shadow" : "text-gray-400 ")} onClick={() => {tabUpdate(tab)}}>
            {children}
        </div>
    );
}

export function TabsContent({ children, currentTab }) {

    return (
        <div className="mr-2 tabs-content">
            {
                React.Children.map(children, (child) => {
                    if (child.type.name === 'TabContent'){
                        if (child.props.tab === currentTab)
                            return child;
                    }else
                        return child;
                })
            }
        </div>
    );
}

export function TabContent({ children, tab }) {
    return (
        <div className="tab-content">
            {children}
        </div>
    );
}
