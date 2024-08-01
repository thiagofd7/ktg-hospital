import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  loadPaymentFromLocalStorage,
  savePaymentToLocalStorage,
  saveCurrentPlanToLocalStorage,
} from "../../../utils/localStorage";
import io from "socket.io-client";
import { toast } from "react-toastify";
import { FiCopy, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import Navbar from "../../../components/Navbar";

const Payment = () => {
  const { isDarkMode } = useTheme();
  const [payment, setPayment] = useState(null);
  const [socket, setSocket] = useState(null);
  const [timeLeft, setTimeLeft] = useState(900);
  const router = useRouter();
  const { paymentId } = router.query;

  const handleCopy = () => {
    navigator.clipboard.writeText(payment.pixCode);
    toast.success("Código Pix copiado para a área de transferência!");
  };

  useEffect(() => {
    if (!paymentId) return;

    const loadedPayment = loadPaymentFromLocalStorage();
    console.log(loadedPayment);
    if (!loadedPayment || loadedPayment.paymentId !== paymentId) {
      toast.error("Pagamento não encontrado!");
      router.push("/");
      return;
    } else if (loadedPayment.status === "approved") {
      router.push("/payment/success/" + paymentId);
    }
    const audio = new Audio("/audio/paymentCreated.mp3");
    audio.play();
    toast.info("Pagamento gerado com sucesso!");
    setPayment(loadedPayment);

    const socketInstance = io(process.env.PROJECT_DOMAIN);
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Conectado ao WebSocket");
    });

    socketInstance.on("statusUpdate", (data) => {
      console.log("Dados recebidos do WebSocket:", data);
      if (data.status === "approved") {
        loadedPayment.plan.exisperesAt = +Date.now() + 1000 * 60 * 60 * 24 * (loadedPayment.plan.months * 30);
        const updatedPayment = { ...loadedPayment, status: "approved" };
        savePaymentToLocalStorage(updatedPayment);
        saveCurrentPlanToLocalStorage(updatedPayment.plan);
        router.push("/payment/success/" + paymentId);
      }
    });

    socketInstance.on("connect_error", (err) => {
      console.error("Erro de conexão:", err);
    });

    // Função de limpeza
    return () => {
      socketInstance.disconnect();
    };
  }, [router, paymentId]);

  useEffect(() => {
    if (timeLeft <= 0) {
      toast.error("Tempo esgotado! Por favor, tente novamente.");
      router.push("/");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, router]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const timePercentage = (timeLeft / 900) * 100;

  if (!payment) {
    return null;
  }

  const qrCodeContainerStyle = {
    position: "relative",
    width: "fit-content",
    margin: "0 auto",
  };

  const angleStyle = (top, left, rotation) => ({
    position: "absolute",
    top,
    left,
    width: "20px",
    height: "20px",
    border: "5px solid yellow",
    borderColor: "yellow transparent transparent yellow",
    transform: `rotate(${rotation}deg)`,
    animation: "angleAnimation 2s infinite",
  });

  const keyframesStyle = `
    @keyframes angleAnimation {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  `;

  return (
    <div
      className={`min-h-screen font-roboto ${
        isDarkMode
          ? "bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white"
          : "bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 text-black"
      }`}
    >
      <style>{keyframesStyle}</style>
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-lg">
          <motion.div
            className="border-t-2 border-yellow-500 w-full mb-8"
            animate={{ width: ["0%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          ></motion.div>

          <h2 className="text-xl font-normal text-center mb-6 ">
            Aguardando pagamento
          </h2>

          <div className="flex justify-center mb-6 relative">
            {payment.qrCodeBase64 && (
              <div
                className="p-2 bg-white rounded-lg relative"
                style={qrCodeContainerStyle}
              >
                <img
                  src={`data:image/png;base64,${payment.qrCodeBase64}`}
                  alt="QR Code"
                  className="w-64 h-64"
                />
                <div style={angleStyle("-10px", "-10px", "0")}></div>
                <div
                  style={angleStyle("-10px", "calc(100% - 10px)", "90")}
                ></div>
                <div
                  style={angleStyle("calc(100% - 10px)", "-10px", "-90")}
                ></div>
                <div
                  style={angleStyle(
                    "calc(100% - 10px)",
                    "calc(100% - 10px)",
                    "180"
                  )}
                ></div>
              </div>
            )}
          </div>

          <div className="space-y-4 text-sm ">
            <div>
              <h3 className="font-bold">Plano</h3>
              <p>{payment.plan.name}</p>
            </div>
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold">Valor</h3>
                <p>R$ {payment.plan.price.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="font-bold">Tipo</h3>
                <p>Pagamento {payment.plan.type}</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold">Email</h3>
              <p>{payment.formData.email}</p>
            </div>
            <div>
              <h3
                className={`font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                PIX Copia e cola
              </h3>
              <div
                className={`flex items-center p-2 rounded ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-200"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="text-xs truncate flex-grow">
                  {payment.pixCode || "Aguardando código..."}
                </p>
                {payment.pixCode && (
                  <button
                    onClick={handleCopy}
                    className={`ml-2 ${
                      isDarkMode ? "text-yellow-400" : "text-yellow-500"
                    }`}
                  >
                    <FiCopy />
                  </button>
                )}
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-lg font-semibold ">Tempo Restante:</p>
              <div className="flex flex-col items-center justify-center">
                <p className="text-xl font-bold text-red-600 flex items-center">
                  <FiClock className="mr-2" /> {formatTime(timeLeft)}
                </p>
                <motion.div
                  className="mt-2 w-24 h-4 bg-red-200 rounded-lg overflow-hidden"
                  initial={{ width: "100%" }}
                  animate={{ width: `${timePercentage}%` }}
                  transition={{ duration: 1 }}
                >
                  <div className="h-full bg-red-500"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 w-full bg-transparent text-gray-500 dark:text-gray-400 text-xs py-4 flex justify-center items-center">
        <p className="m-0">Developed by KTG</p>
      </footer>
    </div>
  );
};

export default Payment;
