"use client";

import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const slides = [
  {
    title: {
      ru: "Здоровье начинается с заботы",
      en: "Master a modern IT profession",
      tj: "Касби серталаби IT-ро, омӯзед",
    },
    image: "/Medicine.png",
    description: {
      ru: "Комплексные медицинские услуги от лучших специалистов.",
      en: "and build a confident future with us.",
      tj: "ва ояндаи дурахшонро бо мо созед.",
    },
    buttonRoute: "/doctors",
    buttonTitle: "Наши специалисты"
  },
  {
    title: {
      ru: "Взвешенные решения для вашего здоровья.",
      en: "Master a modern IT profession",
      tj: "Касби серталаби IT-ро, омӯзед",
    },
    image: "/banner-big-Gavel.jpg",
    description: {
      ru: "Индивидуальный и взвешенный подход к каждому пациенту.",
      en: "and build a confident future with us.",
      tj: "ва ояндаи дурахшонро бо мо созед.",
    },
    buttonRoute: "/doctors",
    buttonTitle: "Наши специалисты"
  }
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const visibleIndicators = 5;
  const lng = "ru"
  const onAutoplayTimeLeft = (_, time, progress) => {
    setProgress(1 - progress);
  };

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <div>
      {/* hero section */}
      <section className={` relative w-full p-[20px]`}>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          onSlideChange={handleSlideChange}
          className="h-[400px] relative sm:h-[520px] w-full rounded-2xl"
        >
          {slides.map((el, i) => (
            <SwiperSlide
              key={i}
              className="relative text-white flex items-center justify-center overflow-hidden"
            >
              {" "}
              <div className="absolute rounded-2xl z-[1000] inset-0 bg-gradient-to-r from-[#00000047] to-[#00000000]"></div>{" "}
              {/* Background Image */}
              <div
                className="absolute  inset-0 bg-cover bg-no-repeat bg-right"
                style={{
                  backgroundImage: `url('${el.image}')`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              />
              {/* Content Container */}
              <div className="absolute top-1/2 left-1/2 z-[10000]  transform -translate-x-1/2 -translate-y-1/2 container mx-auto p-[20px] md:p-[60px] grid md:grid-cols-2 items-center gap-8">
                {/* Text Content */}
                <div className="space-y-6 z-[10000] relative">
                  <h1 className="lg:text-[48px] xs:text-[32px] text-[22px] font-[700] font-main">
                    {el.title[lng]}
                  </h1>
                  <p className="lg:text-[28px] xs:text-[20px] text-[18px] font-[400] font-main">
                    {el.description[lng]}
                  </p>

                  {/* <Button className="bg-blue-600 hover:bg-blue-700 text-white w-40">
                    test
                  </Button> */}
                  <Link href={el.buttonRoute}>
                    <Button
                      variant="animated"
                      size="lg"
                      className="z-[10000] text-white bg-gradient-to-r from-teal-400 to-blue-400 hover:from-teal-500 hover:to-blue-600"
                    >
                      {el.buttonTitle}
                    </Button>
                  </Link>
                </div>
                <br />

                {/* Progress Indicators */}
                <div className=" z-10">
                  <div className="flex gap-2">
                    {slides.map((_, index) => {
                      const isActive =
                        index === activeIndex % visibleIndicators;
                      return (
                        <div
                          key={index}
                          className="relative h-2 w-24 rounded-full bg-white/30"
                          style={{
                            backgroundColor: isActive ? "white" : "",
                            width: isActive ? `${progress * 40}%` : "",
                          }}
                        >
                          {isActive && (
                            <div
                              className="absolute inset-0 rounded-full bg-white transition-all duration-100 ease-linear"
                              style={{
                                width: `${progress * 100}%`,
                                transformOrigin: "left",
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

            </SwiperSlide>
          ))}
        </Swiper>
      </section>

    </div>
  );
}
