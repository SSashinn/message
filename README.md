# Messaging App

This is a simple chat application built with React and Redux that allows users to add friends, view their friends list, manage pending friend requests, and send messages. The application interfaces with a backend API to manage friend requests and messaging.

## Features

- **User Authentication**: Users can sign in or sign up to access the chat features.
- **Add Friends**: Users can send friend requests using usernames.
- **View Friends List**: Displays a list of friends and options to start a chat with them.
- **Manage Pending Requests**: Users can accept or reject pending friend requests.
- **Direct Messaging**: Allows users to send and receive messages in real time.
- **Error Handling**: Displays error messages when issues occur.
- **Online Status**: Indicates when users are online.

## Technologies Used

- **React**: For building the user interface.
- **Redux**: For state management.
- **CSS Modules**: For styling components.
- **Fetch API**: For making HTTP requests to the backend.
- **React Router**: For handling routing and navigation.

## Components

### Home

- **Functionality**: Serves as the main layout for the application. Checks if a user is logged in and displays the app's header, sidebar, and content.
- **Redirection**: Redirects to the sign-in page if the user is not authenticated.

### SignIn

- **Functionality**: Allows users to sign in using their username and password.
- **State Management**: Utilizes local state for managing input and loading/error states.
- **Form Handling**: Handles form submission and displays error messages if authentication fails.

### SignUp

- **Functionality**: Enables users to create a new account by entering a username and password.
- **State Management**: Utilizes local state for managing input and loading/error states.
- **Form Handling**: Handles form submission and displays error messages if account creation fails.

### AddFriend

- **Functionality**: Enables users to add friends by entering their usernames.
- **State Management**: Utilizes local state for managing input and loading/error states.

### All

- **Functionality**: Displays a list of friends and allows users to initiate chats.
- **Data Fetching**: Fetches friends' data from the backend and handles chat initiation.

### Pending

- **Functionality**: Manages incoming friend requests. Displays a list of pending requests and allows users to accept or reject them.
- **Error Handling**: Shows error messages for issues encountered during request management.

### Dm

- **Functionality**: Handles direct messaging between users.
- **Real-Time Updates**: Fetches and displays messages based on the conversation ID, allowing users to send new messages.

### Error

- **Functionality**: Displays an error message when something goes wrong in the application.

