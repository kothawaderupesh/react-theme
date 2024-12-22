'use client';
import { TabProvider } from '@/layout/context/tab-context';
import React from 'react';
import DynamicTabMenu from '../../components/DynamicTab';


const Home: React.FC = () => {
    return (
        <TabProvider>
            <div>
                <h1>Dynamic Tab Menu Example</h1>
                <p>This page demonstrates how to use the <strong>DynamicTabMenu</strong>.</p>

                {/* DynamicTabMenu Component */}
                <DynamicTabMenu />
            </div>
        </TabProvider>
    );
};

export default Home;