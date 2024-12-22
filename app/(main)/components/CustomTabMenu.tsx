import React, { useMemo } from 'react';
import { TabMenu as PrimeTabMenu, TabMenuTabChangeEvent } from 'primereact/tabmenu';
import { Tab } from '@/types/tab';


interface CustomTabMenuProps {
    model: Tab[]; // Use our Tab type
    activeItem?: Tab; // Optional activeItem
    activeIndex?: number; // Optional activeIndex
    onTabChange: (event: TabMenuTabChangeEvent) => void;
    scrollable?: boolean; // Add scrollable prop
}

const CustomTabMenu: React.FC<CustomTabMenuProps> = ({
    model,
    activeItem,
    activeIndex,
    onTabChange,
    scrollable = false,
}) => {
    const calculatedActiveIndex = useMemo(() => {
        if (activeItem) {
            return model.findIndex((tab) => tab.id === activeItem.id);
        }
        return activeIndex ?? 0; // Default to 0 if neither is provided
    }, [activeItem, activeIndex, model]);

    return (
        <div
            className={`custom-tabmenu-container ${scrollable ? 'scrollable' : ''}`}
            style={{ overflowX: scrollable ? 'auto' : 'visible', whiteSpace: 'nowrap' }}
        >
            <PrimeTabMenu
                model={model}
                activeIndex={calculatedActiveIndex}
                onTabChange={onTabChange}
            />
        </div>
    );
};

export default CustomTabMenu;