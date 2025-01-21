'use client'
import React,{useRef, useState, useEffect} from "react";
import 'swiper/css/navigation';
import "swiper/scss/pagination";
import "swiper/scss";
import SwiperCircle from "@/components/swiperCircle/SwiperCircle";
import SwiperHelper from "@/components/swiperHelper/SwiperHelper";
import rotateCircle from "@/lib/utils/rotateCircle";
import gsap from "gsap";
import IHistoricalDates from "@/types/types";
// import {SwiperRef} from "swiper/react";
import { Swiper as SwiperType } from 'swiper';
interface MainSwiperProps {
    data: IHistoricalDates[];
}
const MainSwiper: React.FC<MainSwiperProps> = ({data}) => {
    const swiperRef= useRef<SwiperType>(null);
    const circleRef= useRef<any>(null);
    const [activeSlide, setActiveSlide] = useState<number>(0);
    const [paginationRotate, setPaginationRotate] = useState<number>(0)
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener("resize", () => {setIsMobile(window.matchMedia("(max-width: 1119px)").matches)});
        setIsMobile(window.matchMedia("(max-width: 1119px)").matches)
        return () => {
            window.removeEventListener("resize", () => {setIsMobile(window.matchMedia("(max-width: 1119px)").matches)});
        };
    }, []);
    useEffect(() => {
        if (window.matchMedia("(max-width: 1119px)").matches) {
            gsap.set(circleRef.current, {rotation: 0})
        } else {
            rotateCircle(activeSlide, 0, circleRef, setPaginationRotate, isMobile, true)
        }
    }, [isMobile])

    function performSwipe (option:number) {
        swiperRef?.current?.slideTo(option)
    }

    return (
        <div className="swiper-main">
            <div className="circle" ref={circleRef}>
                {data.map((el, index) => (
                    <div key={index}
                         className={(`circle__item ${index === activeSlide ? "circle__item--active" : ''}`).trim()}
                         onClick={() => {
                             rotateCircle(index, activeSlide, circleRef, setPaginationRotate, isMobile);
                             performSwipe(index);
                         }}
                         style={{
                             transform: `
                                 rotate(calc(360deg / ${data.length} * (${index} - 1 ))) 
                                 translate(268px) 
                                 rotate(calc((-360deg / ${data.length} * ${index - 1}) - ${paginationRotate}deg)`
                         }}
                    >
                        <span className="circle__number">{index + 1}</span>
                        <span className="circle__description">{el.title}</span>
                    </div>
                ))}
            </div>
            <div className="swiper-circle container">
                <SwiperCircle data={data} setActiveSlide={setActiveSlide} ref={swiperRef}/>
            </div>
            <div className="swiper-circle-options container">
                <div className="swiper-circle-pagination"></div>
                <div className="swiper-navigation swiper-circle-navigation">
                    <div className={(`swiper-circle-button-prev ${activeSlide === 0 ? "swiper-circle-button-disabled" : ''}`).trim()}
                         onClick={() => rotateCircle(activeSlide - 1, activeSlide, circleRef, setPaginationRotate, isMobile)}>
                        <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.49988 0.750001L2.24988 7L8.49988 13.25" stroke="#42567A" strokeWidth="2"/>
                        </svg>
                    </div>
                    <div className={(`swiper-circle-button-next ${activeSlide === 5 ? "swiper-circle-button-disabled" : ''}`).trim()}
                         onClick={() => rotateCircle(activeSlide + 1, activeSlide, circleRef, setPaginationRotate, isMobile)}>
                        <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.50012 0.750001L7.75012 7L1.50012 13.25" stroke="#42567A" strokeWidth="2"/>
                        </svg>
                    </div>
                </div>
            </div>
            {data[activeSlide].dates && <SwiperHelper data={data[activeSlide].dates} title={data[activeSlide].title}/>}
        </div>

    );
}
export default MainSwiper