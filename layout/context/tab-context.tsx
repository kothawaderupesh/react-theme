// context/TabContext.tsx
'use client';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Tab {
    id: string;
    title: string;
    path: string;
    closable?: boolean;
    content: ReactNode;
}

interface TabContextType {
    tabs: Tab[];
    activeTab: string;
    removeTab: (tabId: string) => void;
    setActiveTab: (tabId: string) => void;
    openNewTab: (path: string, title: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tabs, setTabs] = useState<Tab[]>([]);
    const [activeTab, setActiveTab] = useState<string>('');
    const router = useRouter();

    const addTab = (tab: Tab) => {
        setTabs((prev) => {
            const exists = prev.find((t) => t.id === tab.id);
            if (!exists) return [...prev, tab];
            return prev;
        });
        setActiveTab(tab.id);
    };

    const removeTab = (tabId: string) => {
        let _tabs = tabs.filter((tab) => tab.id !== tabId);
        setTabs(_tabs);
        if (tabId === activeTab && _tabs.length > 0) {
            openTab(_tabs[0]);
        } if (_tabs.length === 0) {
            router.push('/');
        }
    };

    const openNewTab = (path: string, title: string) => {
        addTab({
            id: path,
            title,
            path,
            closable: true,
            content: <div>{title} Content</div>,
        });
        router.push(path);
    };

    const openTab = (tab: Tab) => {
        setActiveTab(tab.id);
        router.push(tab.path);
    };

    return (
        <TabContext.Provider value={{ tabs, activeTab, removeTab, setActiveTab, openNewTab }}>
            {children}
        </TabContext.Provider>
    );
};

export const useTabContext = () => {
    const context = useContext(TabContext);
    if (!context) throw new Error('useTabContext must be used within a TabProvider');
    return context;
};