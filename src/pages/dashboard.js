import React from 'react';
import Navbar from '../components/Navbar';
import PlanList from '../components/PlanList';
import PlanForm from '../components/PlanForm';
import { usePlan } from '../context/PlanContext';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

function Dashboard() {
  const { plans, setPlans, editingPlan, setEditingPlan } = usePlan();
  const [isAddingPlan, setIsAddingPlan] = React.useState(false);
  const [formPlan, setFormPlan] = React.useState({
    name: "",
    coverage: "",
    price: "",
  });

  const handleAddPlan = () => {
    if (!formPlan.name || !formPlan.coverage || isNaN(formPlan.price) || formPlan.price <= 0) {
      toast.error('Por favor, preencha todos os campos corretamente.');
      return;
    }

    setPlans([
      ...plans,
      { ...formPlan, id: plans.length ? plans[plans.length - 1].id + 1 : 1 }
    ]);
    resetForm();
  };

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setFormPlan({
      name: plan.name,
      coverage: plan.coverage,
      price: plan.price,
    });
    setIsAddingPlan(true);
  };

  const handleUpdatePlan = () => {
    setPlans(plans.map((p) => p.id === editingPlan.id ? { ...formPlan, id: p.id } : p));
    resetForm();
  };

  const handleSavePlan = () => {
    if (editingPlan) {
      handleUpdatePlan();
    } else {
      handleAddPlan();
    }
  };

  const handleDeletePlan = (id) => {
    setPlans(plans.filter((p) => p.id !== id));
  };

  const resetForm = () => {
    setFormPlan({ name: "", coverage: "", price: "" });
    setEditingPlan(null);
    setIsAddingPlan(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-roboto">
      <Navbar />
      <div className="container mx-auto mt-8 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Dashboard Administrativo</h2>
          <button
            onClick={() => {
              resetForm();
              setIsAddingPlan(true);
            }}
            className="bg-gradient-to-r from-blue-500 to-green-600 hover:from-green-600 hover:to-blue-500 text-white px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Adicionar Novo Plano
          </button>
        </div>
        {isAddingPlan && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <PlanForm
              formPlan={formPlan}
              setFormPlan={setFormPlan}
              onSave={handleSavePlan}
              isEditing={!!editingPlan}
              onClose={resetForm}
            />
          </div>
        )}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <PlanList
            plans={plans}
            onEdit={handleEditPlan}
            onDelete={handleDeletePlan}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
