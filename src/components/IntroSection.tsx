import Link from 'next/link'

const IntroSection = () => {
  return (
    <section
      className="relative h-screen flex 
    justify-center lg:justify-end pt-14 lg:min-h-screen "
    >
      <div
        className="absolute bottom-10 left-0
        sm:w-[75%] sm:h-[21.25rem]
        md:max-w-[640px]
        lg:bottom-[15%] lg:left-0 lg:h-[400px] lg:w-[55%] lg:max-w-none
     
      "
      >
        <img src="/images/mochi-yellow-blur.png" alt="green tea mochi" />
      </div>
      <div className="z-10 lg:absolute top-[14%] right-[14%] lg:top-[30%]">
        <div className="text-center flex flex-col gap-1.5 items-center mt-14 lg:mt-0">
          <h1 className="text-8xl xs:text-9xl text-foreground font-bold font-serif">MiDori</h1>
          <p className=" tracking-wider">Моти ручной работы</p>
          <div className="flex justify-center gap-3 mt-5">
            <Link
              href={'#mochi'}
              className="bg-button backdrop-blur-md hover:bg-button-hover flex items-center
               hover:shadow-[inset_0_0_3px_3px_rgba(215,89,161,0.36),0_0_7px_4px_rgba(215,89,161,0.36)]
              leading-3 font-bold
             text-foreground rounded-3xl transition-all duration-300
             border-2 border-foreground py-3 px-8 tracking-widest"
            >
              Моти
            </Link>
            <Link
              href={'#matcha'}
              className="bg-background/40 text-foreground  flex items-center leading-3
             border-2 shadow-[inset_0_0_2px_2px_rgba(215,89,161,0.36),0_0_6px_1px_rgba(215,89,161,0.36)]
             hover:shadow-[inset_0_0_4px_3px_rgba(215,89,161,0.36),0_0_7px_4px_rgba(215,89,161,0.36)]
             border-foreground py-3 px-8 tracking-widest
             backdrop-blur-lg rounded-3xl font-bold  transition-all duration-300
             "
            >
              Матча
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntroSection
