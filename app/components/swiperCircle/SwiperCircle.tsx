'use client'
import {Navigation, Pagination, EffectCreative} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import { Swiper as SwiperType } from 'swiper';
import React, {forwardRef, useState} from "react";
import gsap from "gsap";
import IHistoricalDates from "@/types/types";
interface SwiperCircleProps {
    data: IHistoricalDates[];
    setActiveSlide: React.Dispatch<React.SetStateAction<number>>
}

const SwiperCircle = forwardRef<SwiperType, SwiperCircleProps>(
    function SwiperCircle({data, setActiveSlide}, ref) {
        const [startYear, setStartYear] = useState<number>(data[0].dates[0].year)
        const [endYear, setEndYear] = useState<number>(data[data.length - 1].dates[data[data.length - 1].dates.length - 1].year)
        function appendZero(num:number){
            return (num > 9) ? num : '0' + num;
        }
        function createCustomPagination(currentClass:string, totalClass:string) {
            return '<span class="' + currentClass + '"></span>'+'/' +'<span class="' + totalClass + '"></span>';
        }
        function animateNumber (oldYear:number, newYear:number, updater:(value: number) => void) {
            gsap.to({value: oldYear}, {
                value: newYear,
                duration: 1,
                onUpdate: function () {
                    updater(Math.round(this.targets()[0].value))
                },
                ease: "power1.inOut"
            });
        }
        function handleSlideChange (swiper:any)  {
            setActiveSlide(swiper.realIndex);
            animateNumber(startYear, data[swiper.realIndex].dates[0].year, setStartYear);
            animateNumber(endYear, data[swiper.realIndex].dates[data[swiper.realIndex].dates.length - 1].year, setEndYear);
        }

        return (
            <>
                <Swiper className="swiper"
                        onBeforeInit={(swiper) => {
                            //@ts-ignore
                            ref.current = swiper;
                        }}
                        onSlideChange={handleSlideChange}
                        spaceBetween={100}
                        slidesPerView={1}
                        modules={[Pagination, Navigation, EffectCreative]}
                        navigation={{
                            prevEl: '.swiper-circle-button-prev',
                            nextEl: '.swiper-circle-button-next',
                        }}
                        pagination={{
                            type: 'fraction',
                            el: '.swiper-circle-pagination',
                            formatFractionCurrent: appendZero,
                            formatFractionTotal: appendZero,
                            renderFraction: createCustomPagination,
                        }}
                        effect={'creative'}
                >
                    {data.map((el, index) =>
                        <SwiperSlide key={index}>
                            <div className="timeline">
                                <span className="timeline__data">{startYear}</span>
                                <span className="timeline__data timeline__data--end">{endYear}</span>
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </>
        )
    });
export default SwiperCircle
