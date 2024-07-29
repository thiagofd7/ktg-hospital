import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import { useRouter } from 'next/router';
import { loadPaymentFromLocalStorage } from '../../../utils/localStorage';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import 'animate.css/animate.min.css';

const Success = () => {
  const [payment, setPayment] = useState(null);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [animateGif, setAnimateGif] = useState(false);
  const router = useRouter();
  const { paymentId } = router.query;

  useEffect(() => {
    if (!paymentId) return;

    const loadedPayment = loadPaymentFromLocalStorage();
    if (!loadedPayment || loadedPayment.paymentId !== paymentId) {
      router.push('/');
      return;
    } else if (loadedPayment.status !== 'approved') {
      router.push(`/payment/pay/${paymentId}`);
    }

    setPayment(loadedPayment);

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [paymentId, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 30000);

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
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black font-roboto relative">
      <Navbar />
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={300}
        recycle={true}
      />
      <main className="container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-lg">
          <motion.div
            className="border-t-2 border-green-500 w-full mb-8"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
          ></motion.div>

          <h2 className="text-4xl font-bold text-center mb-6 text-green-500">Compra Confirmada!</h2>

          <motion.div
            className="bg-white p-10 rounded-lg shadow-lg text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="flex flex-col items-center mb-6"
              initial="initial"
              animate="animate"
              variants={variants}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.img
                src="https://cdn.discordapp.com/attachments/1214236098264305735/1266978220528636006/Animation_-_1722141166011.gif?ex=66a71ceb&is=66a5cb6b&hm=6d300770c050dde44029925a84ba3e8d37148860f70c09711726c2fad1edd868&"
                alt="Success Animation"
                height={120}
                width={120}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <h3 className="text-2xl font-semibold mt-4 text-gray-700">Pagamento Aprovado</h3>
            </motion.div>

            <div className="flex justify-around space-x-4 text-sm text-gray-700">
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
                <p>Pagamento Mensal</p>
              </div>
            </div>

            <p className="mt-6 text-lg animate__animated animate__fadeIn animate__delay-6s text-gray-600">
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
