'use client'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'
import Slider from 'react-slick'
import FeaturedItem from './FeaturedItem'
import { useEffect, useRef } from 'react'
import { Product } from '@/app/(payload)/payload-types'
import { cn } from '@/lib/utils'
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi'

interface ProductReelProps {
  products: Product[]
  className?: string
}

const ProductReel = ({ products, className }: ProductReelProps) => {
  const slider = useRef(null)
  useEffect(() => {
    console.log(products)
  }, [])

  const settings = {
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
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
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
        },
      },
    ],
  }

  return (
    <div
      className={cn(
        `max-w-[94%] text-center
      mx-auto pb-16 mt-8 relative`,
        className,
      )}
    >
      <div className="mb-4 mx-2 xs:mx-4 z-10">
        {/* @ts-expect-error test  */}
        <button onClick={() => slider?.current?.slickPrev()}>
          <MdNavigateBefore className="w-8 h-8 md:h-12 md:w-12 text-heading" />
        </button>
        {/* @ts-expect-error test */}
        <button onClick={() => slider?.current?.slickNext()}>
          <MdNavigateNext className="w-8 h-8 md:h-12 md:w-12 text-heading" />
        </button>
      </div>

      <Slider ref={slider} {...settings}>
        {products.map((product) => (
          <FeaturedItem key={product.id} product={product} />
        ))}
      </Slider>
    </div>
  )
}

export default ProductReel
