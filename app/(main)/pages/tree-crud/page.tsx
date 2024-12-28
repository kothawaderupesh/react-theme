import React from 'react';

import { TreeNode } from 'primereact/treenode';
import TreeCrud from '../../components/TreeCrudWithPopup';

const Home = () => {
    const initialTreeData: TreeNode[] = [
        {
            key: '1',
            label: 'Root Node',
            children: [
                { key: '1-1', label: 'Child Node 1' },
                { key: '1-2', label: 'Child Node 2' },
            ],
        },
    ];

    return (
        <div>
            <TreeCrud initialData={initialTreeData} />
        </div>
    );
};

export default Home;