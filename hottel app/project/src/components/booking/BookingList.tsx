import React from 'react';
import { Booking, Room } from '../../types';
import Badge from '../ui/Badge';
import Card, { CardHeader, CardBody } from '../ui/Card';
import Button from '../ui/Button';

interface BookingListProps {
  bookings: Booking[];
  rooms: Room[];
  onViewDetails: (booking: Booking) => void;
  onUpdateStatus: (booking: Booking, status: Booking['status']) => void;
}

const BookingList: React.FC<BookingListProps> = ({
  bookings,
  rooms,
  onViewDetails,
  onUpdateStatus,
}) => {
  // Helper to find room by ID
  const findRoom = (roomId: string): Room | undefined => {
    return rooms.find(room => room.id === roomId);
  };
  
  // Status badge variant mapping
  const statusVariant = {
    confirmed: 'success',
    pending: 'warning',
    cancelled: 'danger',
    completed: 'info',
  } as const;

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800">Recent Bookings</h2>
      </CardHeader>
      
      <CardBody>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map(booking => {
                const room = findRoom(booking.roomId);
                
                return (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.customerName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.customerEmail}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      {room ? (
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            Room {room.number}
                          </div>
                          <div className="text-sm text-gray-500 capitalize">
                            {room.type}
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Room not found</span>
                      )}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(booking.checkInDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        to {new Date(booking.checkOutDate).toLocaleDateString()}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${booking.totalPrice}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={statusVariant[booking.status]}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onViewDetails(booking)}
                        >
                          View
                        </Button>
                        
                        {booking.status === 'pending' && (
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => onUpdateStatus(booking, 'confirmed')}
                          >
                            Confirm
                          </Button>
                        )}
                        
                        {(booking.status === 'pending' || booking.status === 'confirmed') && (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => onUpdateStatus(booking, 'cancelled')}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};

export default BookingList;