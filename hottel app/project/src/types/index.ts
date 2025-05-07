export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff';
}

export interface Room {
  id: string;
  number: string;
  type: 'single' | 'double' | 'suite' | 'deluxe';
  price: number;
  capacity: number;
  amenities: string[];
  status: 'available' | 'booked' | 'maintenance';
  image: string;
}

export interface Booking {
  id: string;
  roomId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface Staff {
  id: string;
  name: string;
  role: 'manager' | 'receptionist' | 'housekeeper' | 'maintenance';
  phone: string;
  email: string;
}