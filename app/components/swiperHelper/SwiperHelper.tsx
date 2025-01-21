'use client'
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import React, {useEffect, useRef} from "react";
import gsap from "gsap";
import {IDescription} from "@/types/types";

interface SwiperHelperProps {
    data: IDescription[];
    title: string
}
const SwiperHelper: React.FC<SwiperHelperProps> = ({data, title})  => {
    const swiperHelperRef = useRef(null)

    useEffect(() => {
        gsap.set(swiperHelperRef.current, {
            opacity: 0,
            top: 50
        });
        gsap.to(swiperHelperRef.current, {
            opacity: 1,
            top: 0,
            duration: 0.8,
            delay: 0.8,
        })
    }, [data]);

    return (
        <div className="swiper-helper" ref={swiperHelperRef}>
            <span className="container swiper-helper__title">{title}</span>
            <div className="swiper-navigation">
                <div className="swiper-button-prev">
                    <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.49988 0.750001L2.24988 7L8.49988 13.25" stroke="#3877EE" strokeWidth="3"/>
                    </svg>
                </div>
                <div className="swiper-button-next">
                    <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.50012 0.750001L7.75012 7L1.50012 13.25" stroke="#3877EE" strokeWidth="3"/>
                    </svg>
                </div>
            </div>
            <Swiper className="swiper container"
                    spaceBetween={25}
                    slidesPerView={1.5}
                    modules={[Navigation]}
                    navigation={{
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next',
                    }}
                    breakpoints={{
                        1121: {
                            slidesPerView: 3,
                            spaceBetween: 80,
                            freeMode: true
                        }
                    }}
            >
                {data.map((el, index) =>
                    <SwiperSlide key={index}>
                        <span className="subtitle">{el.year}</span>
                        <p className="text">{el.text}</p>
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    )
}
export default SwiperHelper