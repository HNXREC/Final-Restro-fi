import React, { useState } from 'react';
import { PlusCircle, Printer, QrCode } from 'lucide-react';
import useTableStore from '../../store/tableStore';
import useAuthStore from '../../store/authStore';
import QRCodeGenerator from '../../components/QRCodeGenerator';

const TablesPage: React.FC = () => {
  const { tables, addTable, removeTable } = useTableStore();
  const { user } = useAuthStore();
  const [newTableNumber, setNewTableNumber] = useState('');
  const [showForm, setShowForm] = useState(false);
  
  const handleAddTable = () => {
    const tableNum = parseInt(newTableNumber);
    if (isNaN(tableNum) || tableNum <= 0) {
      alert('Please enter a valid table number');
      return;
    }
    
    const existingTable = tables.find(t => t.number === tableNum);
    if (existingTable) {
      alert('A table with this number already exists');
      return;
    }
    
    addTable(tableNum);
    setNewTableNumber('');
    setShowForm(false);
  };
  
  const handleRemoveTable = (id: string) => {
    if (window.confirm('Are you sure you want to remove this table?')) {
      removeTable(id);
    }
  };
  
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Tables & QR Codes</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-burgundy-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-burgundy-700"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Table
          </button>
        </div>
        
        <p className="mt-2 text-gray-600">
          Generate and manage QR codes for each table in your restaurant.
        </p>
        
        {/* Add Table Form */}
        {showForm && (
          <div className="mt-6 bg-white shadow rounded-md p-4">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Add New Table</h2>
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <label htmlFor="tableNumber" className="block text-sm font-medium text-gray-700">
                  Table Number
                </label>
                <input
                  type="number"
                  id="tableNumber"
                  value={newTableNumber}
                  onChange={(e) => setNewTableNumber(e.target.value)}
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy-500 focus:ring-burgundy-500 p-2 border"
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handleAddTable}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-burgundy-600 hover:bg-burgundy-700"
                >
                  Add Table
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* QR Code Grid */}
        <div className="mt-6">
          {tables.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tables.map((table) => (
                <div key={table.id} className="relative">
                  <QRCodeGenerator 
                    table={table} 
                    restaurantName="Ajay Sweet House" 
                  />
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <button
                      onClick={() => window.print()}
                      className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                      title="Print QR Code"
                    >
                      <Printer className="h-4 w-4 text-gray-700" />
                    </button>
                    <button
                      onClick={() => handleRemoveTable(table.id)}
                      className="p-1 bg-red-100 rounded hover:bg-red-200"
                      title="Remove Table"
                    >
                      <QrCode className="h-4 w-4 text-red-700" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white rounded-lg shadow">
              <QrCode className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No tables yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Create your first table to generate a QR code.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setShowForm(true)}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-burgundy-600 hover:bg-burgundy-700"
                >
                  Add Table
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TablesPage;
