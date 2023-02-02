// assets
import { IconFilePlus, IconFileDigit, IconFileText } from '@tabler/icons';

// constant
const icons = {
    IconFilePlus,
    IconFileDigit,
    IconFileText
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const companies = {
    id: 'companies',
    title: 'Companies',
    type: 'group',
    children: [
        {
            id: 'view-company',
            title: 'Companies',
            type: 'item',
            url: '/companies/',
            icon: icons.IconFileText,
            breadcrumbs: false
        },
        {
            id: 'companies-settings',
            title: 'Settings',
            type: 'collapse',
            icon: icons.IconWindmill,
            children: [
                {
                    id: 'add-company',
                    title: 'Add',
                    type: 'item',
                    url: '/companies/add',
                    icon: icons.IconFilePlus,
                    breadcrumbs: true
                },
                {
                    id: 'edit-company',
                    title: 'Edit',
                    type: 'item',
                    url: '/companies/edit',
                    icon: icons.IconFileDigit,
                    breadcrumbs: true
                },
                {
                    id: 'detail-company',
                    title: 'Detail',
                    type: 'item',
                    url: '/companies/detail',
                    icon: icons.IconFileDigit,
                    breadcrumbs: true
                },
                {
                    id: 'settings-company',
                    title: 'Settings',
                    type: 'item',
                    url: '/companies/settings',
                    icon: icons.IconFileDigit,
                    breadcrumbs: true
                }
            ]
        }
    ]
};

export default companies;
