# Notes Web App

## Overview

This is a simple Notes Web App built using React.js. It leverages popular libraries such as `react-router`, `localstorage`, `react-hook-form`, `uuid`, and `yup` to provide a seamless and user-friendly experience for managing and organizing notes.

## Features

- **Create Notes:** Easily create new notes with a title and content.

- **Edit Notes:** Modify existing notes by updating their title or content.

- **Delete Notes:** Remove unwanted notes effortlessly.

- **Validation:** Utilizes `yup` for form validation to ensure proper data entry.

- **Routing:** Implements `react-router` for smooth navigation between the notes list and individual note pages.

- **Persistent Storage:** Utilizes `localstorage` to save notes locally, allowing users to access their notes even after refreshing the page.

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/notes-web-app.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd notes-web-app
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Run the Application:**

   ```bash
   npm start
   ```

   The app will be accessible at `http://localhost:3000` by default.

## Dependencies

- [React](https://reactjs.org/): A JavaScript library for building user interfaces.

- [React Router](https://reactrouter.com/): Declarative routing for React.js.

- [React Hook Form](https://react-hook-form.com/): Performant and flexible form validation for React.

- [UUID](https://www.npmjs.com/package/uuid): A library for generating unique identifiers.

- [Yup](https://github.com/jquense/yup): A schema-based validation library.

## Project Structure

- `src/components`: Contains React components.

- `src/pages`: Defines different pages for the application.

- `src/utils`: Houses utility functions.

- `src/App.js`: The main application component.

- `src/index.js`: Entry point of the application.

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.