import messages from 'ra-language-english';

export default {
    ...messages,
    pos: {
        configuration: 'Configuration',
        language: 'Language',
        title: 'Control Panel',
        general: 'General'
    },
    resources: {
        validation: {
            id: 'Id already exists'
        },
        tags: {
            actions: {
                add: 'Add Tag',
                remove: 'Remove Tag'
            },
            fields: {
                name: 'Tag',
                start: 'Active after',
                end: 'Active before'
            }
        },
        pages: {
            name: 'Pages',
            tags: {
                'MENU': 'Menu',
                'PUBLISHED': 'Published'
            },
            fields: {
                date: 'Update',
                userId: 'User',
                tags: 'Tags',
                title: 'Title',
                content: 'Content',
                images: 'Pictures'
            }
        },
        users: {
            name: 'Users',
            tags: {
                'ROLE_ADMIN': 'Administrator',
                'ROLE_MANAGER': 'Manager',
                'ROLE_EDITOR': 'Editor'
            },
            fields: {
                date: 'Update',
                userId: 'User',
                password: 'Password',
                tags: 'Tags'
            }
        }
    }
}
