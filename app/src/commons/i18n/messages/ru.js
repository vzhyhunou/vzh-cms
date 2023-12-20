import messages from 'ra-language-russian';

export default {
    ...messages,
    resources: {
        general: 'Общие',
        validation: {
            id: 'Id уже существует'
        },
        tags: {
            actions: {
                add: 'Добавить тэг',
                remove: 'Удалить тэг'
            },
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
                user: 'Пользователь',
                tags: 'Теги',
                title: 'Заголовок',
                content: 'Контент',
                '@files.content': 'Изображения'
            }
        },
        users: {
            name: 'Пользователи',
            tags: {
                'ADMIN': 'Администратор',
                'MANAGER': 'Менеджер',
                'PAGES_EDITOR': 'Редактор страниц'
            },
            fields: {
                date: 'Обновление',
                user: 'Пользователь',
                password: 'Пароль',
                tags: 'Теги'
            }
        }
    }
}
