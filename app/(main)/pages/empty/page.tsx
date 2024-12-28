'use client';
import React from 'react';

import { TreeNode } from 'primereact/treenode';
import TreeCrud from '../../components/TreeCrud';

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

    const handleCreate = (node: TreeNode, parentKey: string | null) => {
        console.log('Node created:', node, 'Parent Key:', parentKey);
    };

    const handleUpdate = (node: TreeNode) => {
        console.log('Node updated:', node);
    };

    const handleDelete = (nodeKey: string) => {
        console.log('Node deleted with key:', nodeKey);
    };

    return (
        <div>
            <h1>Tree CRUD Example</h1>
            <TreeCrud
                initialData={initialTreeData}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default Home;