import React from 'react';

interface TableProps {
  children: React.ReactNode;
}

export const MarkdownTable: React.FC<TableProps> = ({ children }) => {
  return (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        {children}
      </table>
    </div>
  );
};

export const TableHead: React.FC<TableProps> = ({ children }) => {
  return (
    <thead className="bg-gray-50 dark:bg-gray-800">
      {children}
    </thead>
  );
};

export const TableBody: React.FC<TableProps> = ({ children }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
      {children}
    </tbody>
  );
};

export const TableRow: React.FC<TableProps> = ({ children }) => {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      {children}
    </tr>
  );
};

export const TableCell: React.FC<TableProps> = ({ children }) => {
  return (
    <td className="px-6 py-4 whitespace-normal text-sm text-gray-900 dark:text-gray-100">
      {children}
    </td>
  );
};

export const TableHeader: React.FC<TableProps> = ({ children }) => {
  return (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
      {children}
    </th>
  );
}; 