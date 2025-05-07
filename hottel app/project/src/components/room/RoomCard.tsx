import React from 'react';
import { Room } from '../../types';
import Card, { CardBody, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface RoomCardProps {
  room: Room;
  isAdmin?: boolean;
  onEdit?: (room: Room) => void;
  onDelete?: (roomId: string) => void;
  onBook?: (room: Room) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ 
  room, 
  isAdmin = false, 
  onEdit, 
  onDelete,
  onBook
}) => {
  const statusVariant = {
    available: 'success',
    booked: 'danger',
    maintenance: 'warning',
  } as const;

  return (
    <Card className="h-full flex flex-col">
      <div className="relative h-48">
        <img 
          src={room.image} 
          alt={`Room ${room.number}`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={statusVariant[room.status]}>
            {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
          </Badge>
        </div>
      </div>
      
      <CardBody className="flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">Room {room.number}</h3>
          <span className="text-lg font-bold text-blue-800">${room.price}/night</span>
        </div>
        
        <p className="text-gray-600 capitalize mb-2">
          {room.type} Room - {room.capacity} {room.capacity > 1 ? 'Persons' : 'Person'}
        </p>
        
        <div className="mt-2">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Amenities:</h4>
          <div className="flex flex-wrap gap-1">
            {room.amenities.map((amenity, index) => (
              <span 
                key={index} 
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </CardBody>
      
      <CardFooter className="bg-gray-50">
        {isAdmin ? (
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEdit && onEdit(room)}
              fullWidth
            >
              Edit
            </Button>
            <Button 
              variant="danger" 
              size="sm" 
              onClick={() => onDelete && onDelete(room.id)}
              fullWidth
            >
              Delete
            </Button>
          </div>
        ) : (
          <Button 
            variant={room.status === 'available' ? 'primary' : 'secondary'} 
            size="md" 
            fullWidth
            disabled={room.status !== 'available'}
            onClick={() => onBook && room.status === 'available' && onBook(room)}
          >
            {room.status === 'available' ? 'Book Now' : 'Unavailable'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default RoomCard;