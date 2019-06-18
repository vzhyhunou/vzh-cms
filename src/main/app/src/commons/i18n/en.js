import messages from 'ra-language-english';

export default {
    ...messages,
    pos: {
        configuration: 'Configuration',
        language: 'Language',
        title: 'Control Panel',
        general: 'General',
        tags: 'Tags'
    },
    resources: {
        pages: {
            name: 'Pages',
            tags: {
                'MENU': 'Menu'
            },
            fields: {
                date: 'Update',
                userId: 'User',
                tags: {
                    name: 'Tag',
                    start: 'Active after',
                    end: 'Active before'
                },
                properties: {
                    en: {
                        title: 'Title',
                        content: 'Content'
                    }
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
                tags: {
                    name: 'Tag',
                    start: 'Active after',
                    end: 'Active before'
                }
            }
        }
    }
}
