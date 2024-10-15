"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useRef } from "react";
import Slider from "react-slick";

import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
import { IoMdStar } from "react-icons/io";

const ReviewsSection = () => {
  const settings = {
    infinite: true,
    speed: 400,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const reviews = [
    {
      username: "alicegr_",
      name: "Алиса",
      comment:
        "Все вкусные и неповторимые, каждый вкус уникален по-своему. Нежная текстура, моти просто тают во рту, всегда такие свежие и сочные.",
      image: "/images/reviews1.jpg",
    },
    {
      username: "lisasfavefoods",
      name: "Лиза",
      comment:
        "Моти для меня — самое вкусное лакомство в мире, но моти от MiDori - это просто новый уровень! Не передать словами, просто поверьте мне и попробуйте сами.",
      image: "/images/reviews6.webp",
    },
    {
      username: "jennysjapan",
      name: "Евгения",
      comment:
        "Выше всяческих похвал! Приятно удивлена, что на российском рынке наконец-то появился такой производитель.",
      image: "/images/reviews2.jpg",
    },
    {
      username: "aniechkaannn_89_",
      name: "Аня",
      comment:
        "Две моих страсти — моти и матча — в одном потрясающе вкусном сочетании! Этот вкус был словно создан для меня, отдельное за него спасибо. Другие вкусы, впрочем, точно так же восхитительны.",
      image: "/images/reviews3.webp",
    },
    {
      username: "_mintysky_y",
      name: "Денис",
      comment:
        "Потрясающе. Перепробовал все вкусы, и абсолютно все мне понравились. Думаю, такого широкого выбора вкусов на отечественном рынке вы нигде больше не найдете.",
      image: "/images/reviews5.jpg",
    },
  ];

  const slider = useRef(null);

  return (
    <section className="bg-white min-h-96 pt-2 pb-16">
      <div
        className="z-50 text-3xl md:text-4xl lg:text-6xl
      font-serif mt-6 mb-10 sm:mt-10 sm:mb-16
     mx-4 sm:mx-24 xl:mx-44 
     relative"
      >
        <h3 className="text-heading-dark inline-block leading-3">
          Отзывы
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 800 400"
            className="mx-auto w-24 md:w-28 -my-1"
          >
            <path
              d="M163.7992706298828,218.10035705566406C171.3321266937256,213.03016713460286,195.3285469309489,187.89725809733073,210.39425659179688,186.7383575439453C225.45996625264485,185.5794569905599,237.86736323038738,210.93190002441406,256.9892272949219,210.93190002441406C276.1110913594564,210.93190002441406,306.07526240030927,185.43459442138672,328.673828125,186.7383575439453C351.27239384969073,188.0421206665039,373.01670364379885,218.4169639078776,396.774169921875,218.9964141845703C420.53163619995115,219.57586446126302,455.9259085083008,191.19176147460936,475.6272277832031,190.3225860595703C495.32854705810547,189.45341064453126,498.3572358703613,212.4611708577474,518.6380004882812,213.6200714111328C538.9187651062011,214.77897196451823,581.0842218017578,197.05645538330077,601.0752563476562,197.4910430908203C621.0662908935547,197.92563079833985,635.6302060953776,213.26612884521484,642.2938842773438,216.30824279785156"
              fill="none"
              stroke-width="8"
              stroke="#8967b3"
              stroke-linecap="butt"
              transform="matrix(1.6764303884620877,0,0,1.6764303884620877,-275.6795431990246,-140.0579031616998)"
            ></path>
            <defs>
              <linearGradient id="SvgjsLinearGradient1001">
                <stop stop-color="hsl(37, 99%, 67%)" offset="0"></stop>
                <stop stop-color="hsl(316, 73%, 52%)" offset="1"></stop>
              </linearGradient>
            </defs>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 800 400"
            className="mx-auto  w-24 md:w-28 -my-11"
          >
            <path
              d="M163.7992706298828,218.10035705566406C171.3321266937256,213.03016713460286,195.3285469309489,187.89725809733073,210.39425659179688,186.7383575439453C225.45996625264485,185.5794569905599,237.86736323038738,210.93190002441406,256.9892272949219,210.93190002441406C276.1110913594564,210.93190002441406,306.07526240030927,185.43459442138672,328.673828125,186.7383575439453C351.27239384969073,188.0421206665039,373.01670364379885,218.4169639078776,396.774169921875,218.9964141845703C420.53163619995115,219.57586446126302,455.9259085083008,191.19176147460936,475.6272277832031,190.3225860595703C495.32854705810547,189.45341064453126,498.3572358703613,212.4611708577474,518.6380004882812,213.6200714111328C538.9187651062011,214.77897196451823,581.0842218017578,197.05645538330077,601.0752563476562,197.4910430908203C621.0662908935547,197.92563079833985,635.6302060953776,213.26612884521484,642.2938842773438,216.30824279785156"
              fill="none"
              stroke-width="8"
              stroke="#ffff94"
              stroke-linecap="butt"
              transform="matrix(1.6764303884620877,0,0,1.6764303884620877,-275.6795431990246,-140.0579031616998)"
            ></path>
            <defs>
              <linearGradient id="SvgjsLinearGradient1001">
                <stop stop-color="hsl(37, 99%, 67%)" offset="0"></stop>
                <stop stop-color="hsl(316, 73%, 52%)" offset="1"></stop>
              </linearGradient>
            </defs>
          </svg>
        </h3>
        <div className="absolute top-2 right-0 z-10">
          {/* @ts-expect-error test  */}
          <button onClick={() => slider?.current?.slickPrev()}>
            <TfiAngleLeft className="w-8 h-8 text-heading" />
          </button>
          {/* @ts-expect-error test */}
          <button onClick={() => slider?.current?.slickNext()}>
            <TfiAngleRight className="w-8 h-8 text-heading" />
          </button>
        </div>
      </div>
      <Slider ref={slider} {...settings}>
        {reviews.map((review) => (
          <div key={review.username} className="">
            <div className="flex flex-col items-center gap-4 xs:px-2 md:px-0 md:w-52 lg:w-72">
              <div className="w-full h-0 pb-[100%] relative">
                <img
                  src={review.image}
                  alt={review.name}
                  className="object-cover absolute top-0 left-0 w-full h-full"
                />
                <div
                  className="absolute top-0 left-0 bottom-0 right-0 z-30 
                bg-background/30 hover:bg-transparent transition"
                />
              </div>
              <div
                className="flex *:text-heading-dark 
              *:h-6 *:w-6
              md:*:w-8 md:*:h-8
              lg:*:w-10 lg:*:h-10
             "
              >
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
              </div>
              <div className="flex flex-col gap-2 text-center sm:text-left mb-2">
                <h4 className="text-xl text-heading-dark">{review.name}</h4>
                <p className="text-sm text-heading">@{review.username}</p>
              </div>
              <p className="text-sm text-heading italic font-light px-8 sm:p-0">
                «{review.comment}»
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ReviewsSection;
