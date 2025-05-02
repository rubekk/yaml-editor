import React from 'react';
import { Card, FormField, Input, CollapsibleSection, DeleteButton, AddButton } from '../UiComponents';
import ActionEditor from './ActionEditor';
import ChildEditor from './ChildEditor';
import { ConfigItemType } from '../../lib/types';

interface ItemEditorProps {
    item: ConfigItemType;
    itemIndex: number;
    updateItem: (itemIndex: number, field: keyof ConfigItemType, value: any) => void;
    deleteItem: (itemIndex: number) => void;
    addChild: (itemIndex: number) => void;
    updateChild: (itemIndex: number, childIndex: number, field: keyof import('../../lib/types').ChildType, value: any) => void;
    deleteChild: (itemIndex: number, childIndex: number) => void;
    addAction: (itemIndex: number, childIndex: number | null) => void;
    updateAction: (
        itemIndex: number,
        childIndex: number | null,
        actionIndex: number,
        field: keyof import('../../lib/types').ActionType,
        value: any
    ) => void;
    deleteAction: (itemIndex: number, childIndex: number | null, actionIndex: number) => void;
    addResource: (itemIndex: number, childIndex: number | null, actionIndex: number) => void;
    updateResource: (
        itemIndex: number,
        childIndex: number | null,
        actionIndex: number,
        resourceIndex: number,
        field: keyof import('../../lib/types').ResourceType,
        value: any
    ) => void;
    deleteResource: (
        itemIndex: number,
        childIndex: number | null,
        actionIndex: number,
        resourceIndex: number
    ) => void;
}

const ItemEditor: React.FC<ItemEditorProps> = ({
    item,
    itemIndex,
    updateItem,
    deleteItem,
    addChild,
    updateChild,
    deleteChild,
    addAction,
    updateAction,
    deleteAction,
    addResource,
    updateResource,
    deleteResource
}) => {
    return (
        <CollapsibleSection
            key={itemIndex}
            title={item.name}
            rightElement={
                <DeleteButton onClick={() => deleteItem(itemIndex)} />
            }
        >
            <Card className="p-6 mb-8 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <FormField label="Name">
                        <Input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateItem(itemIndex, 'name', e.target.value)}
                        />
                    </FormField>
                    <FormField label="ID">
                        <Input
                            type="text"
                            value={item.id}
                            onChange={(e) => updateItem(itemIndex, 'id', e.target.value)}
                        />
                    </FormField>
                    <FormField label="Icon">
                        <Input
                            type="text"
                            value={item.icon}
                            onChange={(e) => updateItem(itemIndex, 'icon', e.target.value)}
                        />
                    </FormField>
                    <FormField label="Sequence">
                        <Input
                            type="number"
                            value={item.sequence}
                            onChange={(e) => updateItem(itemIndex, 'sequence', parseInt(e.target.value))}
                        />
                    </FormField>
                </div>

                <CollapsibleSection
                    title="Item Actions"
                    rightElement={
                        <AddButton onClick={() => addAction(itemIndex, null)}>
                            Add Action
                        </AddButton>
                    }
                >
                    {item.actions && item.actions.length > 0 ? (
                        item.actions.map((action, actionIndex) => (
                            <ActionEditor
                                key={actionIndex}
                                action={action}
                                actionIndex={actionIndex}
                                itemIndex={itemIndex}
                                childIndex={null}
                                updateAction={updateAction}
                                deleteAction={deleteAction}
                                addResource={addResource}
                                updateResource={updateResource}
                                deleteResource={deleteResource}
                            />
                        ))
                    ) : (
                        <div className="text-center py-4 text-muted-foreground text-sm">
                            No actions yet. Add one to get started.
                        </div>
                    )}
                </CollapsibleSection>

                <CollapsibleSection
                    title="Children"
                    rightElement={
                        <AddButton onClick={() => addChild(itemIndex)}>
                            Add Child
                        </AddButton>
                    }
                >
                    {item.children && item.children.length > 0 ? (
                        item.children.map((child, childIndex) => (
                            <ChildEditor
                                key={childIndex}
                                child={child}
                                childIndex={childIndex}
                                itemIndex={itemIndex}
                                updateChild={updateChild}
                                deleteChild={deleteChild}
                                addAction={addAction}
                                updateAction={updateAction}
                                deleteAction={deleteAction}
                                addResource={addResource}
                                updateResource={updateResource}
                                deleteResource={deleteResource}
                            />
                        ))
                    ) : (
                        <div className="text-center py-4 text-muted-foreground text-sm">
                            No children yet. Add one to get started.
                        </div>
                    )}
                </CollapsibleSection>
            </Card>
        </CollapsibleSection>
    );
};

export default ItemEditor;