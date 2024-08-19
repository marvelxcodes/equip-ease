# Sports Items Allocation System

## Overview

The Sports Items Allocation System is a web application designed to manage the process of borrowing, tracking, and managing sports equipment. This system allows admins to manage inventory, track borrowed items, and handle returns, while students can browse available equipment, request to borrow items, and view the status of their requests.

## Features

### Admin Features

- **Dashboard**: Manage sports items, including adding new items, allocating them to students, and tracking returns.
- **Request Management**: View, approve, or deny student requests to borrow equipment.
- **Inventory Management**: Track the condition and quantity of sports items.

### Student Features

- **Browse Equipment**: View available sports items and request to borrow them.
- **Request Status**: Check the status of their borrow requests.
- **Notifications**: Receive notifications about request approvals, denials, and overdue items.

### Technology Stack

- **Frontend**: Next.js (React)
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **Styling**: CSS, Tailwind CSS

### Local Setup

Follow these steps to set up the project locally on your machine.

#### Prerequisites

- Node.js (v14+)
- npm or yarn
- PostgresDB

#### Installation

**1. Clone the Repository**

```bash
git clone https://github.com/marvelxcodes/sports-items-allocation-system.git
```

```bash
cd sports-items-allocation-system
```

**2. Install Dependencies**
Use PNPM(Recomended)

```bash
pnpm install
```

3.  **Set Up Environment Variables**

Create a `.env` file in the root directory and add the environment variables present in the `.env.example` file:

4. **Run Database Migrations**

```bash
pnpm prisma migrate dev --name init`
```

**5. Start the Development Server**

```bash
pnpm dev
```
The application will be available at `http://localhost:3000`.

### Building for Production

To build the project for production:

```bash
pnpm build
```

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

Feel free to adjust the sections according to your project specifics and database configuration.
