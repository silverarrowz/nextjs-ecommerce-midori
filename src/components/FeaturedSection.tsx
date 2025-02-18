'use client'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

import FeaturedItem from './FeaturedItem'
import { Product } from '@/app/(payload)/payload-types'
import React, { useEffect, useRef, useState } from 'react'
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi'

import { mochiId } from '@/lib/category-ids'

const FeaturedSection = () => {
  const slider = useRef(null)

  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_SERVER_URL
        }/api/allproducts?limit=8&categoryId=${encodeURIComponent(mochiId)}`,
      )
      const { docs: products }: { docs: Product[] } = await res.json()
      setFeaturedProducts(products)
      setIsLoading(false)
    }
    fetchProducts()
  }, [])

  const settings = {
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: 'ease-in-out',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
        },
      },
    ],
  }

  return (
    <section
      id="mochi"
      className="bg-white mt-16 sm:mt-28 md:mt-32 lg:mt-24 xl:mt-36

    pt-8 md:pt-12 pb-4
    relative overflow-hidden"
    >
      <h2
        className="z-50 text-3xl md:text-4xl lg:text-5xl
      text-center font-serif text-heading-dark"
      >
        Новинки
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 800 400"
            className="mx-auto w-28 -my-4"
          >
            <path
              d="M163.7992706298828,218.10035705566406C171.3321266937256,213.03016713460286,195.3285469309489,187.89725809733073,210.39425659179688,186.7383575439453C225.45996625264485,185.5794569905599,237.86736323038738,210.93190002441406,256.9892272949219,210.93190002441406C276.1110913594564,210.93190002441406,306.07526240030927,185.43459442138672,328.673828125,186.7383575439453C351.27239384969073,188.0421206665039,373.01670364379885,218.4169639078776,396.774169921875,218.9964141845703C420.53163619995115,219.57586446126302,455.9259085083008,191.19176147460936,475.6272277832031,190.3225860595703C495.32854705810547,189.45341064453126,498.3572358703613,212.4611708577474,518.6380004882812,213.6200714111328C538.9187651062011,214.77897196451823,581.0842218017578,197.05645538330077,601.0752563476562,197.4910430908203C621.0662908935547,197.92563079833985,635.6302060953776,213.26612884521484,642.2938842773438,216.30824279785156"
              fill="none"
              strokeWidth="8"
              stroke="#292461"
              strokeLinecap="butt"
              transform="matrix(1.6764303884620877,0,0,1.6764303884620877,-275.6795431990246,-140.0579031616998)"
            ></path>
            <defs>
              <linearGradient id="SvgjsLinearGradient1001">
                <stop stopColor="hsl(37, 99%, 67%)" offset="0"></stop>
                <stop stopColor="hsl(316, 73%, 52%)" offset="1"></stop>
              </linearGradient>
            </defs>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 800 400"
            className="mx-auto w-28 -my-11"
          >
            <path
              d="M163.7992706298828,218.10035705566406C171.3321266937256,213.03016713460286,195.3285469309489,187.89725809733073,210.39425659179688,186.7383575439453C225.45996625264485,185.5794569905599,237.86736323038738,210.93190002441406,256.9892272949219,210.93190002441406C276.1110913594564,210.93190002441406,306.07526240030927,185.43459442138672,328.673828125,186.7383575439453C351.27239384969073,188.0421206665039,373.01670364379885,218.4169639078776,396.774169921875,218.9964141845703C420.53163619995115,219.57586446126302,455.9259085083008,191.19176147460936,475.6272277832031,190.3225860595703C495.32854705810547,189.45341064453126,498.3572358703613,212.4611708577474,518.6380004882812,213.6200714111328C538.9187651062011,214.77897196451823,581.0842218017578,197.05645538330077,601.0752563476562,197.4910430908203C621.0662908935547,197.92563079833985,635.6302060953776,213.26612884521484,642.2938842773438,216.30824279785156"
              fill="none"
              strokeWidth="8"
              stroke="#99ff66"
              strokeLinecap="butt"
              transform="matrix(1.6764303884620877,0,0,1.6764303884620877,-275.6795431990246,-140.0579031616998)"
            ></path>
            <defs>
              <linearGradient id="SvgjsLinearGradient1001">
                <stop stopColor="hsl(37, 99%, 67%)" offset="0"></stop>
                <stop stopColor="hsl(316, 73%, 52%)" offset="1"></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </h2>

      <div
        className="max-w-[94%] text-center 
      mx-auto py-12 relative"
      >
        <div className="mb-4 text-right mx-2 xs:mx-4 z-10">
          {/* @ts-expect-error test  */}
          <button onClick={() => slider?.current?.slickPrev()}>
            <TfiAngleLeft className="w-5 h-5 lg:w-8 lg:h-8 text-heading" />
          </button>
          {/* @ts-expect-error test */}
          <button onClick={() => slider?.current?.slickNext()}>
            <TfiAngleRight className="w-5 h-5 lg:w-8 lg:h-8 text-heading" />
          </button>
        </div>

        {featuredProducts.length ? (
          <Slider ref={slider} {...settings}>
            {featuredProducts.map((product) => (
              <FeaturedItem key={product.id} product={product} />
            ))}
          </Slider>
        ) : (
          <div
            className="max-w-[94%] w-full flex justify-center xs:justify-between text-center  
    mx-auto py-12 relative"
          >
            <div
              role="status"
              className="mx-2 xs:mx-4 max-w-[12rem] lg:max-w-[14rem] xl:max-w-[15rem] 
      px-2 py-4 xs:p-4 h-[18rem] xs:h-[20rem]  
      my-4 border border-button rounded shadow animate-pulse flex-grow"
            >
              <div className="flex items-center justify-center h-40 sm:h-48 mb-4 bg-button rounded">
                <svg
                  className="w-full h-10 text-button"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
              </div>
              <div className="h-2.5 bg-button rounded-full mb-4"></div>
              <div className="h-2 bg-button rounded-full mx-auto w-10 mb-2.5"></div>

              <div className="w-full h-8 bg-button rounded-full mt-3 sm:mt-4"></div>

              <span className="sr-only">Loading...</span>
            </div>

            <div
              role="status"
              className="mx-2 xs:mx-4 max-w-[12rem] lg:max-w-[14rem] xl:max-w-[15rem] 
      px-2 py-4 xs:p-4 h-[18rem] xs:h-[20rem]  
      my-4 border border-button rounded shadow animate-pulse flex-grow hidden xs:block"
            >
              <div className="flex items-center justify-center h-48 mb-4 bg-button rounded">
                <svg
                  className="w-full h-10 text-button"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
              </div>
              <div className="h-2.5 bg-button rounded-full mb-4"></div>
              <div className="h-2 bg-button rounded-full mx-auto w-10 mb-2.5"></div>

              <div className="w-full h-8 bg-button rounded-full mt-3 sm:mt-4"></div>

              <span className="sr-only">Loading...</span>
            </div>

            <div
              role="status"
              className="mx-2 xs:mx-4 max-w-[12rem] lg:max-w-[14rem] xl:max-w-[15rem] 
      px-2 py-4 xs:p-4 h-[18rem] xs:h-[20rem] 
      my-4 border border-button rounded shadow animate-pulse flex-grow hidden sm:block"
            >
              <div className="flex items-center justify-center h-48 mb-4 bg-button rounded">
                <svg
                  className="w-full h-10 text-button"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
              </div>
              <div className="h-2.5 bg-button rounded-full mb-4"></div>
              <div className="h-2 bg-button rounded-full mx-auto w-10 mb-2.5"></div>

              <div className="w-full h-8 bg-button rounded-full mt-3 sm:mt-4"></div>

              <span className="sr-only">Loading...</span>
            </div>

            <div
              role="status"
              className="mx-2 xs:mx-4 max-w-[12rem] lg:max-w-[14rem] xl:max-w-[15rem] 
      px-2 py-4 xs:p-4 h-[18rem] xs:h-[20rem] 
      my-4 border border-button rounded shadow animate-pulse flex-grow hidden lg:block"
            >
              <div className="flex items-center justify-center h-48 mb-4 bg-button rounded">
                <svg
                  className="w-full h-10 text-button"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
              </div>
              <div className="h-2.5 bg-button rounded-full mb-4"></div>
              <div className="h-2 bg-button rounded-full mx-auto w-10 mb-2.5"></div>

              <div className="w-full h-8 bg-button rounded-full mt-3 sm:mt-4"></div>

              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedSection
