"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { loadPlansFromLocalStorage, loadCurrentPlanFromLocalStorage } from '../utils/localStorage';
import PurchaseModal from '../components/PurchaseModal';
import { useTheme } from '../context/ThemeContext';
import Reviews from '../components/Reviews';



function MainComponent() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isDarkMode } = useTheme();
  useEffect(() => {
    const loadedPlans = loadPlansFromLocalStorage();
    setPlans(loadedPlans);


    const loadedCurrentPlan = loadCurrentPlanFromLocalStorage();
    setCurrentPlan(loadedCurrentPlan);
  }, []);

  const handleBuyClick = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  return (
    //<div className="bg-white min-h-screen text-black font-roboto flex flex-col">
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} font-roboto flex flex-col`}>
      <Navbar />

      <main className="container mx-auto mt-8 px-4 flex-grow">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sistema de Gerenciamento de Planos de Saúde
          </h1>
          <p className="mb-8 max-w-2xl mx-auto">
            Plano de saúde com ampla cobertura e atendimento de qualidade para
            você ou para os colaboradores da sua empresa.
          </p>
        </div>
        <div className="flex justify-center space-x-8">
          {currentPlan && (
            <div className="bg-blue-100 p-6 rounded-lg shadow-md mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <img src="https://icones.pro/wp-content/uploads/2022/07/icones-d-administration-bleu.png" alt="Ícone do Plano Atual" className="w-16 h-16 mr-4" />
                <div className='text-black'>
                  <h3 className="text-2xl font-semibold mb-2 text-blue-600">Seu plano Ativo</h3>
                  <p className="text-lg font-semibold">{currentPlan.name}</p>
                  <p className="text-lg mb-4">R$ {currentPlan.price.toFixed(2)}/{currentPlan.type === 'Mensal' ? 'Mês' : currentPlan.type === 'Anual' ? 'Ano' : 'Semestre'}</p>
                  <p className="text-lg">Renova em: {new Date(currentPlan.exisperesAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )}

        </div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">{plans.length > 1 ? 'Planos disponíveis:' : plans.length === 1 ? 'Plano disponível:' : ''}</h2>
        </div>
        <div className="flex justify-center space-x-8">

          {plans.length > 0 ? (
            plans.map(plan => (

              <div key={plan.name} className={`shadow-lg rounded-lg p-6 w-64 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>

                <div className="flex flex-col items-center mb-4">
                  <img
                    src={isDarkMode ? '/images/ceduceuWhite.png' : '/images/caduceuBlack.png'}
                    alt="Caduceu"
                    className="w-16 h-16"
                  />
                  <h3 className="text-xl font-bold mt-2">{plan.name}</h3>
                  <p className="text-sm mt-2">{plan.coverage}</p>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => handleBuyClick(plan)}
                    className="bg-blue-500 text-white rounded-full px-4 py-2 flex items-center justify-center text-lg font-bold mx-auto hover:bg-blue-600"
                    style={{ minWidth: '80px' }}
                  >
                    {`R$${plan.price.toFixed(2)}`}
                  </button>
                </div>

                {selectedPlan && (
                  <PurchaseModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    plan={selectedPlan}
                  />
                )}
              </div>
            ))
          ) : (
            <p>Nenhum plano disponível no momento.</p>
          )}

        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-2">REDE HOSPITALAR</h2>
          <h3 className="text-4xl font-bold mb-4">Ampla rede hospitalar parceira</h3>
          <p className="mb-8">
            Juntos, oferecemos o melhor serviço de acordo com seu plano!
          </p>

          <div className="flex flex-wrap justify-center gap-8">
            <div className={`shadow-lg rounded-lg p-6 w-80 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
              <img
                src="https://www.channel360.com.br/wp-content/uploads/2021/03/hospital-sirio-libanes-fachada.jpeg"
                alt=""
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="text-center">
                <a
                  href="https://samaritanosaude.com.br/tag/hospital-samaritano-campinas/"
                  target='_blank'
                  className="text-xl font-bold mb-2 block hover:text-blue-600"
                >
                  Hospital Samaritano Campinas
                </a>
                <a
                  href="tel:1937361000"
                  className="text-sm mb-2 block hover:text-blue-600"
                >
                  (19) 3736.1000
                </a>
                <p className="text-sm mb-4">
                  Rua Engenheiro Monlevade, 206 Ponte Preta - Campinas/SP
                </p>
              </div>
            </div>

            <div className={`shadow-lg rounded-lg p-6 w-80 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
              <img
                src="https://e1a4c9d0d2f9f737c5e1.ucr.io/https://www.create.xyz/api/ai-img?prompt=Fachada%2520do%2520Hospital%2520Samaritano%2520Unidade%2520II"
                alt="Fachada do Hospital Samaritano Unidade II"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="text-center">
                <a
                  href="https://samaritanosaude.com.br/geral/unidade-ii-do-hospital-samaritano-em-campinas-tem-exames-de-imagens-laboratoriais-e-cardiologicos/"
                  target='_blank'
                  className="text-xl font-bold mb-2 block hover:text-blue-600"
                >
                  Hospital Samaritano Unidade II
                </a>
                <a
                  href="tel:1937388100"
                  className="text-sm mb-2 block hover:text-blue-600"
                >
                  (19) 3738.8100
                </a>
                <p className="text-sm mb-4">
                  Avenida São José dos Campos, 256 Jd. Nova Europa - Campinas/SP
                </p>
              </div>
            </div>

            <div className={`shadow-lg rounded-lg p-6 w-80 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
              <img
                src="https://e1a4c9d0d2f9f737c5e1.ucr.io/https://www.create.xyz/api/ai-img?prompt=Fachada%2520do%2520Hospital%2520Santa%2520Ign%25C3%25AAs%2520Indaiatuba"
                alt="Fachada do Hospital Santa Ignês Indaiatuba"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="text-center">
                <a
                  href="https://hospitalsantaignes.com.br/"
                  target='_blank'
                  className="text-xl font-bold mb-2 block hover:text-blue-600"
                >
                  Hospital Santa Ignês Indaiatuba
                </a>
                <a
                  href="tel:1937308100"
                  className="text-sm mb-2 block hover:text-blue-600"
                >
                  (19) 3730.8100
                </a>
                <p className="text-sm mb-4">
                  Rua Benjamin Constant, 1.657 Centro - Indaiatuba/SP
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-2 text-blue-600">
            Médicos qualificados
          </h2>
          <h3 className="text-4xl font-bold text-center mb-4">
            Nossos médicos especialistas
          </h3>
          <p className="text-center mb-8">
            Nós temos os melhores médicos de todo mundo, eles vão te consertar em um piscar de olhos, de acordo com seu plano claro.
          </p>

          <div className="flex justify-center flex-wrap gap-8">

            <div className={`shadow-lg rounded-lg p-6 w-64 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
              <img
                src="images/drAmadio.jpg"
                alt="Foto do Dr. Amadio"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-xl font-bold mb-1">Dr. Gustavo Amadio</h4>
              <p className="text-blue-600 mb-2">Clínico Geral</p>
              <p className="text-sm ">
                Mestre na arte de diagnosticar errado. Se você acha que tem uma coisa, ele garante que é outra.
              </p>
            </div>

            <div className={`shadow-lg rounded-lg p-6 w-64 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
              <img
                src="images/drSant.png"
                alt="Foto do Dr. Pedro Santt"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-xl font-bold mb-1">Dr. Pedro Santt</h4>
              <p className="text-blue-600 mb-2">Cardiologia</p>
              <p className="text-sm ">
                Examinando pacientes e suas desculpas para não seguirem a dieta. Especialista em diagnosticar preguiça crônica.
              </p>
            </div>

            <div className={`shadow-lg rounded-lg p-6 w-64 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
              <img
                src="images/drBart.png"
                alt="Foto do Dr. Luis Pingas"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-xl font-bold mb-1">Dr. Luis Bart</h4>
              <p className="text-blue-600 mb-2">Anestesiologista</p>
              <p className="text-sm ">
                Garantindo que os pacientes durmam durante a cirurgia... e acordem apenas para descobrir que fizeram o procedimento errado.
              </p>
            </div>

            <div className={`shadow-lg rounded-lg p-6 w-64 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
              <img
                src="images/drLamarao.png"
                alt="Foto do Dr. Lamarão"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-xl font-bold mb-1">Dr. Lamarão</h4>
              <p className="text-blue-600 mb-2">Neurocirurgião</p>
              <p className="text-sm ">
                Realiza cirurgias no cérebro, medula espinhal e nervos periféricos... quando não está tentando lembrar onde deixou o bisturi.
              </p>
            </div>
          </div>
        </div>
        <Reviews />
        <div className="p-8 font-roboto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mt-2 text-[#014E56]">Localização</h2>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex justify-center items-center transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.8162723456503!2d-46.66441092376058!3d-23.539109660776848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5822b7788419%3A0xe910a67c899d1d9f!2sHospital%20Samaritano!5e0!3m2!1spt-BR!2sbr!4v1722611646326!5m2!1spt-BR!2sbr"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
            </div>
          </div>
        </div>

      </main>

      <footer className="bg-black text-white py-3 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <h3 className="text-2xl font-semibold mb-2">
              Hospital KTG
            </h3>
            <p className="text-sm">Cuidando da sua saúde com excelência</p>
          </div>
          <div className="mb-4">
            <p className="text-sm">Telefone: (69) 2424-6969</p>
            <p className="text-sm">Email: gustavolamarao8@gmail.com</p>
            <p className="text-sm">
              Endereço: Rua Casa do Chapeu, 2.469 - Centro, Dubai/RO
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default MainComponent;