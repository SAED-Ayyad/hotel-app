import React from 'react';

interface InputProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'date';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  id?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  error,
  id,
}) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="mb-4">
      <label 
        htmlFor={inputId} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={inputId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;