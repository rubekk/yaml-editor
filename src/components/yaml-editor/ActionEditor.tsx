import React from 'react';
import { Card, DeleteButton, FormField, Input, CollapsibleSection, AddButton } from '../UiComponents';
import ResourceEditor from './ResourceEditor';
import { ActionType } from '../../lib/types';

interface ActionEditorProps {
    action: ActionType;
    actionIndex: number;
    itemIndex: number;
    childIndex: number | null;
    updateAction: (
        itemIndex: number,
        childIndex: number | null,
        actionIndex: number,
        field: keyof ActionType,
        value: any
    ) => void;
    deleteAction: (
        itemIndex: number,
        childIndex: number | null,
        actionIndex: number
    ) => void;
    addResource: (
        itemIndex: number,
        childIndex: number | null,
        actionIndex: number
    ) => void;
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

const ActionEditor: React.FC<ActionEditorProps> = ({
    action,
    actionIndex,
    itemIndex,
    childIndex,
    updateAction,
    deleteAction,
    addResource,
    updateResource,
    deleteResource
}) => {
    return (
        <Card className="p-4 mb-3 border-secondary hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-center mb-2">
                <h6 className="font-medium text-md">{action.name}</h6>
                <DeleteButton
                    small
                    onClick={() => deleteAction(itemIndex, childIndex, actionIndex)}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormField label="Code">
                    <Input
                        type="text"
                        value={action.code}
                        onChange={(e) => updateAction(
                            itemIndex,
                            childIndex,
                            actionIndex,
                            'code',
                            e.target.value
                        )}
                    />
                </FormField>
                <FormField label="Name">
                    <Input
                        type="text"
                        value={action.name}
                        onChange={(e) => updateAction(
                            itemIndex,
                            childIndex,
                            actionIndex,
                            'name',
                            e.target.value
                        )}
                    />
                </FormField>
            </div>
            <CollapsibleSection
                title="Resources"
                rightElement={
                    <AddButton onClick={() => addResource(itemIndex, childIndex, actionIndex)}>
                        Add Resource
                    </AddButton>
                }
            >
                {action.resources && action.resources.length > 0 ? (
                    action.resources.map((resource, resourceIndex) => (
                        <ResourceEditor
                            key={resourceIndex}
                            resource={resource}
                            resourceIndex={resourceIndex}
                            itemIndex={itemIndex}
                            childIndex={childIndex}
                            actionIndex={actionIndex}
                            updateResource={updateResource}
                            deleteResource={deleteResource}
                        />
                    ))
                ) : (
                    <div className="text-center py-4 text-muted-foreground text-sm">
                        No resources yet. Add one to get started.
                    </div>
                )}
            </CollapsibleSection>
        </Card>
    );
};

export default ActionEditor;