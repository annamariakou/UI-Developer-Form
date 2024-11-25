# UI DEVELOPER TEST

Below you will find details of the UI Developer Test project which fufills the requirements given in the PDF instructions.

## 🖼️ Framework

`Vite` was the chosen framework for this project as it works well for smaller projects, runs fast, has a lightweight server and the ability to create components.

## ✏️ Approach

This project was broken down into two components:

- `Form.jsx`
- `UserInputs.jsx`

This approach was chosen over creating one large component to give more flexibility in how the components are used and to make the code more readible and less heavy.

The `Form` component handles user inputs that are sent to `userData.json` file the while the `UserInputs` component displays the information imported into the form with options to edit or remove.

Both components were imported into the `App.jsx` file where basic CRUD was performed to manage the users.

The `server.mjs` file was set up at the root of the project to provide a CRUD API for managing the user data stored in the `userData.json` file.

Within the files comments have been added to explain parts of the code.

## 🎨 Design

The design reflects the given prompt with a more modern look whilst also using red, grey and black to represent the company's brand colours.

The icons used were taken from Google icons in svg format, found in the assets folder. SVG was used as this is better in scaling image size without losing quality.

## 🩷 Accesibility

Using the WAVE chrome extension, no accesibility errors were found.

All colours used on the page pass the following:

- WCAG AA
- WCAG AAA

`Verdana` was selected as the main font given it was a specifically created for accesibility purposes. The font sizes displayed are no smaller than the accesbility recommended 12px (0.75 rem).

The site is also viewable in mobile size.

The form has labels with the required asterisk\* in a red colour for visiblity. Missing inputs provide clear error messages.

The SVG images contain alt-text.

## ⌛️ Run Project

To run this project, you will need to run the following:

```bash
  cd vite-project
  npm start
```

If you face an error with your server already running in the background, run this command:

```bash
 npx kill-port <port number>
```

## 🚨 Tests

`Vitest` was selected for testing as it is native to the Vite framework being used. Vitest supports jsx, runs fast and provides all the modern tools used in testing today. It is very similar to the popular Jest.

Tests were run for the `App.jsx`, `Form.jsx` and `UserInputs.jsx` files.

To run tests, run the following command

```bash
  npm run test
```

## 🚀 Future Roadmap

Below are a few things but not limited to what I would do with more time:

- More enhanced design.

- Increased detailed testing.

- Improved responsiveness.

- Successful form submission message.

- Updated favicon.
