// components/Reviews.jsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const testimonials = [
  [
    {
      name: "Camila",
      position: "Professora",
      rating: 2,
      comment: "A experiência no hospital é tão inesquecível quanto um pesadelo. Os lençóis eram tão finos que eu me perguntei se estavam tentando me fazer praticar levitação para me manter aquecido.",
      image: "images/karowu.jpg"
    },
    {
      name: "Nilson",
      position: "Professor",
      rating: 2,
      comment: "A comida do hospital tem o poder de curar instantaneamente qualquer apetite. Um verdadeiro milagre culinário... só que ao contrário.",
      image: "images/nilson.jpg"
    },
    {
      name: "Augustin",
      position: "Professor",
      rating: 1,
      comment: "Os quartos do hospital são tão 'convidativos' que você vai desejar que a sua estadia seja rápida. São tão agradáveis que você pode acabar desejando mais um 'check-in' apenas para não sentir saudades.",
      image: "images/augustin.jpg"
    }
   
  ],
  [
    {
      name: "Anderson",
      position: "Goat",
      rating: 1,
      comment: "Os médicos são verdadeiros artistas... eles conseguem desaparecer no momento em que mais precisamos deles. É um show de mágica ao vivo!",
      image: "images/anderson.jpg"
    },
    {
      name: "Sabrina",
      position: "Professora",
      rating: 1,
      comment: "A equipe médica é tão dedicada que me fez sentir parte de um experimento clínico único. Se você quer uma experiência que você nunca esquecerá, para o bem ou para o mal, esse é o lugar!",
      image: "images/sabrina.jpg"
    },
    {
      name: "Iranira",
      position: "Professora",
      rating: 3,
      comment: "Vim ao hospital para uma pequena cirurgia e saí com a sensação de ter passado por um ‘spa’ da ansiedade. Se a ideia era me deixar relaxada, conseguiram, só que agora, com um saldo bancário relaxado também!",
      image: "images/iranira.png"
    }
  ]
];

const Reviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isDarkMode } = useTheme();
  const intervalRef = useRef(null);

  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setCurrentSlide(prevSlide => (prevSlide + 1) % testimonials.length);
      }, 20000);
    };

    startInterval();

    return () => clearInterval(intervalRef.current); // Clear interval on unmount
  }, []);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    clearInterval(intervalRef.current); // Clear the previous interval
    intervalRef.current = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % testimonials.length);
    }, 20000); // Restart the interval
  };

  return (
    <div className="p-8 font-roboto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mt-2 text-[#014E56]">Reviews</h2>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {testimonials.map((slideTestimonials, slideIndex) => (
            <div key={slideIndex} className="flex-shrink-0 w-full">
              <div className="flex flex-wrap justify-center lg:justify-between">
                {slideTestimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`w-full lg:w-[30%] mb-6 lg:mb-0 mx-2 ${isDarkMode ? 'bg-[#181616] text-white' : 'bg-white text-black'
                      } p-6 rounded-lg shadow-lg`}
                  >
                    <div className="flex items-center mb-4">
                      <img src={testimonial.image} alt={`Profile picture of ${testimonial.name}`} className="w-12 h-12 rounded-full mr-4" />
                      <div>
                        <h3 className="font-semibold ">{testimonial.name}</h3>
                        <p className="text-[#79C8C7]">{testimonial.position}</p>
                      </div>
                    </div>
                    <div className="mb-4 flex">
                      {[...Array.from({ length: testimonial.rating })].map((_, i) => (
                        <img
                          key={i}
                          src="/images/cry.png"
                          alt="Star"
                          className={`w-5 h-5 ${i < testimonial.rating ? '' : 'opacity-50'}`}
                        />
                      ))}
                    </div>
                    <p className="">{testimonial.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 mx-1 rounded-full cursor-pointer ${index === currentSlide ? 'bg-[#79C8C7]' : ' bg-[#6e6e6c]'}`}
            onClick={() => handleSlideChange(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
