import React, { useMemo } from 'react';
import { TabMenu as PrimeTabMenu, TabMenuTabChangeEvent } from 'primereact/tabmenu';
import { Tab } from '@/types/tab';


interface CustomTabMenuProps {
    model: Tab[];
    activeItem?: Tab;
    activeIndex?: number;
    onTabChange: (event: TabMenuTabChangeEvent) => void;
    onCloseTab: (tab: Tab) => void;
    scrollable?: boolean;
    themeColor?: string; // Optional theme color for highlighting
}

const CustomTabMenu: React.FC<CustomTabMenuProps> = ({
    model,
    activeItem,
    activeIndex,
    onTabChange,
    onCloseTab,
    scrollable = false,
    themeColor = '#007ad9', // Default theme color
}) => {
    const calculatedActiveIndex = useMemo(() => {
        if (activeItem) {
            return model.findIndex((tab) => tab.id === activeItem.id);
        }
        return activeIndex ?? 0;
    }, [activeItem, activeIndex, model]);

    // Render the tab with label and close button
    const renderTab = (tab: Tab, index: number) => {
        const isActive = index === calculatedActiveIndex;

        return (
            <div
                className={`custom-tab-header ${isActive ? 'active-tab' : ''}`}
                style={isActive ? { borderColor: themeColor, color: themeColor } : {}}
            >
                <span>{tab.label}</span>
                <button
                    className="close-btn"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering tab switch
                        onCloseTab(tab);
                    }}
                    title="Close Tab"
                >
                    <i className="pi pi-times"></i>
                </button>
            </div>
        );
    };

    // Customize each tab with a template
    const customizedModel = model.map((tab, index) => ({
        ...tab,
        template: renderTab(tab, index), // Add active state styling
    }));

    return (
        <div
            className={`custom-tabmenu-container ${scrollable ? 'scrollable' : ''}`}
            style={{ overflowX: scrollable ? 'auto' : 'visible', whiteSpace: 'nowrap' }}
        >
            <PrimeTabMenu
                model={customizedModel}
                activeIndex={calculatedActiveIndex}
                onTabChange={onTabChange}
            />
        </div>
    );
};

export default CustomTabMenu;