# WhoPays App Documentation

## Table of Contents
- [Name](#name)
- [Description](#description)
- [Architecture](#architecture)
- [Startup Architecture](#startup-architecture)
- [Specifications/Requirements](#specificationsrequirements)
- [Project Structure](#project-structure)
- [License](#license)

## Name
WhoPays

## Description
WhoPays is a social expense-sharing app that allows users to track and split expenses with their friends or groups. The app helps users manage shared expenses, calculate costs, and ensure fair distribution of payments.

## Architecture
The WhoPays app is built using the following frameworks and technologies:
- Angular: A TypeScript-based web application framework used for building the frontend of the app.
- Ionic Framework: An open-source UI toolkit for building cross-platform mobile applications using web technologies such as HTML, CSS, and JavaScript.
- Firebase: A backend-as-a-service platform that provides authentication, real-time database, cloud storage, and other services used for user authentication, data storage, and hosting.

Key components and methods in the app include:
- `PaysComponent`: A component responsible for displaying and managing expense tracking and splitting functionality.
- `AuthService`: A service used for user authentication and retrieving user data from Firebase.
- `AlertController`: A service used for displaying alerts and messages to the user.
- `ModalController`: A service used for creating and managing modals in the app.
- `EventModalComponent`: A component for displaying a modal to create and manage events.
- `AngularFireStorage`: A service used for uploading and retrieving files from Firebase Cloud Storage.

## Startup Architecture
To run the WhoPays app on your local machine, follow these steps:

1. Clone the repository from GitHub: `git clone <repository-url>`
2. Install the required dependencies by running: `npm install`
3. Configure Firebase credentials in the app:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com).
   - Obtain the Firebase configuration object and replace it in the `environment.ts` file.
   - Enable Firebase Authentication and Firestore in the Firebase project.
   - Set up Firebase Cloud Storage for storing user avatars.
4. Run the app locally using the following command: `ionic serve`

## Specifications/Requirements

| Requirement    | Importance | Category   | Description                                                       |
| -------------- | ---------- | ---------- | ----------------------------------------------------------------- |
| REQ_001        | High       | Expense    | Calculate costs of events                                         |
| REQ_002        | High       | Expense    | Split expenses equally among participants                         |
| REQ_003        | Medium     | User       | Allow users to register and log in to the app                     |
| REQ_004        | Medium     | User       | Display user profile information                                  |
| REQ_005        | Low        | User       | Allow users to upload and update their avatars                    |
| REQ_006        | Low        | Notification | Send notifications for expense updates and reminders            |
| REQ_007        | Low        | Security   | Implement user authentication and access control                  |
| REQ_008        | Low        | Backup     | Periodically backup user data to prevent data loss                |

## Project Structure
The project structure follows the standard Angular and Ionic project structure:

```
who-pays/
├── src/
│ ├── app/
│ │ ├── components/
│ │ │ ├── event-modal/
│ │ │ │ ├── event-modal.component.ts
│ │ │ │ ├── event-modal.component.html
│ │ │ │ ├── event-modal.component.scss
│ │ │ │ └── event-modal.component.spec.ts
│ │ │ └── ...
│ │ ├── services/
│ │ │ ├── auth.service.ts
│ │ │ └── ...
│ │ ├── pages/
│ │ │ ├── home/
│ │ │ │ ├── home.page.ts
│ │ │ │ ├── home.page.html
│ │ │ │ ├── home.page.scss
│ │ │ │ └── home.page.spec.ts
│ │ │ └── ...
│ │ ├── models/
│ │ │ ├── user.model.ts
│ │ │ └── ...
│ │ └── ...
│ └── ...
├── ...
├── package.json
├── angular.json
├── ionic.config.json
└── ...
```

## License
This project is licensed under the [MIT License](LICENSE).
