import React, { useState } from 'react';
import { rooms as initialRooms } from '../../data/mockData';
import { Room } from '../../types';
import Card, { CardHeader, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import RoomCard from '../../components/room/RoomCard';
import { PlusCircle, Search, FilterIcon } from 'lucide-react';

const RoomsPage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  
  // New room form state
  const [newRoom, setNewRoom] = useState<Partial<Room>>({
    number: '',
    type: 'single',
    price: 99,
    capacity: 1,
    status: 'available',
    amenities: ['WiFi', 'TV'],
    image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
  });
  
  // Filter rooms based on search and filters
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? room.status === statusFilter : true;
    const matchesType = typeFilter ? room.type === typeFilter : true;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  const handleAddRoom = () => {
    if (!newRoom.number) return;
    
    const room: Room = {
      id: Date.now().toString(),
      number: newRoom.number || '',
      type: newRoom.type as Room['type'] || 'single',
      price: newRoom.price || 99,
      capacity: newRoom.capacity || 1,
      amenities: newRoom.amenities || [],
      status: newRoom.status as Room['status'] || 'available',
      image: newRoom.image || '',
    };
    
    setRooms([...rooms, room]);
    setShowAddForm(false);
    setNewRoom({
      number: '',
      type: 'single',
      price: 99,
      capacity: 1,
      status: 'available',
      amenities: ['WiFi', 'TV'],
      image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
    });
  };
  
  const handleEditRoom = (updatedRoom: Room) => {
    setRooms(rooms.map(room => 
      room.id === updatedRoom.id ? updatedRoom : room
    ));
  };
  
  const handleDeleteRoom = (roomId: string) => {
    setRooms(rooms.filter(room => room.id !== roomId));
  };
  
  const handleNewRoomChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'price' || name === 'capacity') {
      setNewRoom({ ...newRoom, [name]: parseInt(value) || 0 });
    } else {
      setNewRoom({ ...newRoom, [name]: value });
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Room Management</h1>
          <p className="text-gray-600">Manage and organize hotel rooms</p>
        </div>
        
        <Button 
          variant="primary" 
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <PlusCircle className="h-5 w-5 mr-1" />
          Add New Room
        </Button>
      </div>
      
      {/* Add Room Form */}
      {showAddForm && (
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-800">Add New Room</h2>
          </CardHeader>
          
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Room Number"
                name="number"
                value={newRoom.number || ''}
                onChange={handleNewRoomChange}
                required
              />
              
              <Select
                label="Room Type"
                name="type"
                value={newRoom.type || 'single'}
                onChange={handleNewRoomChange}
                options={[
                  { value: 'single', label: 'Single' },
                  { value: 'double', label: 'Double' },
                  { value: 'suite', label: 'Suite' },
                  { value: 'deluxe', label: 'Deluxe' },
                ]}
              />
              
              <Input
                label="Price per Night"
                type="number"
                name="price"
                value={newRoom.price?.toString() || ''}
                onChange={handleNewRoomChange}
              />
              
              <Input
                label="Capacity"
                type="number"
                name="capacity"
                value={newRoom.capacity?.toString() || ''}
                onChange={handleNewRoomChange}
              />
              
              <Select
                label="Status"
                name="status"
                value={newRoom.status || 'available'}
                onChange={handleNewRoomChange}
                options={[
                  { value: 'available', label: 'Available' },
                  { value: 'booked', label: 'Booked' },
                  { value: 'maintenance', label: 'Maintenance' },
                ]}
              />
              
              <Input
                label="Image URL"
                name="image"
                value={newRoom.image || ''}
                onChange={handleNewRoomChange}
              />
            </div>
            
            <div className="flex justify-end mt-6 space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={handleAddRoom}
              >
                Add Room
              </Button>
            </div>
          </CardBody>
        </Card>
      )}
      
      {/* Filters */}
      <Card className="mb-6">
        <CardBody>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search rooms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <FilterIcon className="h-5 w-5 text-gray-400" />
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Statuses</option>
                <option value="available">Available</option>
                <option value="booked">Booked</option>
                <option value="maintenance">Maintenance</option>
              </select>
              
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Types</option>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="suite">Suite</option>
                <option value="deluxe">Deluxe</option>
              </select>
            </div>
          </div>
        </CardBody>
      </Card>
      
      {/* Room Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map(room => (
          <RoomCard
            key={room.id}
            room={room}
            isAdmin={true}
            onEdit={handleEditRoom}
            onDelete={handleDeleteRoom}
          />
        ))}
        
        {filteredRooms.length === 0 && (
          <div className="col-span-full py-8 text-center">
            <p className="text-gray-500">No rooms found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomsPage;