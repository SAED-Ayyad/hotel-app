import React, { useState } from 'react';
import { staffMembers as initialStaff } from '../../data/mockData';
import { Staff } from '../../types';
import Card, { CardHeader, CardBody, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Badge from '../../components/ui/Badge';
import { PlusCircle, UserPlus, Search, X, Edit, UserX, Mail, Phone } from 'lucide-react';

const StaffPage: React.FC = () => {
  const [staff, setStaff] = useState<Staff[]>(initialStaff);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  
  // New staff form state
  const [newStaff, setNewStaff] = useState<Partial<Staff>>({
    name: '',
    role: 'receptionist',
    phone: '',
    email: '',
  });
  
  // Filter staff based on search and role filter
  const filteredStaff = staff.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter ? member.role === roleFilter : true;
    
    return matchesSearch && matchesRole;
  });
  
  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.email) return;
    
    const staffMember: Staff = {
      id: Date.now().toString(),
      name: newStaff.name || '',
      role: newStaff.role as Staff['role'] || 'receptionist',
      phone: newStaff.phone || '',
      email: newStaff.email || '',
    };
    
    setStaff([...staff, staffMember]);
    setShowAddForm(false);
    setNewStaff({
      name: '',
      role: 'receptionist',
      phone: '',
      email: '',
    });
  };
  
  const handleUpdateStaff = () => {
    if (!editingStaff || !editingStaff.name || !editingStaff.email) return;
    
    setStaff(staff.map(member => 
      member.id === editingStaff.id ? editingStaff : member
    ));
    
    setEditingStaff(null);
  };
  
  const handleDeleteStaff = (staffId: string) => {
    setStaff(staff.filter(member => member.id !== staffId));
  };
  
  const handleNewStaffChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewStaff({ ...newStaff, [name]: value });
  };
  
  const handleEditingStaffChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!editingStaff) return;
    
    const { name, value } = e.target;
    setEditingStaff({ ...editingStaff, [name]: value });
  };
  
  // Role badge color mapping
  const roleBadgeColor = {
    manager: 'primary',
    receptionist: 'success',
    housekeeper: 'warning',
    maintenance: 'info',
  } as const;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600">Manage hotel staff and assignments</p>
        </div>
        
        <Button 
          variant="primary" 
          onClick={() => {
            setShowAddForm(!showAddForm);
            // Close editing form if open
            if (editingStaff) setEditingStaff(null);
          }}
        >
          <UserPlus className="h-5 w-5 mr-1" />
          Add Staff Member
        </Button>
      </div>
      
      {/* Add Staff Form */}
      {showAddForm && (
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-800">Add New Staff Member</h2>
          </CardHeader>
          
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="name"
                value={newStaff.name || ''}
                onChange={handleNewStaffChange}
                required
              />
              
              <Select
                label="Role"
                name="role"
                value={newStaff.role || 'receptionist'}
                onChange={handleNewStaffChange}
                options={[
                  { value: 'manager', label: 'Manager' },
                  { value: 'receptionist', label: 'Receptionist' },
                  { value: 'housekeeper', label: 'Housekeeper' },
                  { value: 'maintenance', label: 'Maintenance' },
                ]}
              />
              
              <Input
                label="Phone Number"
                name="phone"
                value={newStaff.phone || ''}
                onChange={handleNewStaffChange}
              />
              
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={newStaff.email || ''}
                onChange={handleNewStaffChange}
                required
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
                onClick={handleAddStaff}
              >
                Add Staff Member
              </Button>
            </div>
          </CardBody>
        </Card>
      )}
      
      {/* Edit Staff Form */}
      {editingStaff && (
        <Card className="mb-8">
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Edit Staff Member</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setEditingStaff(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="name"
                value={editingStaff.name}
                onChange={handleEditingStaffChange}
                required
              />
              
              <Select
                label="Role"
                name="role"
                value={editingStaff.role}
                onChange={handleEditingStaffChange}
                options={[
                  { value: 'manager', label: 'Manager' },
                  { value: 'receptionist', label: 'Receptionist' },
                  { value: 'housekeeper', label: 'Housekeeper' },
                  { value: 'maintenance', label: 'Maintenance' },
                ]}
              />
              
              <Input
                label="Phone Number"
                name="phone"
                value={editingStaff.phone}
                onChange={handleEditingStaffChange}
              />
              
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={editingStaff.email}
                onChange={handleEditingStaffChange}
                required
              />
            </div>
            
            <div className="flex justify-end mt-6 space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setEditingStaff(null)}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={handleUpdateStaff}
              >
                Update Staff Member
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
                  placeholder="Search staff..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Roles</option>
              <option value="manager">Manager</option>
              <option value="receptionist">Receptionist</option>
              <option value="housekeeper">Housekeeper</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </CardBody>
      </Card>
      
      {/* Staff List */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-800">Staff Members</h2>
        </CardHeader>
        
        <CardBody>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStaff.map(member => (
                  <tr key={member.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {member.name}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={roleBadgeColor[member.role]}>
                        {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                      </Badge>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {member.email}
                        </div>
                        {member.phone && (
                          <div className="text-sm text-gray-500 flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            {member.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingStaff(member)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteStaff(member.id)}
                        >
                          <UserX className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filteredStaff.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                      No staff members found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardBody>
        
        <CardFooter className="bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing {filteredStaff.length} of {staff.length} staff members
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setShowAddForm(true);
                if (editingStaff) setEditingStaff(null);
              }}
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              Add Staff
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StaffPage;