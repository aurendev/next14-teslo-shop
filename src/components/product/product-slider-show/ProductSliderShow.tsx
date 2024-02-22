"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Import Swiper styles
import "./product-slider-show.css";

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import React, { useState } from "react";
import type SwiperObject from "swiper";
import Image from "next/image";
import { ProductImage } from "../product-image/ProductImage";

interface Props {
	images: string[];
	title: string;
	className?: string;
}

export const ProductSliderShow = ({ className, images, title }: Props) => {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

	return (
		<div className={className}>
			<Swiper
				style={
					{
						"--swiper-navigation-color": "#fff",
						"--swiper-pagination-color": "#fff",
					} as React.CSSProperties
				}
				spaceBetween={10}
				navigation={true}
				thumbs={{ swiper: thumbsSwiper }}
        autoplay={{
          delay:2500
        }}
				modules={[FreeMode, Navigation, Thumbs,Autoplay]}
				className="mySwiper2"
			>
				{images.map((image) => (
					<SwiperSlide key={image}>
						<ProductImage
							src={image}
							width={1024}
							height={800}
							alt={title}
						/>
					</SwiperSlide>
				))}
			</Swiper>

			<Swiper
				onSwiper={setThumbsSwiper}
				spaceBetween={10}
				slidesPerView={4}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[FreeMode, Navigation, Thumbs]}
				className="mySwiper"
			>
				{images.map((image) => (
					<SwiperSlide key={image}>
						<ProductImage
							src={image}
							width={250}
							height={250}
							alt={title}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
