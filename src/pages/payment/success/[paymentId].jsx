import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { useRouter } from "next/router";
import { loadPaymentFromLocalStorage } from "../../../utils/localStorage";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import "animate.css/animate.min.css";

const Success = () => {
  const { isDarkMode } = useTheme();
  const [payment, setPayment] = useState(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [animateGif, setAnimateGif] = useState(false);
  const router = useRouter();
  const { paymentId } = router.query;

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Código que usa `window` deve estar dentro dessa verificação
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (!paymentId) return router.push("/");

    const loadedPayment = loadPaymentFromLocalStorage();
    if (!loadedPayment || loadedPayment.paymentId !== paymentId) {
      router.push("/");
      return;
    } else if (loadedPayment.status !== "approved") {
      router.push(`/payment/pay/${paymentId}`);
    }
    const audio = new Audio("/audio/paymentApproved.mp3");
    audio.play();
    setPayment(loadedPayment);
  }, [paymentId, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 60000);

    return () => clearTimeout(timer);
  }, [router]);

  useEffect(() => {
    const gifTimer = setTimeout(() => {
      setAnimateGif(true);
    }, 1000);

    return () => clearTimeout(gifTimer);
  }, []);

  if (!payment) {
    return null;
  }

  const variants = {
    initial: { y: 0 },
    animate: { y: animateGif ? -50 : 0 },
  };

  return (
    <div
      className={`min-h-screen font-roboto relative ${
        isDarkMode
          ? "bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white"
          : "bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 text-black"
      }`}
    >
      <Navbar />
      {typeof window !== "undefined" && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={300}
          recycle={true}
        />
      )}
      <main className="container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-lg">
          <motion.div
            className="border-t-2 border-green-500 w-full mb-8"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          ></motion.div>

          <h2 className="text-4xl font-bold text-center mb-6 text-green-500">
            Compra Confirmada!
          </h2>

          <motion.div
            className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-10 rounded-lg shadow-lg text-center max-w-2xl mx-auto`}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="flex flex-col items-center mb-6"
              initial="initial"
              animate="animate"
              variants={variants}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.img
                src="/images/success.gif"
                alt="Success Animation"
                height={120}
                width={120}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <h3 className="text-2xl font-semibold mt-4 ">
                Pagamento Aprovado
              </h3>
            </motion.div>

            <div className="flex justify-around space-x-4 text-sm ">
              <div className="flex flex-col items-center">
                <h3 className="font-bold">Valor</h3>
                <p>R$ {payment.plan.price.toFixed(2)}</p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="font-bold">Plano</h3>
                <p>{payment.plan.name}</p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="font-bold">Tipo</h3>
                <p>Pagamento {payment.plan.type}</p>
              </div>
            </div>

            <p className="mt-6 text-lg animate__animated animate__fadeIn animate__delay-6s ">
              Se você tiver alguma dúvida, entre em contato com nosso suporte.
            </p>
          </motion.div>
        </div>
      </main>

      <footer className="absolute bottom-0 w-full text-center p-4 text-gray-500 text-xs">
        Developed by KTG
      </footer>
    </div>
  );
};

export default Success;
