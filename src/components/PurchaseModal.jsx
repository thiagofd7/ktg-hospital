import React, { useState } from "react";
import Modal from "react-modal";
import { useRouter } from "next/router";
import { loadPaymentFromLocalStorage, savePaymentToLocalStorage } from "../utils/localStorage";
import { toast } from "react-toastify";
import { useTheme } from '../context/ThemeContext';

Modal.setAppElement("#__next");

const PurchaseModal = ({ isOpen, onClose, plan }) => {
  const { isDarkMode } = useTheme();
  const localStorageData = loadPaymentFromLocalStorage();
  const formValue = localStorageData?.formData || {};
  if (formValue) {
    formValue.cpf = formValue?.cpf?.replace(/\D/g, '');
  }
  const [formData, setFormData] = useState({
    firstName: formValue?.firstName || "",
    lastName: formValue?.lastName || "",
    email: formValue?.email || "",
    cpf: formValue?.cpf || "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formatCpf = (value) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "cpf" ? formatCpf(value).slice(0, 14) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      savePaymentToLocalStorage({
        purchaseProcess: {
          step: 0,
        },
        formData,
        plan,
      });
      router.push(`/payment/checkout`);
      onClose();
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro ao redirecionar a página de checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Purchase Modal"
      className={`mx-auto my-4 p-6 rounded-lg shadow-lg max-w-md w-full transition-transform transform-gpu ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
      overlayClassName={`fixed inset-0 ${isDarkMode ? 'bg-gray-900 bg-opacity-70' : 'bg-gray-800 bg-opacity-70'} flex items-center justify-center`}
    >
      <h2 className="text-2xl font-extrabold mb-6 text-center">
        Assinar {plan.name}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium mb-1"
          >
            Nome
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-transform transform-gpu ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-600'}`}
            placeholder="Nome"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium mb-1"
          >
            Sobrenome
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-transform transform-gpu ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-600'}`}
            placeholder="Sobrenome"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-transform transform-gpu ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-600'}`}
            placeholder="Email"
          />
        </div>
        <div>
          <label
            htmlFor="cpf"
            className="block text-sm font-medium mb-1"
          >
            CPF
          </label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-transform transform-gpu ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-600'}`}
            placeholder="000.000.000-00"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className={`bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-transform transform-gpu ${isDarkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-500 hover:bg-gray-600'}`}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-transform transform-gpu ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
            disabled={loading}
          >
            {loading ? "Processando..." : "Confirmar Compra"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PurchaseModal;
