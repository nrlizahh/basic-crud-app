# Simple CRUD Application

This is a full-stack CRUD application with user authentication and product management. It uses **PostgreSQL** as database, a clean domain-driven backend, and a frontend following **Atomic Design** principles.

---

## Features

### User Authentication
- **Register**: Users can register with a username and password.
- **Login**: Users can login using their username and password.

### Product Management
- **Add Product**: Users can add products with a name, description, and image (dummy image is provided in the backend controller).
- **Product Pagination**: Products are paginated with **10 products per page**.
- **Product Detail**: Shows product image, name, and description.
- **Edit Product**: Edit product details similar to Add Product.
- **Delete Product**: Remove a product from the database.

### Frontend
- Built using **Atomic Design** principles:  
  - **Atoms**: Buttons 
  - **Molecules**: Add/Edit product page, product card
  - **Organisms**: Product Lists, Navbar  
  - **Pages**: Product list page, Product detail page, Login Page, Register Page

### Backend
- **Clean Domain Driven Design**
- **PostgreSQL** database with migrations
- No ORM is used
- Database seeding included for example users and products
- Shared **entities/models** between frontend and backend for consistency

---

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd <repo-folder>
npm install

# Example with psql
createdb simple_crud_db
npm run migrate
npm run seed

## Start the backend server:
npx nodemon src/app.js --> use nodemon
## Start the frontend server:
npm run dev
