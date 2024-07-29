import React from 'react';
import { toast } from 'react-toastify';


const PlanForm = ({ formPlan, setFormPlan, onSave, isEditing, onClose }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormPlan((prev) => ({
      ...prev,
      [name]: name === 'price' ? value : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formPlan);
    let priceConvert = String(formPlan?.price)?.replace(',', '.') || 0;
    const price = parseFloat(priceConvert);
    if (!formPlan.name || !formPlan.coverage || isNaN(price) || price <= 0) {
      toast.error('Por favor, preencha todos os campos corretamente.');
      return;
    }
    formPlan.price = price;
    onSave({ ...formPlan });
    toast.success(isEditing ? 'Plano atualizado com sucesso!' : 'Plano adicionado com sucesso!');
  };

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
      >
        &times;
      </button>
      <form onSubmit={handleSubmit}>
        <h3 className="text-xl font-semibold mb-4">{isEditing ? 'Editar Plano' : 'Adicionar Novo Plano'}</h3>
        <input
          type="text"
          name="name"
          value={formPlan.name}
          onChange={handleChange}
          placeholder="Nome do Plano"
          className="border p-2 mb-4 w-full"
        />
        <input
          type="text"
          name="coverage"
          value={formPlan.coverage}
          onChange={handleChange}
          placeholder="Cobertura"
          className="border p-2 mb-4 w-full"
        />
        <input
          type="text"
          name="price"
          value={formPlan.price}
          onChange={handleChange}
          placeholder="Preço"
          className="border p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          {isEditing ? 'Atualizar Plano' : 'Adicionar Plano'}
        </button>
      </form>
    </div>
  );
};

export default PlanForm;
