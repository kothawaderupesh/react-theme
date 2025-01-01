import React, { useState } from 'react';
import { Tree } from 'primereact/tree';
import { TreeNode } from 'primereact/treenode';
import { Button } from 'primereact/button';

type TreeCrudProps = {
    initialData: TreeNode[]; // Initial tree data
    onCreate?: (node: TreeNode, parentKey: string | null) => void;
    onUpdate?: (node: TreeNode) => void;
    onDelete?: (nodeKey: string) => void;
};

const TreeCrud: React.FC<TreeCrudProps> = ({
    initialData,
    onCreate,
    onUpdate,
    onDelete,
}) => {
    const [nodes, setNodes] = useState<TreeNode[]>(initialData);
    const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);

    const addNode = (parentKey: string | null) => {
        const newNode: TreeNode = {
            key: `${Date.now()}`,
            label: 'New Node',
            children: [],
        };

        const updatedNodes = parentKey
            ? nodes.map((node) =>
                updateChildNode(node, parentKey, (child) => ({
                    ...child,
                    children: [...(child.children || []), newNode],
                }))
            )
            : [...nodes, newNode];

        setNodes(updatedNodes);
        onCreate?.(newNode, parentKey);
    };

    const updateNode = (key: string) => {
        const updatedLabel = prompt('Enter new label:', 'Updated Node');
        if (!updatedLabel) return;

        const updatedNodes = nodes.map((node) =>
            updateChildNode(node, key, (child) => ({ ...child, label: updatedLabel }))
        );

        setNodes(updatedNodes);
        onUpdate?.(
            updatedNodes.find((node) => node.key === key) as TreeNode
        );
    };

    const deleteNode = (key: string) => {
        const updatedNodes = removeNodeByKey(nodes, key as string);
        setNodes(updatedNodes);
        onDelete?.(key as string);
    };

    const removeNodeByKey = (nodeList: TreeNode[], key: string): TreeNode[] => {
        const updatedNodeList = nodeList.map((node) => {
            if (node.key === key) {
                return null;
            }
            if (node.children) {
                node.children = removeNodeByKey(node.children, key);
            }
            return node;
        }).filter((node) => node !== null) as TreeNode[];
        return updatedNodeList;
    };

    const updateChildNode = (
        node: TreeNode,
        key: string,
        updateFn: (node: TreeNode) => TreeNode
    ): TreeNode => {
        if (node.key === key) return updateFn(node);
        if (node.children) {
            return {
                ...node,
                children: node.children.map((child) =>
                    updateChildNode(child, key, updateFn)
                ),
            };
        }
        return node;
    };

    const findNodeByKey = (node: TreeNode, key: string): TreeNode | null => {
        if (node.key === key) return node;
        if (node.children) {
            for (let child of node.children) {
                const found = findNodeByKey(child, key);
                if (found) return found;
            }
        }
        return null;
    };

    const nodeTemplate = (node: TreeNode) => (
        <div className="node-wrapper">
            <span>{node.label}</span>
            <div className="node-actions">
                <Button
                    icon="pi pi-plus"
                    className="p-button-text"
                    title="Add"
                    onClick={() => addNode(node.key as string)}
                />
                <Button
                    icon="pi pi-pencil"
                    className="p-button-text"
                    title="Edit"
                    onClick={() => updateNode(node.key as string)}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-text p-button-danger"
                    title="Delete"
                    onClick={() => deleteNode(node.key as string)}
                />
            </div>
            <style jsx>{`
        .node-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .node-actions {
          visibility: hidden;
        }
        .node-wrapper:hover .node-actions {
          visibility: visible;
        }
      `}</style>
        </div>
    );

    return (
        <div>
            <h2>Tree CRUD with Hover Actions</h2>
            <Tree
                value={nodes}
                nodeTemplate={nodeTemplate}
                selectionMode="single"
                selectionKeys={selectedNodeKey}
                onSelectionChange={(e) => setSelectedNodeKey(e.value as string | null)}
            />
        </div>
    );
};

export default TreeCrud;