import messages from 'ra-language-russian';

export default {
    ...messages,
    ra: {
        ...messages.ra,
        action: {
            ...messages.ra.action,
            clear_array_input: 'Очистить список',
            move_up: 'Вверх',
            move_down: 'Вниз'
        },
        message: {
            ...messages.ra.message,
            clear_array_input: 'Вы уверены, что хотите очистить весь список?'
        },
        configurable: {
            ...messages.ra.configurable,
            customize: 'Кастомизировать'
        }
    },
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
