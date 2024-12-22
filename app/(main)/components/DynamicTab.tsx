import React from 'react';
import { Button } from 'primereact/button';

import CustomTabMenu from './CustomTabMenu';
import { useTabContext } from '@/layout/context/tab-context';

const DynamicTabMenu: React.FC = () => {
    const { tabs, activeTab, addTab, removeTab, changeActiveTab } = useTabContext();

    const handleTabChange = (e: any) => {
        changeActiveTab(e.value);
    };

    const handleCloseTab = (tabToClose: any) => {
        removeTab(tabToClose);
    };

    return (
        <div>
            <div className="mb-3">
                <Button label="Add Tab" icon="pi pi-plus" className="mr-2" onClick={addTab} />
            </div>
            <div>
                <CustomTabMenu
                    model={tabs}
                    activeItem={activeTab}
                    onTabChange={handleTabChange}
                    onCloseTab={handleCloseTab} // Pass the close tab handler
                    scrollable
                />
            </div>
        </div>
    );
};

export default DynamicTabMenu;