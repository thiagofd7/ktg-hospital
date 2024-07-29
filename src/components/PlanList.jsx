import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const PlanList = ({ plans, onEdit, onDelete }) => (
  <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
    <thead className="bg-gray-100">
      <tr>
        <th className="border p-4 text-left">Nome</th>
        <th className="border p-4 text-left">Cobertura</th>
        <th className="border p-4 text-left">Preço</th>
        <th className="border p-4 text-left">Ações</th>
      </tr>
    </thead>
    <tbody>
      {plans.map((plan) => (
        <tr key={plan.id} className="hover:bg-gray-50 transition-colors duration-200">
          <td className="border p-4">{plan.name}</td>
          <td className="border p-4">{plan.coverage}</td>
          <td className="border p-4">{`R$ ${plan.price.toFixed(2)}`}</td>
          <td className="border p-4 flex items-center">
            <button
              onClick={() => onEdit(plan)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full flex items-center mr-2 transition-colors duration-200"
            >
              <FiEdit className="mr-1" /> Editar
            </button>
            <button
              onClick={() => onDelete(plan.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full flex items-center transition-colors duration-200"
            >
              <FiTrash2 className="mr-1" /> Excluir
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default PlanList;
