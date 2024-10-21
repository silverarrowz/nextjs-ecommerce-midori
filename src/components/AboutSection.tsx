import Link from 'next/link'
import { GiFruitTree } from 'react-icons/gi'
import { IoSparklesOutline } from 'react-icons/io5'
import { PiPlant } from 'react-icons/pi'

const AboutSection = () => {
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-heading bg-background-light">
        <div className="flex flex-col justify-start gap-20 p-10 sm:p-24">
          <div>
            <h1 className="text-5xl sm:text-7xl font-serif text-heading-dark pl-12 relative">
              MiDori
              <svg
                className="left-0 -bottom-20 w-56 absolute"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 800 400"
              >
                <path
                  d="M139.60572814941406,184.9462432861328C155.6854761505127,177.9838765716553,195.5241800689697,147.64336975097658,226.52328491210938,147.31182861328125C257.52238975524904,146.98028747558592,274.51164932250975,182.65681732177734,307.16845703125,183.1541290283203C339.82526473999025,183.6514407348633,373.8709440612793,149.33691772460938,403.04656982421875,150C432.2221955871582,150.66308227539062,432.7150405883789,184.41756958007812,464.8745422363281,186.7383575439453C497.03404388427737,189.0591455078125,544.7222178649903,163.04211151123047,576.8817138671875,162.5447998046875C609.0412098693847,162.04748809814453,627.2714865112305,180.07168968200685,638.7096557617188,184.05018615722656"
                  fill="none"
                  strokeWidth="15"
                  stroke="#ffff94"
                  strokeLinecap="round"
                  transform="matrix(1,0,0.35265396141692995,1,-58.927483606802184,0)"
                ></path>
                <defs>
                  <linearGradient id="SvgjsLinearGradient1001">
                    <stop stopColor="hsl(37, 99%, 67%)" offset="0"></stop>
                    <stop stopColor="hsl(316, 73%, 52%)" offset="1"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-3xl sm:text-5xl font-serif italic text-heading-dark">
                {' '}
                — это
              </span>
            </h1>
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-4">
              <GiFruitTree size={72} />
              <div className="max-w-[74%] sm:max-w-none lg:max-w-[80%] xl:max-w-[84%]">
                <h2 className="text-heading-dark font-bold text-xl sm:text-2xl">
                  ЛУЧШИЕ ИНГРЕДИЕНТЫ
                </h2>
                <p className="max-w-[80%]">
                  Мы сотрудничаем с одним из{' '}
                  <span className="bg-button">лучших поставщиков Японии</span> и делаем наши десерты
                  из самых свежих и высококачественных ингредиентов.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <IoSparklesOutline size={72} />
              <div className="max-w-[74%] sm:max-w-none lg:max-w-[80%] xl:max-w-[84%]">
                <h2 className="text-heading-dark font-bold text-xl sm:text-2xl">
                  ВОСХИТИТЕЛЬНЫЙ ВКУС
                </h2>
                <p className="max-w-[80%]">
                  MiDori вдохновляется традициями японских мастеров, все наши моти{' '}
                  <span className="bg-button-hover">ручной работы</span> и приготовлены по лучшим
                  рецептам, проверенным временем
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <PiPlant className="h-[72px] w-[72px] sm:w-[64px] sm:h-[64px]" />
              <div className="max-w-[74%] sm:max-w-none lg:max-w-[80%] xl:max-w-[84%]">
                <h2 className="text-heading-dark font-bold text-xl sm:text-2xl">100% VEGAN</h2>
                <p className="max-w-[80%]">
                  Мы заботимся о сохранении планеты, в составе наших моти только свежие, органически
                  выращенные рис, фрукты и ягоды
                </p>
              </div>
            </div>
            <Link
              href={'/shop'}
              className="rounded-3xl  border border-foreground
              bg-button
              group hover:italic hover:bg-transparent
              hover:shadow-[inset_0_0_4px_3px_rgba(215,89,161,0.36),0_0_6px_3px_rgba(215,89,161,0.42)]
              px-7 py-1  transition duration-300
              w-auto self-center mt-6
              flex items-center gap-2"
            >
              Выбрать свой вкус
              <span
                className="text-xl group-hover:translate-x-1 transition-all
               duration-100 ease-in-out"
              >
                &rarr;
              </span>
            </Link>
          </div>
        </div>

        <div className="flex flex-col justify-start gap-4 bg-background-lightest p-16 sm:p-24">
          <img
            src="/images/mochi-mandarin.png"
            alt="Japanese Dessert"
            className="w-full object-cover h-auto -mt-14 mb-5"
          />
          <h2 className="mb-5 text-5xl text-heading-dark font-serif">
            Японский десерт с многолетней историей
          </h2>
          <p className="">
            Моти — старинное и самое известное японское лакомство, завоевавшее сердца сладкоежек по
            всему миру.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
