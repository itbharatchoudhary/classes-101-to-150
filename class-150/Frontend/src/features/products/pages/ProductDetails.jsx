import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const { handleGetProductDetails } = useProduct();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProductDetails() {
            try {
                const data = await handleGetProductDetails(id);
                setProduct(data?.product || data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchProductDetails();
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fbf9f6]">
                <div className="animate-pulse text-xs tracking-[0.3em] text-gray-400 uppercase">
                    Loading Product...
                </div>
            </div>
        );
    }

    const images =
        product.images && product.images.length > 0
            ? product.images
            : [{ url: "/snitch_editorial_warm.png" }];

    return (
        <>
            {/* Fonts */}
            <link
                href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap"
                rel="stylesheet"
            />

            <div className="bg-[#fbf9f6] min-h-screen pb-24 font-['Inter']">

                {/* NAVBAR */}
                <nav className="px-8 lg:px-20 pt-10 pb-6 flex justify-between border-b border-[#e4e2df]">
                    <Link
                        to="/"
                        className="tracking-[0.4em] text-sm uppercase text-[#C9A96E] font-serif"
                    >
                        Snitch.
                    </Link>

                    <button
                        onClick={() => navigate(-1)}
                        className="text-xs tracking-[0.2em] uppercase text-gray-500 hover:text-[#C9A96E]"
                    >
                        Back
                    </button>
                </nav>

                <div className="max-w-7xl mx-auto px-8 lg:px-20 pt-16">

                    <div className="flex flex-col lg:flex-row gap-16">

                        {/* LEFT SIDE */}
                        <div className="w-full lg:w-[65%] flex gap-6">

                            {/* THUMBNAILS */}
                            {images.length > 1 && (
                                <div className="flex lg:flex-col gap-4 overflow-auto">
                                    {images.map((img, i) => (
                                        <img
                                            key={i}
                                            src={img.url}
                                            onClick={() => setSelectedImage(i)}
                                            className={`w-20 h-24 object-cover cursor-pointer transition-all duration-300 
                                            ${selectedImage === i
                                                    ? "border border-black scale-105"
                                                    : "opacity-50 hover:opacity-100"
                                                }`}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* MAIN IMAGE */}
                            <div className="relative w-full aspect-[4/5] bg-[#f5f3f0] overflow-hidden group">

                                <img
                                    src={images[selectedImage]?.url}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* IMAGE COUNTER */}
                                <div className="absolute bottom-4 right-4 bg-white/70 px-3 py-1 text-xs tracking-wider backdrop-blur">
                                    {selectedImage + 1} / {images.length}
                                </div>

                                {/* ARROWS */}
                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={() =>
                                                setSelectedImage(prev =>
                                                    prev === 0 ? images.length - 1 : prev - 1
                                                )
                                            }
                                            className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-white/70 p-2"
                                        >
                                            ‹
                                        </button>

                                        <button
                                            onClick={() =>
                                                setSelectedImage(prev =>
                                                    prev === images.length - 1 ? 0 : prev + 1
                                                )
                                            }
                                            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-white/70 p-2"
                                        >
                                            ›
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="w-full lg:w-[35%] lg:sticky lg:top-32 flex flex-col animate-[fadeIn_0.8s_ease-out]">

                            {/* TITLE */}
                            <h1 className="text-5xl font-serif font-light tracking-tight leading-tight mb-4">
                                {product.title}
                            </h1>

                            {/* CATEGORY */}
                            <div className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-6">
                                Premium Collection
                            </div>

                            {/* PRICE */}
                            <div className="text-2xl font-medium mb-10">
                                ₹ {product.price?.amount?.toLocaleString()}
                            </div>

                            {/* DIVIDER */}
                            <div className="w-12 h-[1px] bg-[#C9A96E] mb-8"></div>

                            {/* DESCRIPTION */}
                            <p className="text-sm text-gray-600 leading-relaxed mb-12">
                                {product.description}
                            </p>

                            {/* BUTTONS */}
                            <div className="flex flex-col gap-4">

                                {/* ADD TO CART */}
                                <button className="relative overflow-hidden border border-black py-4 uppercase text-xs tracking-[0.3em] group active:scale-[0.98]">

                                    <span className="relative z-10 group-hover:text-white transition">
                                        Add to Cart
                                    </span>

                                    <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                </button>

                                {/* BUY NOW */}
                                <button className="border py-4 uppercase text-xs tracking-[0.3em] hover:border-[#C9A96E] active:scale-[0.98]">
                                    Buy Now
                                </button>
                            </div>

                            {/* EXTRA INFO */}
                            <div className="mt-14 space-y-4 text-xs uppercase text-gray-400">

                                <div className="flex justify-between border-b pb-3">
                                    <span>Shipping</span>
                                    <span>Free over ₹15,000</span>
                                </div>

                                <div className="flex justify-between border-b pb-3">
                                    <span>Returns</span>
                                    <span>14 Days</span>
                                </div>

                                <div className="flex justify-between border-b pb-3">
                                    <span>Authenticity</span>
                                    <span>Guaranteed</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* ANIMATION */}
            <style>
                {`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                `}
            </style>
        </>
    );
};

export default ProductDetail;