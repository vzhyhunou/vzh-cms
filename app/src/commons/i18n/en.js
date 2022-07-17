import messages from 'ra-language-english';

export default {
    ...messages,
    resources: {
        general: 'General',
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
                user: 'User',
                tags: 'Tags',
                title: 'Title',
                content: 'Content',
                '@files.content': 'Images'
            }
        },
        users: {
            name: 'Users',
            tags: {
                'ADMIN': 'Administrator',
                'MANAGER': 'Manager',
                'EDITOR': 'Editor'
            },
            fields: {
                date: 'Update',
                user: 'User',
                password: 'Password',
                tags: 'Tags'
            }
        }
    }
}
