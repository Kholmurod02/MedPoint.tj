'use client'
import DoctorCard from '@/features/doctor-card'
import ReviewsSection from '@/features/reviews-section'
import Swiperr from '@/features/swiper'
import Image from 'next/image'
import doc from '../../../../public/womenDoc.jpg'
import Link from 'next/link'
import { Button } from '@/shared/ui/button'
import { useGetAllDoctorsQuery } from '@/entities/doctor/api/doctorApi'

const AboutUs = () => {

  const features = [
    "A Passion for Healing",
    "5-Star Care",
    "All Our Best",
    "Believe in Us",
    "Always Caring",
    "A Legacy of Excellence",
  ]
  const quotes = [
    {
      id: 1,
      description: "Паника — это половина болезни. Спокойствие — половина здоровья. Терпение — начало выздоровления!",
      title: "Авиценна"
    },
    {
      id: 2,
      description: 'Тело — лишь глина, душа — пламя, И все твои страхи и лечение — та же игра. Лечат оболочку, но не человека внутри, Так выпей за жизнь до начала врачевания.',
      title: "Омар Хайям",
    },
    {
      id: 3,
      description: 'Медицина — это наука, посредством которой мы познаём различные состояния человеческого тела — в здоровье и болезни, средства, которыми здоровье может быть утрачено, а когда утрачено — восстановлено.',
      title: "Авиценна (Ибн Сина) «Канон врачебной науки»",
    },
    {
      id: 4,
      description: "Там, где любят искусство медицины, там любят и человечество.",
      title: "Гиппократ"
    },
    {
      id: 5,
      description: 'Рана — это место, куда проникает Свет.',
      title: "Руми",
    }
  ]
  const { data: doctor } = useGetAllDoctorsQuery("")
  const doctors = doctor?.data 


  return (
    <div className='container m-auto'>

      {/* about section */}
      <section className="bg-white">
        {/* Decorative dotted border top */}
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-50"></div>

        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image Section */}
            <div className="relative">
              {/* Decorative dotted border left */}
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-300 to-transparent opacity-50 hidden lg:block"></div>

              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/istockphoto.jpg"
                  alt="Professional medical team - two smiling healthcare professionals in white coats"
                  width={500}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-4">
                <p className="text-blue-600 font-medium text-sm tracking-wider uppercase">Welcome to MedPoint</p>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Best Care for Your <span className="text-blue-600">Good Health</span>
                </h1>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare
                  ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit
                  nascetur proin massa in. Consequat faucibus porttitor enim et.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque. Convallis felis
                  vitae tortor augue. Velit nascetur proin massa in.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative dotted border bottom */}
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-50"></div>
      </section>

      {/* quotes section */}
      <section className='text-center my-20'>
        <p className="text-blue-600 font-medium text-sm tracking-wider uppercase mb-2">Medical Quotes</p>
        <h2 className="text-4xl font-bold text-slate-800 mb-12">Short quotes from great medical minds.</h2>
        <div className='h-[330px] w-full p-2 my-10'>
          <Swiperr data={quotes} />
        </div>
      </section>

      {/* doctors section */}
      <section className="text-center py-10 px-5">
        <p className="text-blue-700 font-medium text-sm tracking-wider uppercase mb-2">Trusted Care</p>
        <h2 className="text-4xl font-bold text-slate-800 mb-12">Our Doctors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          {doctors?.slice(0,3)?.map((docs) => {
            return (
              <div key={docs.id}>
                <DoctorCard doctor={docs} />
              </div>
            )
          })}
        </div>
        <div className="pt-10">
          <Link href='/doctors'>
            <Button
              variant="ghost"
              className="text-blue-700 hover:text-blue-600 hover:bg-blue-50 font-medium text-base p-2 h-auto transition duration-300 ease-in-out" >
              Show More Doctors...
            </Button>
          </Link>
        </div>
      </section>

      {/* reviews */}
      <section className="text-center my-20">
        <p className="text-blue-600 font-medium text-sm tracking-wider uppercase mb-2">Voices of Care</p>
        <h2 className="text-4xl font-bold text-slate-800 mb-12">What Our Patients Say</h2>
        <ReviewsSection />
      </section>
    </div>
  )
}

export default AboutUs