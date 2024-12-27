'use client';
import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { useRouter } from 'next/navigation';
import { useTabContext } from './context/tab-context';

interface TabManagerProps {
        children: React.ReactNode;
}

const TabManager: React.FC<TabManagerProps> = ({ children }) => {
        const { tabs, activeTab, setActiveTab, removeTab } = useTabContext();
        const router = useRouter();

        const handleTabChange = (e: any) => {
                const selectedTab = tabs[e.index];
                if (selectedTab) {
                        router.push(selectedTab.path);
                        setActiveTab(selectedTab.id);
                }
        };

        const handleTabClose = (tabId: string) => {
                removeTab(tabId);
        };

        return (
                tabs.length > 0 && (
                        <TabView
                                activeIndex={tabs.findIndex((tab) => tab.id === activeTab)}
                                onTabChange={handleTabChange}
                        >
                                {tabs.map((tab) => (
                                        <TabPanel
                                                key={tab.id}
                                                header={
                                                        <span style={{ display: 'flex', alignItems: 'center' }}>
                                                                {tab.title}
                                                                <i
                                                                        className="pi pi-times"
                                                                        style={{ marginLeft: '8px', cursor: 'pointer' }}
                                                                        onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleTabClose(tab.id);
                                                                        }}
                                                                ></i>
                                                        </span>
                                                }
                                        >
                                                <div className="layout-main">
                                                        {tab.id === activeTab ? children : tab.content}
                                                </div>
                                        </TabPanel>
                                ))}
                        </TabView>)
        );
};

export default TabManager;