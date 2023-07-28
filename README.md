# Limble Demo App

This is my demo app for Limble CMMS. You should be able to add comments, and mention users in the comments if you like. When an @ sign is typed, the user list comes up. You can click on a user with the mouse and they'll be added to the input, or you can move up and down with the keyboard to a user. If you hit enter when using the keyboard, the highlighted user will be mentioned.

When a comment is saved with a mention, an alert pops up with the names of the users who were mentioned, and the mentioned user(s) shows up in the comment display with their name in bold.

You can run the app and interact with it in the browser, as well as view/run the unit tests and Cypress tests for the app.

To run the app:

```sh
npm run start:open
```

To run the unit tests:

```sh
npm run unit-tests
```

To run the Cypress tests:

```sh
npm run e2e-tests
```

To run the Cypress tests in interactive mode:

```sh
npm run e2e-tests:watch
```

A Cypress window should pop up, and you should be able to run the tests in a browser and watch them run.
