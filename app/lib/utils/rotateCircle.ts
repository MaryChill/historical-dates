'use client'
import React from "react";
import gsap from "gsap";
import data from "../data";

export default function rotateCircle(index:number, activeSlide:number, circleRef:any, setPaginationRotate:React.Dispatch<React.SetStateAction<number>>, isMobile:boolean, fromMobile?:boolean) {
    function getAnimationPath() {
        if ( Math.abs(index - activeSlide) < data.length / 2) {
            return index - activeSlide
        } else if (index - activeSlide > 0) {
            return index - activeSlide - data.length
        } else {
            return index - activeSlide + data.length
        }
    }
    if(!isMobile) {
        gsap.to(circleRef.current, {
            rotation: `-=${getAnimationPath() * 360 / data.length}`, duration: 1
        })
    }
    if (!fromMobile) {
        setPaginationRotate(prevState => prevState - (360 / data.length * (index - activeSlide)))
    }
}