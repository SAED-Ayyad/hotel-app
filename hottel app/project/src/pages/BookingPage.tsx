import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { rooms } from '../data/mockData';
import { Room } from '../types';
import BookingForm, { BookingFormData } from '../components/booking/BookingForm';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';

const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>();
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);
  
  // Check for room ID in URL parameters
  useEffect(() => {
    const roomId = searchParams.get('roomId');
    if (roomId) {
      const room = rooms.find(r => r.id === roomId);
      if (room && room.status === 'available') {
        setSelectedRoom(room);
      }
    }
  }, [searchParams]);
  
  const handleSubmit = (formData: BookingFormData) => {
    // In a real app, we would send this to an API
    console.log('Booking submitted:', formData);
    
    // For demo purposes, we'll just show a success message
    setBookingData(formData);
    setBookingComplete(true);
    
    // In a real app, we would update the room status to booked
    // and create a new booking record in the database
  };
  
  const handleNewBooking = () => {
    setBookingComplete(false);
    setBookingData(null);
    setSelectedRoom(undefined);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Book Your Stay</h1>
        <p className="mt-2 text-lg text-gray-600">
          Complete the form below to reserve your room
        </p>
      </div>
      
      {bookingComplete ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <div className="bg-green-100 rounded-full p-3">
                <svg 
                  className="h-8 w-8 text-green-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-center text-gray-800">
              Booking Confirmed!
            </h2>
          </CardHeader>
          
          <CardBody>
            {bookingData && (
              <div className="space-y-4">
                <p className="text-gray-700">
                  Thank you for your booking, <span className="font-medium">{bookingData.customerName}</span>!
                </p>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium text-gray-800 mb-2">Booking Details:</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium">Check-in:</span> {new Date(bookingData.checkInDate).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">Check-out:</span> {new Date(bookingData.checkOutDate).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">Room:</span> {selectedRoom ? `${selectedRoom.number} (${selectedRoom.type})` : bookingData.roomId}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span> {bookingData.customerEmail}
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md text-blue-800">
                  <p className="font-medium">What's Next?</p>
                  <p className="text-sm mt-1">
                    A confirmation email has been sent to {bookingData.customerEmail} with all the details.
                    If you have any questions, feel free to contact us.
                  </p>
                </div>
                
                <div className="flex justify-center mt-6">
                  <Button variant="primary" onClick={handleNewBooking}>
                    Make Another Booking
                  </Button>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      ) : (
        <div>
          {selectedRoom && (
            <div className="mb-6 bg-blue-50 p-4 rounded-md flex items-center justify-between">
              <div>
                <h3 className="font-medium text-blue-800">Selected Room: {selectedRoom.number}</h3>
                <p className="text-sm text-gray-600">
                  {selectedRoom.type} - ${selectedRoom.price}/night
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/booking')}
              >
                Change Room
              </Button>
            </div>
          )}
          
          <BookingForm 
            rooms={rooms} 
            selectedRoom={selectedRoom} 
            onSubmit={handleSubmit} 
          />
        </div>
      )}
    </div>
  );
};

export default BookingPage;