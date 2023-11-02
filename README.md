# amitest

To install dependencies:

```bash
bun install
```

To run:

```bash
bun start
```

This project was created using `bun init` in bun v1.0.7. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

TODO
[ ] figure out an external service to use
[ ] create all the popote for two-directions sync

### Shortcuts

- Given the number of different sources a task could have, it should probably be an event-sourced model rather than a dumb model like mine. Projections are nice in eventually consistent systems.
- For simplicity I don't expose real domain entities. Not ideal, but easier than being too much by the book and dealing with domain entities, repositories, etc.
- I don't deep check/sanitize my DTOs using something like class-validator, it's a MUST in production but time consuming and I'd rather show you something more interesting than validation.
-------------------------

# Todo service

Build a service to manage Todos.

## Requirements

- Features
    - [ ] API to query Todos (potentially many!)
        - Query Todos that are not done
        - Todos can be grouped in lists
    - [x] API to add a Todo
    - [ ] API to update Todos
        - Mark Todos as done
    - [ ] We would like you to integrate with another service provider. It can be any Todo service (e.g. Microsoft Todo APIs), or you can also use a mock provider. Todos should be kept in sync between our service and the third-party integration
        - Todos created in the third-party integration should always be created in our service
        - The status of todos should always be in sync between our service and the integration

- Tech
    - [x] If possible use a relational DB, PostgreSQL would be perfect!
    - [x] Provide data model for Todos

Bonus:
- [x] Let's create GraphQL APIs
- [x] typescript would be great, but most common languages are okay

> Note: We expect you to treat the challenge as a real world production app development that is meant to:
Scale to 10+ engineers contributing simultaneous
> Wherever you might have to take shortcuts point it out and explain what you would do differently!
> We would like you to take assumptions and decisions of how the product and the third-party integration should work, if needed you can highlight and explain decisions in a README inside the project.