import React from 'react';
import { Card, DeleteButton, FormField, Input, CollapsibleSection, AddButton } from '../UiComponents';
import ActionEditor from './ActionEditor';
import { ChildType } from '../../lib/types';

interface ChildEditorProps {
    child: ChildType;
    childIndex: number;
    itemIndex: number;
    updateChild: (itemIndex: number, childIndex: number, field: keyof ChildType, value: any) => void;
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

const ChildEditor: React.FC<ChildEditorProps> = ({
    child,
    childIndex,
    itemIndex,
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
        <Card className="p-5 mb-5 shadow hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium">{child.name}</h4>
                <DeleteButton
                    onClick={() => deleteChild(itemIndex, childIndex)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                <FormField label="Name">
                    <Input
                        type="text"
                        value={child.name}
                        onChange={(e) => updateChild(itemIndex, childIndex, 'name', e.target.value)}
                    />
                </FormField>
                <FormField label="ID">
                    <Input
                        type="text"
                        value={child.id}
                        onChange={(e) => updateChild(itemIndex, childIndex, 'id', e.target.value)}
                    />
                </FormField>
                <FormField label="Icon">
                    <Input
                        type="text"
                        value={child.icon}
                        onChange={(e) => updateChild(itemIndex, childIndex, 'icon', e.target.value)}
                    />
                </FormField>
                <FormField label="Router">
                    <Input
                        type="text"
                        value={child.router}
                        onChange={(e) => updateChild(itemIndex, childIndex, 'router', e.target.value)}
                    />
                </FormField>
                <FormField label="Component">
                    <Input
                        type="text"
                        value={child.component}
                        onChange={(e) => updateChild(itemIndex, childIndex, 'component', e.target.value)}
                    />
                </FormField>
                <FormField label="Sequence">
                    <Input
                        type="number"
                        value={child.sequence}
                        onChange={(e) => updateChild(itemIndex, childIndex, 'sequence', parseInt(e.target.value))}
                    />
                </FormField>
            </div>

            <CollapsibleSection
                title="Child Actions"
                rightElement={
                    <AddButton onClick={() => addAction(itemIndex, childIndex)}>
                        Add Action
                    </AddButton>
                }
            >
                {child.actions && child.actions.length > 0 ? (
                    child.actions.map((action, actionIndex) => (
                        <ActionEditor
                            key={actionIndex}
                            action={action}
                            actionIndex={actionIndex}
                            itemIndex={itemIndex}
                            childIndex={childIndex}
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
        </Card>
    );
};

export default ChildEditor;