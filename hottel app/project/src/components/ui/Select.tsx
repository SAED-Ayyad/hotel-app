import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  error?: string;
  id?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  required = false,
  error,
  id,
}) => {
  const selectId = id || label.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="mb-4">
      <label 
        htmlFor={selectId} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={selectId}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3 py-2 bg-white border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Select;