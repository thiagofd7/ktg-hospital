import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import { useTheme } from "../../context/ThemeContext";
import {
  loadPaymentFromLocalStorage,
  savePaymentToLocalStorage,
} from "../../utils/localStorage";
import { toast } from "react-toastify";

const plans = [
  { id: "monthly", name: "Mensal", price: 0, discount: 0, months: 1 },
  { id: "biannual", name: "Semestral", price: 0, discount: 5, months: 6 },
  { id: "annual", name: "Anual", price: 0, discount: 10, months: 12 },
];

const paymentMethods = [
  {
    id: "pix",
    name: "Pix",
    image: "pixIcon.png",
    disabled: false,
  },
  { id: "crypto", name: "Crypto", image: "crypto.png", disabled: true },
];

const CheckoutPage = () => {
  const { isDarkMode } = useTheme();
  const [payment, setPayment] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethods[0]
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadedPayment = loadPaymentFromLocalStorage();
    if (!loadedPayment || loadedPayment?.purchaseProcess?.step !== 0) {
      if (loadedPayment?.purchaseProcess?.step === 1) {
         router.push(`/payment/pay/${loadedPayment.paymentId}`);
         return;
      } else {
        toast.error("Pagamento não encontrado!");
        router.push("/");
        return;
      }
    } else if (loadedPayment.status === "approved") {
      router.push("/payment/success/" + loadedPayment.paymentId);
    }
    setPayment(loadedPayment);
    plans.map((plan) => {
      plan.price = parseFloat(
        Number(loadedPayment.plan.price) * plan.months -
          (Number(loadedPayment.plan.price) * plan.months * plan.discount) / 100
      ).toFixed(2);
    });
    console.log(plans);
    console.log(loadedPayment);
  }, [router]);

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payment.formData,
          planId: payment.plan.id,
          amount: selectedPlan.price,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        result.status = "pending";
        payment.purchaseProcess.step = 1;
        payment.plan.price = Number(selectedPlan.price);
        payment.plan.type = selectedPlan.name;
        payment.plan.months = selectedPlan.months;
        savePaymentToLocalStorage({
          ...result,
          ...payment,
        });
        router.push(`/payment/pay/${result.paymentId}`);
      } else {
        toast.error(result.message || "Erro ao processar pagamento");
      }
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro ao processar pagamento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } font-roboto`}
    >
      {/* Navbar no topo */}
      <Navbar />

      {/* Conteúdo principal com margem superior para a Navbar */}
      <div className="container mx-auto mt-24 px-4 sm:px-6 lg:px-8">
        <div
          className={`checkout-card ${
            isDarkMode ? "bg-gray-800" : "bg-gray-100"
          }  p-8 rounded-lg shadow-lg max-w-lg w-full mx-auto`}
        >
          <h1 className="text-3xl font-semibold mb-8">Estamos quase lá!</h1>
          <p className="mb-4">
            Olá{" "}
            <span className="font-bold text-green-600">
              {payment?.formData?.firstName}
            </span>
            , selecione a duração do plano que deseja adquirir.
          </p>

          <div className="plan-options grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => handlePlanChange(plan)}
                className={`p-4 border rounded-lg transition ${
                  selectedPlan.id === plan.id
                    ? "border-blue-500"
                    : "border-gray-600"
                }`}
              >
                <span className="block text-lg font-medium">{plan.name}</span>
                <span className="block text-sm">
                  {plan.discount > 0 && (
                    <span className="text-green-500">{plan.discount}% OFF</span>
                  )}
                </span>
              </button>
            ))}
          </div>

          <p className="mb-4">Escolha o método de pagamento.</p>
          <div className="payment-options grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => handlePaymentMethodChange(method)}
                className={`p-4 border rounded-lg transition ${
                  selectedPaymentMethod.id === method.id
                    ? "border-blue-500 cursor-pointer"
                    : "border-gray-600 cursor-not-allowed"
                }`}
                disabled={method.disabled}
              >
                <div className="flex items-center">
                  <img
                    src={`/images/${method.image}`}
                    alt={method.name}
                    width={24}
                    height={24}
                    className="mr-2"
                  />

                  <span className="text-lg font-medium">{method.name}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="total mb-8">
            <div className="flex justify-between">
              <span className="text-lg">Plano selecionado:</span>
              <span className="text-lg">
                {payment?.plan?.name} - {selectedPlan.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg">Subtotal:</span>
              <span className="text-lg">
                R${(payment?.plan?.price * selectedPlan.months).toFixed(2)}
              </span>
            </div>
            {selectedPlan.discount > 0 && (
              <div className="flex justify-between">
                <span className="text-lg">Salvo:</span>
                <span className="text-lg text-green-500">
                  R$
                  {(
                    payment?.plan?.price *
                    selectedPlan.months *
                    (selectedPlan.discount / 100)
                  ).toFixed(2)}{" "}
                  {selectedPlan.discount > 0 &&
                    `(Desconto de ${selectedPlan.discount}%)`}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-lg">Método de pagamento:</span>
              <span className="text-lg">{selectedPaymentMethod.name}</span>
            </div>
            <div className="flex justify-between mt-4">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-xl font-bold">R${selectedPlan.price}</span>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Processando..." : "Confirmar Compra"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
