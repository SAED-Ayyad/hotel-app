# Hotel Management System

A modern, full-featured hotel management system built with React, TypeScript, and Tailwind CSS. This application provides a complete solution for hotel administration and guest bookings.

## Features

- **Public Booking Portal**
  - Browse available rooms
  - Make reservations
  - View room details and amenities
  - Responsive design for all devices

- **Admin Dashboard**
  - Real-time occupancy overview
  - Revenue tracking
  - Booking calendar
  - Staff management

- **Room Management**
  - Add/edit/delete rooms
  - Set room status
  - Manage room types and pricing
  - Upload room photos

- **Booking System**
  - Process new bookings
  - Manage existing reservations
  - View booking calendar
  - Handle check-ins/check-outs

- **Staff Management**
  - Add/edit staff members
  - Assign roles
  - Track staff activities
  - Manage permissions

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hotel-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

### Public Access

- Visit the homepage to view available rooms
- Use the booking form to make reservations
- Browse room types and amenities

### Admin Access

1. Login at `/login` with demo credentials:
   - Email: admin@hotel.com
   - Password: any password will work

2. Access admin features:
   - Dashboard: View hotel statistics
   - Rooms: Manage room inventory
   - Bookings: Handle reservations
   - Staff: Manage hotel staff

## Project Structure

```
src/
├── components/         # Reusable UI components
├── context/           # React context providers
├── data/             # Mock data and constants
├── pages/            # Page components
├── types/            # TypeScript type definitions
└── utils/            # Helper functions
```

## Technology Stack

- **Frontend Framework**: React 18
- **Type System**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router
- **State Management**: React Context

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
