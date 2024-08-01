import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const PlanList = ({ plans, onEdit, onDelete }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-black'} shadow-md rounded-lg`}>
        <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <tr>
            <th className="border p-2 sm:p-4 text-left">Nome</th>
            <th className="border p-2 sm:p-4 text-left">Cobertura</th>
            <th className="border p-2 sm:p-4 text-left">Preço</th>
            <th className="border p-2 sm:p-4 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.id} className={`hover:${isDarkMode ? 'bg-gray-600' : 'bg-gray-50'} transition-colors duration-200`}>
              <td className="border p-2 sm:p-4">{plan.name}</td>
              <td className="border p-2 sm:p-4">{plan.coverage}</td>
              <td className="border p-2 sm:p-4">{`R$ ${plan.price.toFixed(2)}`}</td>
              <td className="border p-2 sm:p-4 flex flex-col sm:flex-row items-center">
                <button
                  onClick={() => onEdit(plan)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-full flex items-center mb-2 sm:mb-0 sm:mr-2 transition-colors duration-200"
                >
                  <FiEdit className="mr-1" /> Editar
                </button>
                <button
                  onClick={() => onDelete(plan.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-full flex items-center transition-colors duration-200"
                >
                  <FiTrash2 className="mr-1" /> Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanList;
