import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Table } from '../types';

type TableState = {
  tables: Table[];
  addTable: (number: number) => void;
  removeTable: (id: string) => void;
  getTableByNumber: (number: number) => Table | undefined;
};

// Sample data
const mockTables: Table[] = [
  { id: '1', number: 1, qrCode: '1' },
  { id: '2', number: 2, qrCode: '2' },
  { id: '3', number: 3, qrCode: '3' },
  { id: '4', number: 4, qrCode: '4' },
];

const useTableStore = create<TableState>()(
  persist(
    (set, get) => ({
      tables: mockTables,
      addTable: (number) => {
        const id = crypto.randomUUID();
        set((state) => ({
          tables: [
            ...state.tables,
            { id, number, qrCode: number.toString() },
          ],
        }));
      },
      removeTable: (id) =>
        set((state) => ({
          tables: state.tables.filter((table) => table.id !== id),
        })),
      getTableByNumber: (number) => {
        return get().tables.find((table) => table.number === number);
      },
    }),
    {
      name: 'table-storage',
    }
  )
);

export default useTableStore;