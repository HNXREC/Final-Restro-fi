import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Table } from '../types';

interface QRCodeGeneratorProps {
  table: Table;
  restaurantName: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ table }) => {
  // In a real application, this would be your deployed app URL
  const baseUrl = window.location.origin;
  const menuUrl = `${baseUrl}/menu/${table.number}`;
  
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-1">Table #{table.number}</h3>
      <p className="text-sm text-gray-500 mb-4">Ajay Sweet House</p>
      
      <div className="bg-white p-3 rounded-lg border-2 border-burgundy-100">
        <QRCodeSVG 
          value={menuUrl} 
          size={150} 
          bgColor="#FFFFFF"
          fgColor="#000000"
          level="H" 
          includeMargin={true}
        />
      </div>
      
      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>Scan to access menu</p>
        <p className="mt-1 text-burgundy-600 break-all">{menuUrl}</p>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
