import { MenuItem } from 'primereact/menuitem';

export interface Tab extends MenuItem {
    id: string;
    url: string;
}

export interface Tab1 {
    id: number;
    label: string; // `label` corresponds to TabMenu's `label`
    icon: string;  // `icon` corresponds to TabMenu's `icon`
    url: string;   // Custom property for routing
}