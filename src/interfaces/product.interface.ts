import { Size } from "@/seed/seed";

export interface Product {
	id: string;
	description: string;
	images: string[];
	inStock: number;
	price: number;
	sizes: ValidSizes[];
	slug: string;
	tags: string[];
	title: string;
	// type: ValidTypes;
	gender: ValidGenders;
}

export interface CartProduct {
	id: string;
	images: string;
	quantity: number;
	price: number;
	size: Size;
	slug: string;
	title: string;
}

export interface ProductCategort {
	id: string;
	name: string;
}

export interface ProductImage {
	id: number;
	url: string;
	// productId: string;
}

export type ValidGenders = "men" | "women" | "kid" | "unisex";
export type ValidSizes = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type ValidTypes = "shirts" | "pants" | "hoodies" | "hats";
