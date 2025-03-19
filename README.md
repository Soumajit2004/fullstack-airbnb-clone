# Fullstack Airbnb Clone ✈️🏨

**A comprehensive full-stack application inspired by Airbnb, demonstrating proficiency in frontend development with
React and backend development with NestJS.**

**Disclaimer:** This README was generated with the assistance of AI, but it has been thoroughly reviewed and verified
for accuracy.

![collage](https://github.com/user-attachments/assets/cbebbe9c-3275-477b-9c70-de5530013f86)

[View all images](https://photos.app.goo.gl/dh3bev79G3tnSRt6A)

[Video demo](https://youtu.be/tLOEW9Jbt4o)

### Project Overview

This project aims to replicate core Airbnb functionalities, including user authentication, property listing, and booking
management. It leverages React for the frontend and NestJS for the backend, demonstrating a strong understanding of
full-stack development principles.

### Requirements

* **Google Cloud Platform (GCP):** ☁️ Bucket for storing images and other media.
* **Docker:** 🐳 Used for running a PostgreSQL database container.
* **Node.js:** 🟢 Version 20.5.0

### Environment Variables

Create environment variable files by referring to the `.env.example` files located in the project's file structure.
Ensure to add a file named `gcpServiceAccountKey.json`, following the structure provided in
`gcpServiceAccountKey.example.json`.

### Features

1. **Authentication and Authorization** 🔐: Implements a secure, token-based authentication system using JWTs for access
   tokens and refresh tokens to manage session longevity. The backend handles token issuance, verification, and renewal,
   ensuring secure user sessions across server-client communications.

2. **Listing Management** 🏠: A comprehensive CRUD (Create, Read, Delete) system for managing property listings, backed
   by role-based access control to allow only hosts to add or delete listings. Update functionality for listings is
   intentionally excluded to maintain consistency and avoid potential data conflicts or confusion between guest and host
   expectations.

3. **Booking System** 📅: A fully integrated booking feature that allows users to view availability, submit bookings, and
   manage reservations. This feature incorporates validation checks, availability status, and integrates smoothly with
   the backend database to ensure consistent data synchronization and seamless user experience.

4. **Advanced Search Functionality** 🔍: An optimized search system using indexed database queries to retrieve listings
   based on specific criteria such as location, price range, amenities, and availability.

5. **Map-Based Search and Location Selection** 🗺️: Powered by interactive map integration (e.g., Google Maps API), users
   can search for listings geographically and visualize nearby properties. Additionally, an interactive map is available
   for hosts, allowing them to select and pin precise locations while listing a property.

### Limitations

1. **Payment System:** 💳 Not implemented due to complexities and third-party integrations.
2. **Recommendation System:** 🧠 Not implemented due to required machine learning capabilities.

### Demonstrated Skills and Knowledge

* **Frontend Development with React:** ⚛️ Component-based architecture, state management, API integration, and UI
  design.
* **Backend Development with NestJS:** nestjs.io Modular architecture, RESTful API design, database interactions,
  authentication, authorization, error handling, and logging.
* **Full-Stack Integration:** 🔗 Client-server communication, data synchronization, and deployment.
* **Version Control and Collaboration:** 🤝 Git and GitHub for version control and collaborative development.

**By undertaking this project, I have honed my skills in:**

* **Full-stack development:** Designing, implementing, and deploying complex web applications.
* **Frontend development:** Building user-friendly and responsive user interfaces.
* **Backend development:** Creating scalable and robust backend services.
* **Database management:** Interacting with databases to store and retrieve data efficiently.
* **API design and integration:** Designing and consuming RESTful APIs.
* **Version control:** Managing code changes effectively using Git.
* **Collaboration:** Working effectively with other developers to achieve project goals.

I am confident that this project demonstrates my ability to tackle challenging full-stack development tasks and deliver
high-quality solutions.
