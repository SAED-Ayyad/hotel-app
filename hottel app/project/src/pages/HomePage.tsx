import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { rooms } from '../data/mockData';
import { Room } from '../types';
import RoomCard from '../components/room/RoomCard';
import Button from '../components/ui/Button';
import { SearchIcon } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRoomType, setSelectedRoomType] = useState<string>('');
  
  const roomTypes = ['single', 'double', 'suite', 'deluxe'];
  
  const filteredRooms = selectedRoomType 
    ? rooms.filter(room => room.type === selectedRoomType) 
    : rooms;
  
  const handleBookRoom = (room: Room) => {
    navigate(`/booking?roomId=${room.id}`);
  };
  
  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-blue-800 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg')"
          }}
        />
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Experience Luxury & Comfort
          </h1>
          <p className="mt-6 text-xl max-w-3xl">
            Book your stay at our premium hotel and enjoy world-class amenities, exceptional service, and unforgettable experiences.
          </p>
          <div className="mt-10">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate('/booking')}
            >
              Book Your Stay Now
            </Button>
          </div>
        </div>
      </div>
      
      {/* Featured Rooms */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Premium Rooms
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
            Choose from our selection of luxurious rooms designed for your comfort and convenience.
          </p>
        </div>
        
        {/* Room Type Filter */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <Button 
            variant={selectedRoomType === '' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setSelectedRoomType('')}
          >
            All Rooms
          </Button>
          
          {roomTypes.map(type => (
            <Button 
              key={type} 
              variant={selectedRoomType === type ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setSelectedRoomType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>
        
        {/* Room Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredRooms.map(room => (
            <RoomCard
              key={room.id}
              room={room}
              onBook={handleBookRoom}
            />
          ))}
        </div>
      </div>
      
      {/* Features Section */}
      <div className="bg-gray-50 py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose Our Hotel?
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              We offer the perfect blend of luxury, comfort, and convenience for all our guests.
            </p>
          </div>
          
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-800 text-white">
                <SearchIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-medium text-gray-900">Prime Location</h3>
              <p className="mt-2 text-base text-gray-500">
                Situated in the heart of the city with easy access to attractions, shopping, and dining.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-800 text-white">
                <SearchIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-medium text-gray-900">Luxurious Amenities</h3>
              <p className="mt-2 text-base text-gray-500">
                Enjoy our premium amenities including spa, fitness center, pool, and fine dining restaurant.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-800 text-white">
                <SearchIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-medium text-gray-900">Exceptional Service</h3>
              <p className="mt-2 text-base text-gray-500">
                Our staff is dedicated to providing personalized service to make your stay memorable.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call To Action */}
      <div className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            <span className="block">Ready to experience luxury?</span>
            <span className="block text-yellow-400">Book your stay today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => navigate('/booking')}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;