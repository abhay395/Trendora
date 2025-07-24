import React, { useState } from 'react';

export default function AddressSection() {
  const [showForm, setShowForm] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      id: 'address1',
      name: 'Lydia George',
      address: '2345 Glacier View Dr, Eagle River, Alaska 99577, USA',
    },
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState('address1');
  const [newName, setNewName] = useState('');
  const [newAddress, setNewAddress] = useState('');

  const handleAddAddress = (e) => {
    e.preventDefault();

    const newId = `address${addresses.length + 1}`;
    const newEntry = {
      id: newId,
      name: newName,
      address: newAddress,
    };

    setAddresses([...addresses, newEntry]);
    setSelectedAddressId(newId);
    setNewName('');
    setNewAddress('');
    setShowForm(false);
  };

  return (
    <div className="w-full px-5 py-6 rounded-xl border border-gray-200 space-y-6">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-lg text-gray-900">Select A Delivery Address</span>
        <span
          className="font-semibold cursor-pointer text-[1rem] text-gray-600 hover:underline"
          onClick={() => setShowForm(prev => !prev)}
        >
          {showForm ? 'Cancel' : 'Add Address'}
        </span>
      </div>

      {addresses.map(addr => (
        <div key={addr.id} className="flex items-start space-x-3">
          <input
            type="radio"
            name="address"
            id={addr.id}
            className="w-5 h-5 mt-1 accent-black"
            checked={selectedAddressId === addr.id}
            onChange={() => setSelectedAddressId(addr.id)}
          />
          <label htmlFor={addr.id} className="space-y-1">
            <p className="font-semibold text-[1.02rem] text-gray-800">{addr.name}</p>
            <p className="text-[0.9rem] font-medium text-gray-500">{addr.address}</p>
          </label>
        </div>
      ))}

      {showForm && (
        <form onSubmit={handleAddAddress} className="space-y-4 pt-4 border-t border-gray-300">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
              placeholder="Ex. John Doe"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              // value={newName}
              // onChange={(e) => setNewName(e.target.value)}
              required
              placeholder="Ex. 9549123546"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Pincode</label>
            <input
              type="text"
              // value={newName}
              // onChange={(e) => setNewName(e.target.value)}
              required
              placeholder="Ex. 36001"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            />
          </div>
          <div className='grid grid-cols-2 gap-x-4'>
            <div className="flex flex-col ">
              <label className="text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                // value={newName}
                // onChange={(e) => setNewName(e.target.value)}
                required
                placeholder="Ex. Rajasthan"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                // value={newName}
                // onChange={(e) => setNewName(e.target.value)}
                required
                placeholder="Ex. Jaipur"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Full Address</label>
            <textarea
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              required
              placeholder="Ex.  1234 Main St"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Save Address
          </button>
        </form>
      )}
    </div>
  );
}
