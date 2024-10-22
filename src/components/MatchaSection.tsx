'use client'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import React, { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'

import FeaturedItem from './FeaturedItem'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'
import Link from 'next/link'
import { Product } from '@/app/(payload)/payload-types'
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi'
import { PropagateLoader } from 'react-spinners'

const MatchaSection = () => {
  const slider = useRef(null)

  const settings = {
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: 'ease-in-out',
    responsive: [
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

  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const fetchProducts = async () => {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_PAYLOAD_URL
        }/api/allproducts?limit=8&categoryId=${encodeURIComponent('6713885202adac4858d83115')}`,
      )
      const { docs: products }: { docs: Product[] } = await res.json()
      setFeaturedProducts(products)
      setIsLoading(false)
    }
    fetchProducts()
  }, [])

  if (isLoading)
    return (
      <section
        id="mochi"
        className="bg-white mt-16 sm:mt-28 md:mt-48 
    lg:mt-4 
    pt-8 pb-4
    relative overflow-hidden 
    text-center mx-auto"
      >
        <h2
          className="z-50 text-3xl md:text-4xl lg:text-6xl
       font-serif text-heading-dark"
        >
          Матча
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
                stroke="#624e88"
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
        <div className="py-20">
          <PropagateLoader color="#8967b3" aria-label="Loading Spinner" className="" />
        </div>
      </section>
    )
  // TODO: replace loaders with skeletons

  return (
    <section
      id="matcha"
      className="
    pt-8 
    relative overflow-hidden bg-background"
    >
      <div className="relative z-50 w-auto">
        <h2
          className="z-50 text-3xl md:text-4xl lg:text-6xl
      text-center font-serif text-heading-dark"
        >
          Матча
          <div className="mb-8">
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
                stroke="#624e88"
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
      </div>

      <p className="text-center text-heading py-6 px-8 ">
        Мы рады представить Вам нашу новую коллецкцию MiDori Matcha —{' '}
        <span className="bg-[#99ff66]">идеальное дополнение</span> к Вашему любимому десерту!
      </p>

      <div
        className="max-w-[94%] text-center 
      mx-auto relative"
      >
        <div className="mb-4 mt-2 text-right mx-2 xs:mx-4 z-10">
          {/* @ts-expect-error test  */}
          <button onClick={() => slider?.current?.slickPrev()}>
            <TfiAngleLeft className="w-5 h-5 lg:w-8 lg:h-8 text-heading" />
          </button>
          {/* @ts-expect-error test */}
          <button onClick={() => slider?.current?.slickNext()}>
            <TfiAngleRight className="w-5 h-5 lg:w-8 lg:h-8 text-heading" />
          </button>
        </div>

        <Slider ref={slider} {...settings}>
          {featuredProducts.map((product) => (
            <FeaturedItem key={product.id} product={product} />
          ))}
        </Slider>

        <Link
          href={'/shop'}
          className="rounded-lg
             mx-auto border border-heading text-heading
               bg-transparent  transition-all duration-300
              hover:shadow-[inset_0_0_4px_2px_rgba(215,89,161,0.36),0_0_6px_2px_rgba(215,89,161,0.36)]
              px-7 py-1 tracking-widest
              w-fit self-center mt-6 mb-10
              flex items-center gap-2"
        >
          Смотреть все
        </Link>
      </div>
    </section>
  )
}

export default MatchaSection
