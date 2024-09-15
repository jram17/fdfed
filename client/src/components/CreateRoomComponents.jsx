import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { carousel, rightbar } from '../utils/Staticassests';
import '../index.css';
import { RiRadioButtonLine } from 'react-icons/ri';
import { IoIosRadioButtonOff } from 'react-icons/io';
import { GiTakeMyMoney, GiSecurityGate } from 'react-icons/gi';
function RightBar() {
  return (
    <div className="grid grid-cols-1 gap-7 place-items-center justify-center w-fit">
      <div className="flex w-full items-center justify-center">
        <div className="text-7xl font-bold">Why Us?</div>
      </div>
      <div className="flex flex-col gap-12">
        {rightbar.map((element, index) => (
          <div key={index} className="flex gap-4 items-center">
            <div className="w-1/3 h-64 max-w-sm flex-shrink-0">
              <img
                src={element.src}
                alt="image"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-3xl font-semibold">{element.title}</div>
              <div className="text-lg max-w-md">{element.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Carousel() {
  const [index, setIndex] = useState(0);

  const props = useSpring({
    transform: `translateX(${index * -100}%)`,
    config: { mass: 10, tension: 500, friction: 80 },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => (index === carousel.length - 1 ? 0 : index + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center mt-4">
      <div className="max-w-[1200px]  h-[400px] flex items-center  flex-col justify-center space-y-4">
        <div className="card shadow-md rounded-sm w-full h-full mx-auto">
          <div className="carousel-container w-full h-full overflow-hidden">
            <div className="carousel-slide flex" style={{ width: '100%' }}>
              <animated.div
                style={props}
                className="carousel-track flex w-full"
              >
                {carousel.map((image, i) => (
                  <div
                    key={i}
                    className={`carousel-item w-full h-full relative flex-shrink-0 ${
                      index === i ? 'active' : 'inactive'
                    }`}
                  >
                    {/* Image */}
                    <img
                      src={image.src}
                      alt={`Slide ${i}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 flex items-center justify-center text-white">
                      {image.text}
                    </div>
                    {/* Black tint overlay */}
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                  </div>
                ))}
              </animated.div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-left space-x-2 w-full h-full">
          {carousel.map((_, i) => (
            <span key={i} className="text-xl">
              {index === i ? <RiRadioButtonLine /> : <IoIosRadioButtonOff />}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export { RightBar, Carousel };
