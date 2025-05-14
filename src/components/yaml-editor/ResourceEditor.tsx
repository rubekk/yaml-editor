import React from 'react';
import { Card, DeleteButton, FormField } from '../UiComponents';
import Select from 'react-select';
import { ResourceType } from '../../lib/types';
import { getRoutes } from '../../lib/api/routes';
import { useAuth } from '../../lib/AuthContext';

interface ResourceEditorProps {
    resource: ResourceType;
    resourceIndex: number;
    itemIndex: number;
    childIndex: number | null;
    actionIndex: number;
    updateResource: (
        itemIndex: number,
        childIndex: number | null,
        actionIndex: number,
        resourceIndex: number,
        field: keyof ResourceType,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: any
    ) => void;
    deleteResource: (
        itemIndex: number,
        childIndex: number | null,
        actionIndex: number,
        resourceIndex: number
    ) => void;
}

const ResourceEditor: React.FC<ResourceEditorProps> = ({
    resource,
    resourceIndex,
    itemIndex,
    childIndex,
    actionIndex,
    updateResource,
    deleteResource
}) => {
    const { logout } = useAuth()
    const [pathOptions, setPathOptions] = React.useState<{ label: string; value: string }[]>([])

    React.useEffect(() => {
        getRoutes().then(res => {
            if (res && res.data) {
                const options = res.data.map(item => {
                    return {
                        label: item.method + " " + item.path,
                        value: item.path
                    }
                })

                setPathOptions(options)
            }
            else logout()
        })

    }, [])

    return (
        <Card key={resourceIndex} className="p-3 mb-3 bg-muted/30 border-muted hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-sm">Resource {resourceIndex + 1}</span>
                <DeleteButton
                    small
                    onClick={() => deleteResource(itemIndex, childIndex, actionIndex, resourceIndex)}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <FormField label="Method">
                    <Select
                        value={resource.method}
                        onChange={(e) => updateResource(
                            itemIndex,
                            childIndex,
                            actionIndex,
                            resourceIndex,
                            'method',
                            e.target.value as ResourceType['method']
                        )}
                    >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                        <option value="PATCH">PATCH</option>
                    </Select>
                    <Select
                        options={[
                            { label: "GET", value: "GET" },
                            { label: "POST", value: "POST" },
                            { label: "PUT", value: "PUT" },
                            { label: "DELETE", value: "DELETE" },
                            { label: "PATCH", value: "PATCH" },
                        ]}
                        placeholder="Select a method"
                        onChange={(e) => updateResource(
                            itemIndex,
                            childIndex,
                            actionIndex,
                            resourceIndex,
                            'method',
                            e?.value
                        )}
                    />
                </FormField> */}
                <FormField label="Path">
                    {/* <Input
                        type="text"
                        value={resource.path}
                        onChange={(e) => updateResource(
                            itemIndex,
                            childIndex,
                            actionIndex,
                            resourceIndex,
                            'path',
                            e.target.value
                        )}
                    /> */}

                    <Select
                        options={pathOptions}
                        value={pathOptions.find(option => option.value === resource.path)} // ✅ Match by value
                        placeholder="Select a resource"
                        onChange={(e) => {
                            updateResource(
                                itemIndex,
                                childIndex,
                                actionIndex,
                                resourceIndex,
                                'method',
                                e?.label?.split(" ")[0]
                            )
                            updateResource(
                                itemIndex,
                                childIndex,
                                actionIndex,
                                resourceIndex,
                                'path',
                                e?.value
                            )
                        }}
                    />
                </FormField>
            </div>
        </Card>
    );
};

export default ResourceEditor;