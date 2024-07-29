import React, { createContext, useState, useContext, useEffect } from 'react';

const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [plans, setPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);

  useEffect(() => {
    const savedPlans = JSON.parse(localStorage.getItem('plans')) || [];
    setPlans(savedPlans);
  }, []);

  useEffect(() => {
    localStorage.setItem('plans', JSON.stringify(plans));
  }, [plans]);

  return (
    <PlanContext.Provider value={{ plans, setPlans, editingPlan, setEditingPlan }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  return useContext(PlanContext);
}
