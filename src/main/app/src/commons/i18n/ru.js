import messages from 'ra-language-russian';

export default {
    ...messages,
    pos: {
        configuration: 'Конфигурация',
        language: 'Язык',
        title: 'Панель управления',
        general: 'Общие',
        tags: 'Теги'
    },
    resources: {
        pages: {
            name: 'Страницы',
            tags: {
                'MENU': 'Меню'
            },
            fields: {
                date: 'Обновление',
                userId: 'Пользователь',
                tags: {
                    name: 'Тег',
                    start: 'Активно с',
                    end: 'Активно по'
                },
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
                tags: {
                    name: 'Тег',
                    start: 'Активно с',
                    end: 'Активно по'
                }
            }
        }
    }
}
