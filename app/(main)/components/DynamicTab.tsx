import React from 'react';
import { Button } from 'primereact/button';
import CustomTabMenu from './CustomTabMenu';
import { useTabContext } from '@/layout/context/tab-context';
import { Tab } from '@/types/tab';

const DynamicTabMenu: React.FC = () => {
    const { tabs, activeTab, addTab, removeTab, changeActiveTab } = useTabContext();

    const handleTabChange = (e: any) => {
        changeActiveTab(e.value as Tab);
    };

    return (
        <div>
            <div className="mb-3">
                <Button label="Add Tab" icon="pi pi-plus" className="mr-2" onClick={addTab} />
                {activeTab && (
                    <Button
                        label="Remove Current Tab"
                        icon="pi pi-times"
                        className="p-button-danger"
                        onClick={() => removeTab(activeTab)}
                    />
                )}
            </div>
            <div className="tabmenu-scrollable" style={{ overflowX: 'auto' }}>
                <CustomTabMenu
                    model={tabs}
                    activeItem={activeTab}
                    onTabChange={handleTabChange}
                    scrollable
                />
            </div>
        </div>
    );
};

export default DynamicTabMenu;