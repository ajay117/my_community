# My Community

Welcome to **My Community**! This is a social web app where users can sign up, log in, post status, comment on posts, and reply to comments. It's powered by a frontend built with React, TypeScript, Vite, and Material UI, and the backend is a fake API powered by json-server.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Available Scripts](#available-script)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Authentication**: Users can sign up and log in to the app.
- **Post Status**: Users can post a status that will be visible to other users.
- **Comment on Posts**: Users can comment on posts made by others.
- **Reply to Comments**: Users can reply to comments and engage in discussions.

## Technologies Used

- **Frontend**:

  - React
  - TypeScript
  - Vite
  - Material UI
  - Axios
  - React Router

- **Backend**:

  - json-server (Fake API for development)

- **Others**:
  - TypeScript
  - ESLint
  - Date-fns
  - UUID for generating unique IDs

## Installation

To get started with **My Community**, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/ajay117/my_community.git


2. Navigate into the project directory:

   ```bash
   cd my_community

3. Install the dependencies:

   ```bash
   npm install
   
4. Run the development server:

   ```bash
   npm run dev
   ```
   
   This will start the frontend application on http://localhost:5173.

5. To run the fake API server:

   ```bash
   npm run server
   ```
   
   This will start json-server and the API will be available at http://localhost:3000.

## Available Scripts

In the project directory, you can run the following commands:
    

<mark style="background-color: #f6f8fa;margin-right: 10px;">**npm run dev**</mark>
Starts the development server using Vite. The app will be available at http://localhost:5173.

<mark style="background-color: #f6f8fa;margin-right: 10px;">**npm run build**</mark>
Builds the app for production by compiling TypeScript and bundling assets using Vite.

<mark style="background-color: #f6f8fa;margin-right: 10px;">**npm run lint**</mark>
Runs ESLint to check the code for any issues or style violations.

<mark style="background-color: #f6f8fa;margin-right: 10px;">**npm run preview**</mark>
Runs a preview server for the built production app.

<mark style="background-color: #f6f8fa;margin-right: 10px;">**npm run server**</mark>
Starts the json-server to mock the backend API on http://localhost:3000.

## Contributing

If you would like to contribute to **My Community**, feel free to fork the repository, make changes, and submit a pull request.

## License

This project is open-source and available under the MIT License.

## Contact

For any questions or issues, feel free to open an issue on GitHub or reach out via email.
