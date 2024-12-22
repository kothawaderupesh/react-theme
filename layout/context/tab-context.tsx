'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Tab } from '@/types/tab';


interface TabContextProps {
    tabs: Tab[];
    activeTab: Tab;
    addTab: () => void;
    removeTab: (tabToRemove: Tab) => void;
    changeActiveTab: (tab: Tab) => void;
}

const TabContext = createContext<TabContextProps | undefined>(undefined);

export const TabProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [tabs, setTabs] = useState<Tab[]>([
        { id: '1', label: 'Home', icon: 'pi pi-home', url: '/' },
    ]);
    const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);

    const addTab = () => {
        const newId = `${tabs.length + 1}`;
        const newTab: Tab = {
            id: newId,
            label: `Page ${newId}`,
            icon: 'pi pi-file',
            url: `/page${newId}`,
        };
        setTabs([...tabs, newTab]);
        setActiveTab(newTab);
        router.push(newTab.url);
    };

    const removeTab = (tabToRemove: Tab) => {
        const updatedTabs = tabs.filter((tab) => tab.id !== tabToRemove.id);

        if (tabToRemove.id === activeTab.id) {
            const nextActiveTab = updatedTabs[updatedTabs.length - 1] || tabs[0];
            setActiveTab(nextActiveTab);
            router.push(nextActiveTab?.url || '/');
        }

        setTabs(updatedTabs);
    };

    const changeActiveTab = (tab: Tab) => {
        setActiveTab(tab);
        router.push(tab.url);
    };

    return (
        <TabContext.Provider value={{ tabs, activeTab, addTab, removeTab, changeActiveTab }}>
            {children}
        </TabContext.Provider>
    );
};

export const useTabContext = (): TabContextProps => {
    const context = useContext(TabContext);
    if (!context) {
        throw new Error('useTabContext must be used within a TabProvider');
    }
    return context;
};