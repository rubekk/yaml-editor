import React, { useState, useEffect } from 'react';
import yaml from 'yaml';
import {
    ResizablePanelGroup,
    ResizablePanel,
    ResizableHandle
} from "./Resizable";

import { ConfigItemType, TabType, FullscreenModeType } from '../lib/types';
import { defaultAction, defaultChild, defaultResource } from '../lib/utils';
import { ErrorMessage, TabButton } from './UiComponents';
import TextEditor from './yaml-editor/TextEditor';
import UIEditor from './yaml-editor/UiEditor';

const YamlEditor: React.FC = () => {
    const [yamlText, setYamlText] = useState<string>(`- name: BLOG
  id: blog
  icon: blog
  sequence: 600
  actions:
    - code: visible
      name: VISIBLE
  children:
    - name: BLOGS
      id: blog-blogs
      icon: blog
      router: "/blog"
      component: "blog/index"
      sequence: 6001
      actions:
        - code: add
          name: ADD
          resources:
            - method: POST
              path: "/api/v1/blogs"
        - code: edit
          name: EDIT
          resources:
            - method: GET
              path: "/api/v1/blogs"
            - method: PUT
              path: "/api/v1/blogs/:id"
        - code: delete
          name: DELETE
          resources:
            - method: DELETE
              path: "/api/v1/blogs/:id"
        - code: query
          name: QUERY
          resources:
            - method: GET
              path: "/api/v1/blogs"
    - name: BLOGS CATEGORY
      id: blog-category
      icon: blog
      router: "/blog_categories"
      component: "blog_categories/index"
      sequence: 6002
      actions:
        - code: add
          name: ADD
          resources:
            - method: POST
              path: "/api/v1/blog_categories"
        - code: edit
          name: EDIT
          resources:
            - method: GET
              path: "/api/v1/blog_categories"
            - method: PUT
              path: "/api/v1/blog_categories/:id"
        - code: delete
          name: DELETE
          resources:
            - method: DELETE
              path: "/api/v1/blog_categories/:id"
        - code: query
          name: QUERY
          resources:
            - method: GET
              path: "/api/v1/blogs"`);

    const [config, setConfig] = useState<ConfigItemType[]>([]);
    const [activeTab, setActiveTab] = useState<TabType>('split');
    const [error, setError] = useState<string | null>(null);
    const [fullscreenMode, setFullscreenMode] = useState<FullscreenModeType>('none');
    // Flag to prevent circular updates
    const [yamlFromUi, setYamlFromUi] = useState<boolean>(false);

    // Parse YAML when text changes
    useEffect(() => {
        try {
            if (yamlFromUi) {
                // Skip parsing when YAML was just set from the UI
                setYamlFromUi(false);
                return;
            }
            const parsedConfig = yaml.parse(yamlText) as ConfigItemType[];
            setConfig(parsedConfig);
            setError(null);
        } catch (e) {
            console.error("Error parsing YAML:", e);
            setError(`Error parsing YAML: ${e instanceof Error ? e.message : String(e)}`);
        }
    }, [yamlText, yamlFromUi]);

    // Update YAML text when config changes but only in UI mode
    useEffect(() => {
        if (activeTab === 'ui' || activeTab === 'split') {
            try {
                const newYamlText = yaml.stringify(config);
                // Set flag to prevent circular updates
                setYamlFromUi(true);
                setYamlText(newYamlText);
            } catch (e) {
                console.error("Error stringifying YAML:", e);
            }
        }
    }, [config, activeTab]);

    // CRUD operations
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateItem = (itemIndex: number, field: keyof ConfigItemType, value: any) => {
        setConfig(prev => {
            const newConfig = [...prev];
            newConfig[itemIndex] = {
                ...newConfig[itemIndex],
                [field]: value
            };
            return newConfig;
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateChild = (itemIndex: number, childIndex: number, field: keyof import('../lib/types').ChildType, value: any) => {
        setConfig(prev => {
            const newConfig = [...prev];
            newConfig[itemIndex].children[childIndex] = {
                ...newConfig[itemIndex].children[childIndex],
                [field]: value
            };
            return newConfig;
        });
    };

    const updateAction = (
        itemIndex: number,
        childIndex: number | null,
        actionIndex: number,
        field: keyof import('../lib/types').ActionType,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: any
    ) => {
        setConfig(prev => {
            const newConfig = [...prev];
            if (childIndex !== null) {
                newConfig[itemIndex].children[childIndex].actions[actionIndex] = {
                    ...newConfig[itemIndex].children[childIndex].actions[actionIndex],
                    [field]: value
                };
            } else {
                newConfig[itemIndex].actions[actionIndex] = {
                    ...newConfig[itemIndex].actions[actionIndex],
                    [field]: value
                };
            }
            return newConfig;
        });
    };

    const updateResource = (
        itemIndex: number,
        childIndex: number | null,
        actionIndex: number,
        resourceIndex: number,
        field: keyof import('../lib/types').ResourceType,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: any
    ) => {
        setConfig(prev => {
            const newConfig = [...prev];
            if (childIndex !== null) {
                newConfig[itemIndex].children[childIndex].actions[actionIndex].resources[resourceIndex] = {
                    ...newConfig[itemIndex].children[childIndex].actions[actionIndex].resources[resourceIndex],
                    [field]: value
                };
            } else {
                newConfig[itemIndex].actions[actionIndex].resources[resourceIndex] = {
                    ...newConfig[itemIndex].actions[actionIndex].resources[resourceIndex],
                    [field]: value
                };
            }
            return newConfig;
        });
    };

    const addItem = () => {
        setConfig(prev => [
            ...prev,
            {
                name: 'NEW ITEM',
                id: 'new-item',
                icon: 'default',
                sequence: 600,
                actions: [],
                children: []
            }
        ]);
    };

    const addChild = (itemIndex: number) => {
        setConfig(prev => {
            const newConfig = [...prev];
            newConfig[itemIndex].children.push(defaultChild());
            return newConfig;
        });
    };

    const addAction = (itemIndex: number, childIndex: number | null) => {
        setConfig(prev => {
            const newConfig = [...prev];
            if (childIndex !== null) {
                newConfig[itemIndex].children[childIndex].actions.push(defaultAction());
            } else {
                newConfig[itemIndex].actions.push(defaultAction());
            }

            console.log(prev)
            return newConfig;
        });
    };

    const addResource = (itemIndex: number, childIndex: number | null, actionIndex: number) => {
        setConfig(prev => {
            const newConfig = [...prev];
            if (childIndex !== null) {
                // Make sure actions array exists
                if (!newConfig[itemIndex].children[childIndex].actions) {
                    newConfig[itemIndex].children[childIndex].actions = [];
                }

                // Make sure the specific action exists
                if (!newConfig[itemIndex].children[childIndex].actions[actionIndex]) {
                    newConfig[itemIndex].children[childIndex].actions[actionIndex] = defaultAction();
                }

                // Initialize resources array if it doesn't exist
                if (!newConfig[itemIndex].children[childIndex].actions[actionIndex].resources) {
                    newConfig[itemIndex].children[childIndex].actions[actionIndex].resources = [];
                }

                newConfig[itemIndex].children[childIndex].actions[actionIndex].resources.push(defaultResource());
            } else {
                // Make sure actions array exists
                if (!newConfig[itemIndex].actions) {
                    newConfig[itemIndex].actions = [];
                }

                // Make sure the specific action exists
                if (!newConfig[itemIndex].actions[actionIndex]) {
                    newConfig[itemIndex].actions[actionIndex] = defaultAction();
                }

                // Initialize resources array if it doesn't exist
                if (!newConfig[itemIndex].actions[actionIndex].resources) {
                    newConfig[itemIndex].actions[actionIndex].resources = [];
                }

                newConfig[itemIndex].actions[actionIndex].resources.push(defaultResource());
            }
            return newConfig;
        });
    };

    const deleteItem = (itemIndex: number) => {
        setConfig(prev => prev.filter((_, index) => index !== itemIndex));
    };

    const deleteChild = (itemIndex: number, childIndex: number) => {
        setConfig(prev => {
            const newConfig = [...prev];
            newConfig[itemIndex].children = newConfig[itemIndex].children.filter((_, index) => index !== childIndex);
            return newConfig;
        });
    };

    const deleteAction = (itemIndex: number, childIndex: number | null, actionIndex: number) => {
        setConfig(prev => {
            const newConfig = [...prev];
            if (childIndex !== null) {
                newConfig[itemIndex].children[childIndex].actions =
                    newConfig[itemIndex].children[childIndex].actions.filter((_, index) => index !== actionIndex);
            } else {
                newConfig[itemIndex].actions =
                    newConfig[itemIndex].actions.filter((_, index) => index !== actionIndex);
            }
            return newConfig;
        });
    };

    const deleteResource = (
        itemIndex: number,
        childIndex: number | null,
        actionIndex: number,
        resourceIndex: number
    ) => {
        setConfig(prev => {
            const newConfig = [...prev];
            if (childIndex !== null) {
                newConfig[itemIndex].children[childIndex].actions[actionIndex].resources =
                    newConfig[itemIndex].children[childIndex].actions[actionIndex].resources.filter((_, index) => index !== resourceIndex);
            } else {
                newConfig[itemIndex].actions[actionIndex].resources =
                    newConfig[itemIndex].actions[actionIndex].resources.filter((_, index) => index !== resourceIndex);
            }
            return newConfig;
        });
    };

    // Toggle fullscreen mode
    const toggleFullscreen = (mode: 'text' | 'ui') => {
        if (fullscreenMode === mode) {
            setFullscreenMode('none');
            setActiveTab('split');
        } else {
            setFullscreenMode(mode);
            setActiveTab(mode);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-full">
            <div className="flex items-center justify-between border-b border-border p-4 mb-6 bg-background shadow-sm">
                <div className="text-xl font-semibold text-foreground">
                    YAML Editor
                </div>

                <nav className="flex gap-2">
                    <TabButton
                        active={activeTab === 'text'}
                        onClick={() => {
                            setActiveTab('text');
                            setFullscreenMode('text');
                        }}
                    >
                        Text Editor
                    </TabButton>
                    <TabButton
                        active={activeTab === 'split'}
                        onClick={() => {
                            setActiveTab('split');
                            setFullscreenMode('none');
                        }}
                    >
                        Split View
                    </TabButton>
                    <TabButton
                        active={activeTab === 'ui'}
                        onClick={() => {
                            setActiveTab('ui');
                            setFullscreenMode('ui');
                        }}
                    >
                        Visual Editor
                    </TabButton>
                </nav>
            </div>


            {error && <ErrorMessage message={error} />}

            <div className="h-[calc(100vh-15vh)]">
                {activeTab === 'text' && (
                    <TextEditor
                        yamlText={yamlText}
                        setYamlText={setYamlText}
                        fullscreenMode={fullscreenMode}
                        toggleFullscreen={toggleFullscreen}
                    />
                )}
                {activeTab === 'ui' && (
                    <UIEditor
                        config={config}
                        fullscreenMode={fullscreenMode}
                        toggleFullscreen={toggleFullscreen}
                        addItem={addItem}
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
                )}
                {activeTab === 'split' && (
                    <ResizablePanelGroup direction="horizontal" className="h-full rounded-lg border">
                        <ResizablePanel defaultSize={50} minSize={20}>
                            <TextEditor
                                yamlText={yamlText}
                                setYamlText={setYamlText}
                                fullscreenMode={fullscreenMode}
                                toggleFullscreen={toggleFullscreen}
                            />
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={50} minSize={20}>
                            <UIEditor
                                config={config}
                                fullscreenMode={fullscreenMode}
                                toggleFullscreen={toggleFullscreen}
                                addItem={addItem}
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
                        </ResizablePanel>
                    </ResizablePanelGroup>
                )}
            </div>
        </div>
    );
};

export default YamlEditor;