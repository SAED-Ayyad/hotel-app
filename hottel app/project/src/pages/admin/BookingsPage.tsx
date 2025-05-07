import React, { useState } from 'react';
import { bookings as initialBookings, rooms } from '../../data/mockData';
import { Booking } from '../../types';
import Card, { CardHeader, CardBody } from '../../components/ui/Card';
import BookingList from '../../components/booking/BookingList';
import Button from '../../components/ui/Button';
import { Calendar, List, Grid, FilterIcon } from 'lucide-react';

const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('upcoming');

  // Filter bookings based on selected filters
  const filteredBookings = bookings.filter(booking => {
    // Filter by status
    const matchesStatus = statusFilter ? booking.status === statusFilter : true;
    
    // Filter by date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let matchesDate = true;
    if (dateFilter === 'upcoming') {
      matchesDate = new Date(booking.checkInDate) >= today;
    } else if (dateFilter === 'past') {
      matchesDate = new Date(booking.checkOutDate) < today;
    } else if (dateFilter === 'today') {
      matchesDate = 
        (new Date(booking.checkInDate).getTime() <= today.getTime() && 
         new Date(booking.checkOutDate).getTime() >= today.getTime());
    }
    
    return matchesStatus && matchesDate;
  });
  
  const handleViewDetails = (booking: Booking) => {
    console.log('View booking details:', booking);
    // In a real app, this would navigate to a booking details page
  };
  
  const handleUpdateStatus = (booking: Booking, status: Booking['status']) => {
    // Update booking status
    const updatedBookings = bookings.map(b => 
      b.id === booking.id ? { ...b, status } : b
    );
    
    setBookings(updatedBookings);
    
    // If cancelling a booking, make the room available again
    if (status === 'cancelled') {
      // In a real app, we would update the room status in the database
      console.log(`Room ${booking.roomId} is now available`);
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-600">Manage guest reservations and bookings</p>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant={viewMode === 'list' ? 'primary' : 'outline'} 
            onClick={() => setViewMode('list')}
          >
            <List className="h-5 w-5 mr-1" />
            List
          </Button>
          <Button 
            variant={viewMode === 'calendar' ? 'primary' : 'outline'} 
            onClick={() => setViewMode('calendar')}
          >
            <Calendar className="h-5 w-5 mr-1" />
            Calendar
          </Button>
        </div>
      </div>
      
      {/* Filters */}
      <Card className="mb-6">
        <CardBody>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center">
              <FilterIcon className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-700">Filters:</span>
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
            
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Dates</option>
              <option value="upcoming">Upcoming</option>
              <option value="today">Today</option>
              <option value="past">Past</option>
            </select>
            
            <div className="ml-auto">
              <span className="text-gray-600">
                {filteredBookings.length} bookings found
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
      
      {/* Bookings List View */}
      {viewMode === 'list' && (
        <BookingList 
          bookings={filteredBookings}
          rooms={rooms}
          onViewDetails={handleViewDetails}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
      
      {/* Calendar View (Simplified) */}
      {viewMode === 'calendar' && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-800">Booking Calendar</h2>
          </CardHeader>
          
          <CardBody className="p-0">
            <div className="p-6 text-center">
              <Grid className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700">Calendar View</h3>
              <p className="text-gray-500 mt-2">
                A full calendar view would be implemented here, showing all bookings in a monthly calendar layout.
              </p>
              <p className="text-gray-500 mt-1">
                This would include check-in/check-out dates, room assignments, and booking status visualization.
              </p>
            </div>
            
            {/* Example of how bookings might be displayed in a calendar */}
            <div className="border-t border-gray-200 px-6 py-4">
              <h3 className="font-medium text-gray-800 mb-3">Today's Check-ins</h3>
              <div className="space-y-2">
                {filteredBookings
                  .filter(booking => new Date(booking.checkInDate).toDateString() === new Date().toDateString())
                  .map(booking => {
                    const room = rooms.find(r => r.id === booking.roomId);
                    
                    return (
                      <div key={booking.id} className="flex justify-between items-center p-2 bg-blue-50 rounded">
                        <div>
                          <span className="font-medium">{booking.customerName}</span>
                          <span className="text-sm text-gray-600 ml-2">
                            Room {room?.number || booking.roomId}
                          </span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDetails(booking)}
                        >
                          Details
                        </Button>
                      </div>
                    );
                  })}
                  
                {filteredBookings.filter(
                  booking => new Date(booking.checkInDate).toDateString() === new Date().toDateString()
                ).length === 0 && (
                  <p className="text-gray-500 text-sm">No check-ins today.</p>
                )}
              </div>
            </div>
            
            <div className="border-t border-gray-200 px-6 py-4">
              <h3 className="font-medium text-gray-800 mb-3">Today's Check-outs</h3>
              <div className="space-y-2">
                {filteredBookings
                  .filter(booking => new Date(booking.checkOutDate).toDateString() === new Date().toDateString())
                  .map(booking => {
                    const room = rooms.find(r => r.id === booking.roomId);
                    
                    return (
                      <div key={booking.id} className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <div>
                          <span className="font-medium">{booking.customerName}</span>
                          <span className="text-sm text-gray-600 ml-2">
                            Room {room?.number || booking.roomId}
                          </span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDetails(booking)}
                        >
                          Details
                        </Button>
                      </div>
                    );
                  })}
                  
                {filteredBookings.filter(
                  booking => new Date(booking.checkOutDate).toDateString() === new Date().toDateString()
                ).length === 0 && (
                  <p className="text-gray-500 text-sm">No check-outs today.</p>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default BookingsPage;