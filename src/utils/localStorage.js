export const savePaymentToLocalStorage = (payment) => {
  localStorage.setItem('payment', JSON.stringify(payment));
};

export const loadPaymentFromLocalStorage = () => {
  const payment = localStorage.getItem('payment');
  return payment ? JSON.parse(payment) : null;
};


export const savePlansToLocalStorage = (plans) => {
  localStorage.setItem('plans', JSON.stringify(plans));
};

export const loadPlansFromLocalStorage = () => {
  const plans = localStorage.getItem('plans');
  return plans ? JSON.parse(plans) : [];
};


export const saveCurrentPlanToLocalStorage = (plan) => {
  localStorage.setItem('currentPlan', JSON.stringify(plan));
};

export const loadCurrentPlanFromLocalStorage = () => {
  const plan = localStorage.getItem('currentPlan');
  return plan ? JSON.parse(plan) : null;
};

export const saveThemeToLocalStorage = (isDarkMode) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', JSON.stringify(isDarkMode));
  }
};

export const loadThemeFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const theme = localStorage.getItem('theme');
    return theme ? JSON.parse(theme) : null;
  }
  return null;
};

