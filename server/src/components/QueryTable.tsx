import React from 'react';
import { FaCheck, FaFile, FaCopy, FaList, FaClock } from 'react-icons/fa';

interface QueryTableProps {
  projectId: string;
}

interface Query {
  id: string;
  name: string;
  fileScreening: number;
  totalFiles: number;
  duplicates: number;
  fileSelection: number;
  criteria: number;
  lastModified: string;
}

const QueryTable: React.FC<QueryTableProps> = ({ projectId }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              File screening
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Files
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Duplicates
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              File selection
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Criteria
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Modified
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Table content will be populated later */}
          <tr>
            <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
              No queries yet. Click "New Query" to create one.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default QueryTable; 