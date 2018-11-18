import messages from 'ra-language-english';

export default {
    ...messages,
    pos: {
        configuration: 'Configuration',
        language: 'Language',
        title: 'Admin Panel',
        general: 'General'
    },
    resources: {
        pages: {
            name: 'Pages',
            tags: {
                'menu': 'Menu'
            },
            fields: {
                tags: 'Tags',
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
                'ROLE_MANAGER': 'Manager',
                'ROLE_EDITOR': 'Editor'
            },
            fields: {
                password: 'Password',
                tags: 'Tags'
            }
        }
    }
}