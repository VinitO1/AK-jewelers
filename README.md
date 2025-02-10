# AK Jewelers

Welcome to the AK Jewelers project! This is a modern e-commerce application built with React and Firebase, allowing users to browse and purchase fine jewelry online.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Firebase Configuration](#firebase-configuration)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (sign up, log in, and log out)
- Browse jewelry collections (earrings, rings, necklaces)
- Product detail pages with descriptions and images
- Add products to the shopping cart
- View and manage the shopping cart
- Checkout process
- Responsive design for mobile and desktop

## Technologies Used

- **Frontend**: React, React Router, React Bootstrap
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **State Management**: React Context API
- **Deployment**: Firebase Hosting

## Setup Instructions

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/jewelry-shop.git
   cd jewelry-shop
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory and add your Firebase configuration:
   ```plaintext
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

## Usage

- Navigate to the home page to view the jewelry collections.
- Click on a product to view its details.
- Add products to your cart and proceed to checkout.
- Sign up or log in to manage your orders.

## Firebase Configuration

This project uses Firebase for authentication and Firestore for data storage. Make sure to set up your Firebase project and configure the necessary services in the Firebase Console.

### Firestore Rules

The Firestore rules are defined in `firestore.rules`. Ensure that you have the correct security rules set up for your Firestore database.

### Firestore Indexes

The Firestore indexes are defined in `firestore.indexes.json`. This file is used to optimize queries in Firestore.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for checking out AK Jewelers! We hope you enjoy browsing our collection of fine jewelry.
