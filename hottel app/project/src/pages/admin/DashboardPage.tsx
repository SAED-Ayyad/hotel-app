import React from 'react';
import { rooms, bookings, staffMembers } from '../../data/mockData';
import Card, { CardHeader, CardBody } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import BookingList from '../../components/booking/BookingList';
import { 
  Bed, 
  CalendarCheck, 
  Users, 
  DollarSign,
  BarChart,
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  // Calculate dashboard statistics
  const availableRooms = rooms.filter(room => room.status === 'available').length;
  const bookedRooms = rooms.filter(room => room.status === 'booked').length;
  const totalRooms = rooms.length;
  
  const occupancyRate = Math.round((bookedRooms / totalRooms) * 100);
  
  const totalRevenue = bookings
    .filter(booking => booking.status !== 'cancelled')
    .reduce((sum, booking) => sum + booking.totalPrice, 0);
  
  const upcomingBookings = bookings
    .filter(booking => 
      booking.status === 'confirmed' && 
      new Date(booking.checkInDate) > new Date()
    );
  
  const handleViewBookingDetails = (booking: any) => {
    console.log('View booking details:', booking);
    // In a real app, this would navigate to a booking details page
  };
  
  const handleUpdateBookingStatus = (booking: any, status: any) => {
    console.log('Update booking status:', booking, status);
    // In a real app, this would update the booking status in the database
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your hotel.</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Occupancy Stat */}
        <Card>
          <CardBody className="flex items-center p-6">
            <div className="p-3 rounded-full bg-blue-100 text-blue-800 mr-4">
              <Bed className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
              <div className="flex items-center">
                <p className="text-2xl font-semibold text-gray-900">{occupancyRate}%</p>
                <Badge 
                  variant={occupancyRate > 70 ? 'success' : occupancyRate > 30 ? 'warning' : 'danger'}
                  className="ml-2"
                >
                  {bookedRooms}/{totalRooms} rooms
                </Badge>
              </div>
            </div>
          </CardBody>
        </Card>
        
        {/* Available Rooms Stat */}
        <Card>
          <CardBody className="flex items-center p-6">
            <div className="p-3 rounded-full bg-green-100 text-green-800 mr-4">
              <CalendarCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Available Rooms</p>
              <p className="text-2xl font-semibold text-gray-900">{availableRooms}</p>
            </div>
          </CardBody>
        </Card>
        
        {/* Staff Stat */}
        <Card>
          <CardBody className="flex items-center p-6">
            <div className="p-3 rounded-full bg-purple-100 text-purple-800 mr-4">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active Staff</p>
              <p className="text-2xl font-semibold text-gray-900">{staffMembers.length}</p>
            </div>
          </CardBody>
        </Card>
        
        {/* Revenue Stat */}
        <Card>
          <CardBody className="flex items-center p-6">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-800 mr-4">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">${totalRevenue}</p>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Bookings */}
        <div className="lg:col-span-2">
          <BookingList 
            bookings={upcomingBookings}
            rooms={rooms}
            onViewDetails={handleViewBookingDetails}
            onUpdateStatus={handleUpdateBookingStatus}
          />
        </div>
        
        {/* Room Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Room Status</h2>
              <BarChart className="h-5 w-5 text-gray-400" />
            </div>
          </CardHeader>
          
          <CardBody>
            <div className="space-y-4">
              {/* Room Status Chart (simplified version) */}
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-800" 
                  style={{ width: `${occupancyRate}%` }}
                ></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-800">{bookedRooms}</p>
                  <p className="text-sm text-gray-600">Booked</p>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{availableRooms}</p>
                  <p className="text-sm text-gray-600">Available</p>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">
                    {rooms.filter(room => room.status === 'maintenance').length}
                  </p>
                  <p className="text-sm text-gray-600">Maintenance</p>
                </div>
              </div>
              
              {/* Room Types */}
              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Room Types</h3>
                <div className="space-y-2">
                  {['single', 'double', 'suite', 'deluxe'].map(type => {
                    const count = rooms.filter(room => room.type === type).length;
                    const percentage = Math.round((count / totalRooms) * 100);
                    
                    return (
                      <div key={type} className="flex items-center">
                        <span className="text-sm capitalize w-16">{type}</span>
                        <div className="flex-1 mx-2">
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-full bg-blue-600 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-600">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;