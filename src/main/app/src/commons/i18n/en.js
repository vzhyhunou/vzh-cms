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
        tags: {
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
                property: {
                    title: 'Title',
                    content: 'Content'
                },
                files: 'Pictures'
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
