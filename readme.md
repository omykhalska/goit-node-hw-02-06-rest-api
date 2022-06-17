# REST API for working with a collection of contacts

## Commands to start the server:

- `npm start` - start server in production mode
- `npm run start:dev` - start server in development mode

## Endpoints for getting contacts :

    GET
    /contacts - get all contacts

> Query String:
>
> `page` - _integer, optional, default: 1_ - Specify which page to query.
>
> `limit` - _integer, optional, default: 20_ - Specify a quantity of items per page.
>
> `favorite` - _boolean, optional, default: false_ - Get only favorite items.

    GET
    /contacts/{contactId} - get a contact by id

    POST
    /contacts - add a new contact

    DELETE
    /contacts/{contactId} - delete a contact

    PUT
    /contacts/{contactId} - update a contact

    PATCH
    /contacts/{contactId}/favorite - add/remove a contact to/from the list of favorite contacts

## User authentication endpoints :

    POST
    /users/signup - Register a new user.

    POST
    /users/login - Log in an user.

    GET
    /users/logout - Log out the current user.

    GET
    /users/current - Get information about the current user.

    PATCH
    /users - Update a subscription of the current user. Available options: ['starter', 'pro', 'business'].

    PATCH
    /users/avatars - Update an avatar of the current user.

## Schemas

### Contact Joi Schema:

```js
{
  name: Joi.string().min(2).required(),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.bool().default(false),
}
```

### User Joi Schema:

```js
{
  email: Joi.string().required(),
  password: Joi.string().required(),
  subscription: Joi.string()
    .valid('starter', 'pro', 'business')
    .default('starter'),
  avatarURL: Joi.string().required().default(gravatar.url(email)),
}
```
