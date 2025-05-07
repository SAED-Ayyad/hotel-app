import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card, { CardHeader, CardBody, CardFooter } from '../components/ui/Card';
import { Hotel } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Admin: admin@hotel.com, Staff: staff@hotel.com (any password)
      const success = await login(email, password);
      
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Hotel className="h-12 w-12 text-blue-800" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            Hotel Manager Admin
          </h2>
          <p className="mt-2 text-gray-600">
            Sign in to your admin account
          </p>
        </div>
        
        <Card>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <CardBody>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}
              
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
              />
              
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              
              <div className="text-sm text-right">
                <a href="#" className="text-blue-800 hover:text-blue-900">
                  Forgot your password?
                </a>
              </div>
            </CardBody>
            
            <CardFooter>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Demo Credentials:</p>
          <p className="font-medium">Email: admin@hotel.com | Password: any</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;