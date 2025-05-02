import classNames from 'classnames';
import {
    ActionType,
    ChildType,
    ResourceType
} from './types';

const cn = (...inputs: classNames.ArgumentArray) => {
    return classNames(...inputs);
}

const defaultAction = (): ActionType => ({
    code: 'new-action',
    name: 'NEW ACTION',
    resources: []
});

const defaultResource = (): ResourceType => ({
    method: 'GET',
    path: '/api/v1/new'
});

const defaultChild = (): ChildType => ({
    name: 'NEW CHILD',
    id: 'new-child',
    icon: 'default',
    router: '/new',
    component: 'new/index',
    sequence: 6000,
    actions: []
});

export {
    cn,
    defaultAction,
    defaultResource,
    defaultChild
}