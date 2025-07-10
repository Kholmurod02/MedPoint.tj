"use client"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../app/globals.css';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Separator } from '@/shared/ui/separator';


export default function Swiperr({data}) {
   
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: false,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper rounded-lg"
            >
                {data?.map((el) => (
                    <SwiperSlide key={el?.id}>
                        <div className="bg-[url('/fileComp.jpg')] bg-cover bg-center  bg-blend-overlay h-[330px] flex items-center justify-center text-white text-2xl font-bold">
                            <div className="bg-[rgba(19,19,19,0.4)] h-full w-full backdrop-blur-xs border border-white/10 flex items-center justify-center px-4">
                                <div className="text-center text-gray-300 max-w-[600px] w-full sm:w-[500px] md:w-[600px] flex flex-col gap-5">
                                    <span className="text-sm md:text-base font-medium mb-4">{el?.description}</span>
                                    <Separator />
                                    <span className="text-sm md:text-base font-medium mt-1">{el?.title}</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

        </>
    )
}