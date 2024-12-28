'use client';
import React, { useState } from 'react';
import { Tree } from 'primereact/tree';
import { TreeNode } from 'primereact/treenode';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

type TreeCrudProps = {
    initialData: TreeNode[];
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

    // Dialog states
    const [showDialog, setShowDialog] = useState(false);
    const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'delete' | null>(
        null
    );
    const [currentNodeKey, setCurrentNodeKey] = useState<string | null>(null);
    const [nodeLabel, setNodeLabel] = useState<string>('');

    const openDialog = (
        mode: 'add' | 'edit' | 'delete',
        key: string | number | undefined,
        label: string = ''
    ) => {
        setDialogMode(mode);
        setCurrentNodeKey(key);
        setNodeLabel(label);
        setShowDialog(true);
    };

    const handleAddNode = () => {
        const newNode: TreeNode = {
            key: `${Date.now()}`,
            label: nodeLabel,
            children: [],
        };

        const updatedNodes = currentNodeKey
            ? nodes.map((node) =>
                updateChildNode(node, currentNodeKey, (child) => ({
                    ...child,
                    children: [...(child.children || []), newNode],
                }))
            )
            : [...nodes, newNode];

        setNodes(updatedNodes);
        onCreate?.(newNode, currentNodeKey);
        setShowDialog(false);
        setNodeLabel('');
    };

    const handleUpdateNode = () => {
        const updatedNodes = nodes.map((node) =>
            updateChildNode(node, currentNodeKey as string, (child) => ({
                ...child,
                label: nodeLabel,
            }))
        );

        setNodes(updatedNodes);
        onUpdate?.(
            updatedNodes.find((node) => node.key === currentNodeKey) as TreeNode
        );
        setShowDialog(false);
        setNodeLabel('');
    };

    const handleDeleteNode = () => {
        const updatedNodes = nodes.filter(
            (node) => !findNodeByKey(node, currentNodeKey as string)
        );
        setNodes(updatedNodes);
        onDelete?.(currentNodeKey as string);
        setShowDialog(false);
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
                    onClick={() => openDialog('add', node.key)}
                />
                <Button
                    icon="pi pi-pencil"
                    className="p-button-text"
                    title="Edit"
                    onClick={() => openDialog('edit', node.key, node.label as string)}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-text p-button-danger"
                    title="Delete"
                    onClick={() => openDialog('delete', node.key)}
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

    const dialogFooter = (
        <div>
            {dialogMode === 'add' && (
                <Button label="Add" icon="pi pi-check" onClick={handleAddNode} />
            )}
            {dialogMode === 'edit' && (
                <Button label="Save" icon="pi pi-check" onClick={handleUpdateNode} />
            )}
            {dialogMode === 'delete' && (
                <Button
                    label="Delete"
                    icon="pi pi-trash"
                    className="p-button-danger"
                    onClick={handleDeleteNode}
                />
            )}
            <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-button-text"
                onClick={() => setShowDialog(false)}
            />
        </div>
    );

    return (
        <div>
            <Tree
                value={nodes}
                nodeTemplate={nodeTemplate}
                selectionMode="single"
                selectionKeys={selectedNodeKey}
                onSelectionChange={(e) => setSelectedNodeKey(e.value as string | null)}
            />

            <Dialog
                header={
                    dialogMode === 'add'
                        ? 'Add Node'
                        : dialogMode === 'edit'
                            ? 'Edit Node'
                            : 'Delete Node'
                }
                visible={showDialog}
                footer={dialogFooter}
                onHide={() => setShowDialog(false)}
            >
                {dialogMode !== 'delete' && (
                    <div className="p-field">
                        <label htmlFor="nodeLabel">Label</label>
                        <InputText
                            id="nodeLabel"
                            value={nodeLabel}
                            onChange={(e) => setNodeLabel(e.target.value)}
                            autoFocus
                        />
                    </div>
                )}
                {dialogMode === 'delete' && (
                    <p>Are you sure you want to delete this node?</p>
                )}
            </Dialog>
        </div>
    );
};

export default TreeCrud;