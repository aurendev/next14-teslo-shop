"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// Import Swiper styles
import "./product-slider-show.css";

// import required modules
import { Autoplay, FreeMode, Pagination, Thumbs } from "swiper/modules";

import Image from "next/image";
import { ProductImage } from "../product-image/ProductImage";

interface Props {
	images: string[];
	title: string;
	className?: string;
}

export const ProductMobileSliderShow = ({ className, images, title }: Props) => {

	return (
		<div className={className}>
			<Swiper
				style={
					{height: '500px', width: '100%'} 
				}
				spaceBetween={10}		
        pagination
        autoplay={{
          delay:2500
        }}
				modules={[FreeMode, Thumbs,Autoplay,Pagination]}
				className="mySwiper2"
			>
				{images.map((image) => (
					<SwiperSlide key={image}>
						<ProductImage
							src={`/products/${image}`}
							width={1024}
							height={800}
							alt={title}
						/>
					</SwiperSlide>
				))}
			</Swiper>

		</div>
	);
};
