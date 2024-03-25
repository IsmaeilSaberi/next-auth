# Next Auth Full Stack Example

This project demonstrates how to use Next Auth with a full stack application.

## Features

- Authentication with email, password, and social providers
- Protected routes and API endpoints
- User management (create, read, update, delete)
- Role-based access control (RBAC)
- Session and token management

## Getting Started

1. Clone the repository:
   git clone https://github.com/vercel/next-auth-fullstack-example.git

2. Install the dependencies:
   npm install

3. Create a `.env` file in the root directory and add your database connection string:
   DATABASE_URL=postgresql://user:password@host:port/database

4. Start the development server:
   npm run dev

5. Open http://localhost:3000 in your browser.

## Usage

### Authentication

To authenticate, click on the "Sign In" button in the navigation bar. You can sign in with email and password, or with a social provider (Google, Facebook, Twitter, etc.).

### Protected Routes

Once you are authenticated, you can access protected routes by clicking on the "Protected" link in the navigation bar. You will be redirected to the login page if you are not authenticated.

### API Endpoints

You can also make protected API requests by sending a request to the `/api/protected` endpoint. You must be authenticated with a valid session or token to access this endpoint.

### User Management

You can manage users by clicking on the "Users" link in the navigation bar. You can create, read, update, and delete users.

### Role-Based Access Control

You can assign roles to users to control their access to protected routes and API endpoints. To create a role, go to the "Roles" page in the navigation bar and click on the "Create Role" button. You can then assign users to the role by going to the "Users" page and clicking on the "Edit" button for a user.

## Deployment

To deploy this project, you can use Vercel. Vercel is a platform that makes it easy to deploy and host Next.js applications.

To deploy to Vercel, follow these steps:

1. Create a Vercel account.
2. Click on the "New Project" button.
3. Select "Import Git Repository".
4. Enter the URL of your GitHub repository.
5. Click on the "Deploy" button.

Once your project is deployed, you can access it at the URL provided by Vercel.

## License

This project is licensed under the MIT License.
