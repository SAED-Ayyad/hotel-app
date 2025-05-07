import React, { useState, useEffect } from 'react';
import { Room } from '../../types';
import Card, { CardHeader, CardBody, CardFooter } from '../ui/Card';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

interface BookingFormProps {
  rooms: Room[];
  selectedRoom?: Room;
  onSubmit: (formData: BookingFormData) => void;
}

export interface BookingFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
}

const BookingForm: React.FC<BookingFormProps> = ({
  rooms,
  selectedRoom,
  onSubmit,
}) => {
  const availableRooms = rooms.filter(room => room.status === 'available');
  
  const [formData, setFormData] = useState<BookingFormData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    roomId: selectedRoom?.id || '',
    checkInDate: '',
    checkOutDate: '',
  });
  
  const [errors, setErrors] = useState<Partial<BookingFormData>>({});
  
  // Update form if a selected room is provided
  useEffect(() => {
    if (selectedRoom) {
      setFormData(prev => ({ ...prev, roomId: selectedRoom.id }));
    }
  }, [selectedRoom]);
  
  // Get tomorrow's date formatted for date input
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };
  
  // Get date 2 days from now formatted for date input
  const getDayAfterTomorrowDate = () => {
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    return dayAfter.toISOString().split('T')[0];
  };
  
  // Set minimum dates for check-in and check-out
  useEffect(() => {
    if (!formData.checkInDate) {
      setFormData(prev => ({
        ...prev,
        checkInDate: getTomorrowDate(),
        checkOutDate: getDayAfterTomorrowDate(),
      }));
    }
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is modified
    if (errors[name as keyof BookingFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Partial<BookingFormData> = {};
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }
    
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Please enter a valid email';
    }
    
    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Phone is required';
    }
    
    if (!formData.roomId) {
      newErrors.roomId = 'Please select a room';
    }
    
    if (!formData.checkInDate) {
      newErrors.checkInDate = 'Check-in date is required';
    }
    
    if (!formData.checkOutDate) {
      newErrors.checkOutDate = 'Check-out date is required';
    } else if (new Date(formData.checkOutDate) <= new Date(formData.checkInDate)) {
      newErrors.checkOutDate = 'Check-out must be after check-in';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800">Book Your Stay</h2>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Your Name"
              id="customerName"
              value={formData.customerName}
              onChange={handleChange}
              error={errors.customerName}
              required
            />
            
            <Input
              label="Email Address"
              type="email"
              id="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              error={errors.customerEmail}
              required
            />
            
            <Input
              label="Phone Number"
              type="tel"
              id="customerPhone"
              value={formData.customerPhone}
              onChange={handleChange}
              error={errors.customerPhone}
              required
            />
            
            <Select
              label="Room Type"
              id="roomId"
              options={availableRooms.map(room => ({
                value: room.id,
                label: `Room ${room.number} - ${room.type} ($${room.price}/night)`
              }))}
              value={formData.roomId}
              onChange={handleChange}
              error={errors.roomId}
              required
            />
            
            <Input
              label="Check-in Date"
              type="date"
              id="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              error={errors.checkInDate}
              required
            />
            
            <Input
              label="Check-out Date"
              type="date"
              id="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              error={errors.checkOutDate}
              required
            />
          </div>
          
          {selectedRoom && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <h3 className="font-medium text-blue-800">Selected Room Details</h3>
              <p className="text-gray-700">
                Room {selectedRoom.number} - {selectedRoom.type}, ${selectedRoom.price}/night
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Capacity: {selectedRoom.capacity} {selectedRoom.capacity > 1 ? 'persons' : 'person'}
              </p>
            </div>
          )}
        </CardBody>
        
        <CardFooter>
          <Button type="submit" variant="primary" fullWidth>
            Complete Booking
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default BookingForm;