export type ResourceType = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    path: string;
  };
  
  export type ActionType = {
    code: string;
    name: string;
    resources: ResourceType[];
  };
  
  export type ChildType = {
    name: string;
    id: string;
    icon: string;
    router: string;
    component: string;
    sequence: number;
    actions: ActionType[];
  };
  
  export type ConfigItemType = {
    name: string;
    id: string;
    icon: string;
    sequence: number;
    actions: ActionType[];
    children: ChildType[];
  };
  
  export type TabType = 'text' | 'ui' | 'split';
  
  export type SelectionType = {
    itemIndex: number | null;
    childIndex: number | null;
    actionIndex: number | null;
    resourceIndex: number | null;
  };
  
  export type FullscreenModeType = 'none' | 'text' | 'ui';