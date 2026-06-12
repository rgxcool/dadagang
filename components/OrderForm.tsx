'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { LoadingButton } from './LoadingButton';

interface OrderFormProps {
  product: Product;
}

export function OrderForm({ product }: OrderFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [addressFromLocation, setAddressFromLocation] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    address: '',
    quantity: '1',
    deliveryTime: '',
    notes: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      errors.customerName = 'Name is required';
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      errors.phoneNumber = 'Phone number must be 10 digits';
    }
    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }
    if (!formData.quantity || parseInt(formData.quantity) < 1) {
      errors.quantity = 'Quantity must be at least 1';
    }
    if (parseInt(formData.quantity) > product.stock) {
      errors.quantity = `Cannot exceed available stock (${product.stock})`;
    }
    if (!formData.deliveryTime) {
      errors.deliveryTime = 'Delivery time is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setIsLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude, lng: longitude });
        setAddressFromLocation(`Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`);
        setIsLoading(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        setError(`Unable to get your location: ${error.message}`);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const quantity = parseInt(formData.quantity);
      const totalPrice = (product.price + product.deliveryCharge) * quantity;

      const orderPayload = {
        productId: product.id,
        productName: product.name,
        price: product.price,
        deliveryCharge: product.deliveryCharge,
        quantity,
        customerName: formData.customerName,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        latitude: coordinates?.lat,
        longitude: coordinates?.lng,
        deliveryTime: formData.deliveryTime,
        notes: formData.notes,
        totalPrice,
      };

      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to place order');
      }

      const data = await response.json();
      router.push(`/success?orderId=${data.orderId}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Customer Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          placeholder="John Doe"
        />
        {validationErrors.customerName && (
          <p className="text-red-600 text-sm mt-1">{validationErrors.customerName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          placeholder="1234567890"
        />
        {validationErrors.phoneNumber && (
          <p className="text-red-600 text-sm mt-1">{validationErrors.phoneNumber}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Delivery Address <span className="text-red-500">*</span>
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          placeholder="Enter your delivery address"
        />
        {validationErrors.address && (
          <p className="text-red-600 text-sm mt-1">{validationErrors.address}</p>
        )}
        
        <Button
          type="button"
          onClick={handleGetLocation}
          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white"
        >
          📍 Use Current Location
        </Button>
        
        {coordinates && (
          <p className="text-green-600 text-sm mt-2">
            ✓ Location captured: {addressFromLocation}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quantity <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="quantity"
          min="1"
          max={product.stock}
          value={formData.quantity}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        {validationErrors.quantity && (
          <p className="text-red-600 text-sm mt-1">{validationErrors.quantity}</p>
        )}
        <p className="text-gray-500 text-sm mt-1">Available: {product.stock} units</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Delivery Time <span className="text-red-500">*</span>
        </label>
        <select
          name="deliveryTime"
          value={formData.deliveryTime}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">Select a delivery time</option>
          <option value="ASAP">ASAP (30-45 minutes)</option>
          <option value="1-2 hours">1-2 hours</option>
          <option value="2-3 hours">2-3 hours</option>
          <option value="Evening (6-8 PM)">Evening (6-8 PM)</option>
          <option value="Tomorrow morning">Tomorrow morning</option>
        </select>
        {validationErrors.deliveryTime && (
          <p className="text-red-600 text-sm mt-1">{validationErrors.deliveryTime}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Special Notes (Optional)
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows={2}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          placeholder="Any special instructions..."
        />
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div>
            <p className="text-gray-600 text-sm">Subtotal ({formData.quantity} × ₹{product.price})</p>
            <p className="font-semibold text-gray-800">₹{(product.price * parseInt(formData.quantity || 0))}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Delivery Charge</p>
            <p className="font-semibold text-gray-800">₹{product.deliveryCharge}</p>
          </div>
        </div>
        <div className="border-t pt-2">
          <p className="text-gray-600 text-sm">Total Amount</p>
          <p className="text-2xl font-bold text-green-600">
            ₹{((product.price + product.deliveryCharge) * parseInt(formData.quantity || 0))}
          </p>
        </div>
      </div>

      <LoadingButton
        type="submit"
        isLoading={isLoading}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 text-lg"
      >
        Place Order
      </LoadingButton>
    </form>
  );
}
