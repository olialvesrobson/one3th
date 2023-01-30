// assets
import { IconFilePlus, IconFileDigit, IconFileText } from '@tabler/icons';

// constant
const icons = {
    IconFilePlus,
    IconFileDigit,
    IconFileText
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const users = {
    id: 'users',
    title: 'Users',
    type: 'group',
    children: [
        {
            id: 'view-user',
            title: 'Users',
            type: 'item',
            url: '/users/',
            icon: icons.IconFileText,
            breadcrumbs: true
        },
        {
            id: 'users-settings',
            title: 'Settings',
            type: 'collapse',
            icon: icons.IconWindmill,
            children: [
                {
                    id: 'add-user',
                    title: 'Add',
                    type: 'item',
                    url: '/users/add',
                    icon: icons.IconFilePlus,
                    breadcrumbs: false
                },
                {
                    id: 'edit-user',
                    title: 'Edit',
                    type: 'item',
                    url: '/users/edit',
                    icon: icons.IconFileDigit,
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default users;
