import { Room, Booking, Staff, User } from '../types';

// Mock users for authentication
export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@hotel.com',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Staff Member',
    email: 'staff@hotel.com',
    role: 'staff',
  },
];

// Mock rooms data
export const rooms: Room[] = [
  {
    id: '1',
    number: '101',
    type: 'single',
    price: 99,
    capacity: 1,
    amenities: ['WiFi', 'TV', 'Air Conditioning'],
    status: 'available',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
  },
  {
    id: '2',
    number: '102',
    type: 'double',
    price: 149,
    capacity: 2,
    amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar'],
    status: 'booked',
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
  },
  {
    id: '3',
    number: '201',
    type: 'suite',
    price: 299,
    capacity: 4,
    amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Jacuzzi'],
    status: 'available',
    image: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg',
  },
  {
    id: '4',
    number: '202',
    type: 'deluxe',
    price: 399,
    capacity: 2,
    amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Ocean View'],
    status: 'maintenance',
    image: 'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg',
  },
];

// Generate dates for the next 30 days
const generateDate = (daysFromNow: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
};

// Mock bookings data
export const bookings: Booking[] = [
  {
    id: '1',
    roomId: '2',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '123-456-7890',
    checkInDate: generateDate(1),
    checkOutDate: generateDate(3),
    totalPrice: 298,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    roomId: '3',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '987-654-3210',
    checkInDate: generateDate(5),
    checkOutDate: generateDate(8),
    totalPrice: 897,
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    roomId: '1',
    customerName: 'Michael Johnson',
    customerEmail: 'michael@example.com',
    customerPhone: '555-123-4567',
    checkInDate: generateDate(10),
    checkOutDate: generateDate(12),
    totalPrice: 198,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
];

// Mock staff data
export const staffMembers: Staff[] = [
  {
    id: '1',
    name: 'Sarah Williams',
    role: 'manager',
    phone: '111-222-3333',
    email: 'sarah@hotel.com',
  },
  {
    id: '2',
    name: 'James Brown',
    role: 'receptionist',
    phone: '444-555-6666',
    email: 'james@hotel.com',
  },
  {
    id: '3',
    name: 'Emily Davis',
    role: 'housekeeper',
    phone: '777-888-9999',
    email: 'emily@hotel.com',
  },
];