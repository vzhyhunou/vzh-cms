import messages from 'ra-language-russian';

export default {
    ...messages,
    pos: {
        configuration: 'Конфигурация',
        language: 'Язык',
        title: 'Панель управления',
        general: 'Общие'
    },
    resources: {
        pages: {
            name: 'Страницы',
            tags: {
                'menu': 'Меню'
            },
            fields: {
                tags: 'Теги',
                date: 'Последнее обновление',
                userId: 'Пользователем',
                properties: {
                    ru: {
                        title: 'Заголовок',
                        content: 'Контент'
                    }
                },
                files: 'Изображения'
            }
        },
        users: {
            name: 'Пользователи',
            tags: {
                'ROLE_ADMIN': 'Администратор',
                'ROLE_MANAGER': 'Менеджер',
                'ROLE_EDITOR': 'Редактор'
            },
            fields: {
                password: 'Пароль',
                tags: 'Теги'
            }
        }
    }
}
