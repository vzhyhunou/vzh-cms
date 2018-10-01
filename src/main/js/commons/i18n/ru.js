import messages from 'ra-language-russian';

export default {
    ...messages,
    pos: {
        configuration: 'Конфигурация',
        language: 'Язык',
        title: 'Админ панель',
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
                'manager': 'Менеджер',
                'editor': 'Редактор'
            },
            fields: {
                tags: 'Теги'
            }
        }
    }
}
