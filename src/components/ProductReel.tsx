'use client'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'
import Slider from 'react-slick'
import FeaturedItem from './FeaturedItem'
import { useEffect, useRef } from 'react'
import { Product } from '@/app/(payload)/payload-types'
import { cn } from '@/lib/utils'

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
      mx-auto py-16 relative`,
        className,
      )}
    >
      <button>
        <MdNavigateBefore
          className="z-20 h-10 w-10 xs:h-14 xs:w-14 opacity-55 absolute
             left-0 top-[36%] text-heading-dark sm:hidden"
          // @ts-expect-error test
          onClick={() => slider?.current?.slickPrev()}
        />
      </button>
      <button>
        <MdNavigateNext
          className="z-20 h-10 w-10 xs:h-14 xs:w-14 opacity-55 absolute right-0
            top-[36%] text-heading-dark sm:hidden"
          // @ts-expect-error test
          onClick={() => slider?.current?.slickNext()}
        />
      </button>

      <Slider ref={slider} {...settings}>
        {products.map((product) => (
          <FeaturedItem key={product.id} product={product} />
        ))}
      </Slider>
    </div>
  )
}

export default ProductReel
