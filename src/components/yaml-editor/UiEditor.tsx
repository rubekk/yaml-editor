import React from 'react';
import { AlertCircle, Maximize, Minimize } from 'lucide-react';
import { AddButton, Card } from '../UiComponents';
import ItemEditor from './ItemEditor';
import { ConfigItemType, FullscreenModeType } from '../../lib/types';

interface UIEditorProps {
    config: ConfigItemType[];
    fullscreenMode: FullscreenModeType;
    toggleFullscreen: (mode: 'text' | 'ui') => void;
    addItem: () => void;
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

const UIEditor: React.FC<UIEditorProps> = ({
    config,
    fullscreenMode,
    toggleFullscreen,
    addItem,
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
        <div className="relative h-full">
            <div className="absolute top-2 right-2 z-10">
                <button
                    onClick={() => toggleFullscreen('ui')}
                    className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-muted transition-colors"
                >
                    {fullscreenMode === 'ui' ? <Minimize size={18} /> : <Maximize size={18} />}
                </button>
            </div>
            <div className="h-full overflow-auto pb-10">
                <div className="flex justify-end mb-4">
                    <AddButton onClick={addItem}>Add New Item</AddButton>
                </div>

                {config.map((item, itemIndex) => (
                    <ItemEditor
                        key={itemIndex}
                        item={item}
                        itemIndex={itemIndex}
                        updateItem={updateItem}
                        deleteItem={deleteItem}
                        addChild={addChild}
                        updateChild={updateChild}
                        deleteChild={deleteChild}
                        addAction={addAction}
                        updateAction={updateAction}
                        deleteAction={deleteAction}
                        addResource={addResource}
                        updateResource={updateResource}
                        deleteResource={deleteResource}
                    />
                ))}

                {config.length === 0 && (
                    <Card className="text-center p-12 flex flex-col items-center justify-center min-h-[300px]">
                        <AlertCircle className="text-muted-foreground h-12 w-12 mb-4" />
                        <p className="text-muted-foreground mb-4">No configuration items yet.</p>
                        <AddButton onClick={addItem}>Add New Item</AddButton>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default UIEditor;