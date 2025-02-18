# Transaction Web Application

## Overview
A web-based transaction management application built with **Spring Boot** and **React**. It allows users to send and receive money securely, view transaction history, and manage their account details. The application includes features like JWT authentication, transaction filtering, notifications, refunds, and currency conversion.

## Features
- **User Authentication:** Secure login and registration with JWT.
- **Transaction Management:** Send and receive transactions with descriptions and timestamps.
- **Filtering and Pagination:** View sent, received, and all transactions with sorting.
- **Refund System:** Ability to issue refunds for past transactions.
- **Notifications:** Real-time updates on received transactions.
- **Currency Exchange:** Fetches exchange rates dynamically for selected currencies.
- **User Profile Management:** Update user address and view account details.

## Technologies Used
### Backend
- **Spring Boot** (Java)
- **Spring Security** (JWT authentication)
- **Spring Data JPA** (Hibernate, PostgreSQL)

### Frontend
- **React** (JavaScript)
- **React Router** (Navigation)
- **Tailwind CSS** (Styling)

## Installation
### Backend
1. Clone the repository:
   ```sh
   git clone https://github.com/sleeper-dev/transactionapp.git
   cd transactionapp/transactionapp-backend
   ```
2. Configure the database settings in `application.properties`.
3. Build and run the Spring Boot application:
   ```sh
   mvn clean install
   mvn spring-boot:run
   ```

### Frontend
1. Navigate to the frontend directory:
   ```sh
   cd ../transactionapp-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

