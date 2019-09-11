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
        tags: {
            fields: {
                name: 'Тег',
                start: 'Активно с',
                end: 'Активно по'
            }
        },
        pages: {
            name: 'Страницы',
            tags: {
                'MENU': 'Меню',
                'PUBLISHED': 'Опубликовано'
            },
            fields: {
                date: 'Обновление',
                userId: 'Пользователь',
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
                'ROLE_ADMIN': 'Администратор',
                'ROLE_MANAGER': 'Менеджер',
                'ROLE_EDITOR': 'Редактор'
            },
            fields: {
                date: 'Обновление',
                userId: 'Пользователь',
                password: 'Пароль',
                tags: 'Теги'
            }
        }
    }
}
