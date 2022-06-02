## REST API для работы с коллекцией контактов

### Команды для запуска :

- `npm start` - старт сервера в режиме production
- `npm run start:dev` - старт сервера в режиме разработки

### Endpoints для получения информации :

    GET
    /contacts - получить все контакты

    GET
    /contacts/{contactId} - получить контакт по id

    POST
    /contacts - добавить новый контакт

    DELETE
    /contacts/{contactId} - удалить контакт

    PUT
    /contacts/{contactId} - обновить контакт

    PATCH
    /contacts/{contactId}/favorite - добавить/удалить контакт из избранных

### Схема контакта Joi:

```js
{
  name: Joi.string().min(2).required(),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.bool().default(false),
}
```
