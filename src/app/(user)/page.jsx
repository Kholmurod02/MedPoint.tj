"use client"

import Image from "next/image"
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/shared/ui/button" // Changed from shared/ui/button to shared/ui/button
import Link from "next/link"
import { useState } from "react"
import DoctorCard from "@/features/doctor-card" // Assuming this path is correct
import SpecializationCard from "@/features/specialization-card" // Assuming this path is correct
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion" // Changed from shared/ui/accordion to shared/ui/accordion
import { useGetAllDoctorsQuery, useGetDoctorsSpecializationsQuery } from "@/entities/doctor/api/doctorApi" // Assuming these paths are correct
import HeroSection from "@/features/hero-section"
 const faqs = [
  {
    id: 1,
    question: "Безопасно ли использовать народные средства вместе с аптечными лекарствами?",
    answer:
      "Некоторые народные средства могут вступать в конфликт с современными лекарствами или усиливать их побочные эффекты. Всегда консультируйтесь с врачом перед сочетанием.",
  },
  {
    id: 2,
    question: "Что делать, если лекарство не помогает через 2–3 дня?",
    answer:
      "Не увеличивайте дозу самостоятельно. Обратитесь к врачу — возможно, потребуется замена лекарства или пересмотр диагноза.",
  },
  {
    id: 3,
    question: "Можно ли продолжать поститься (например, в Рамадан), принимая лекарства?",
    answer:
      "Врач может скорректировать график приёма. В случае серьёзного заболевания религия допускает исключения — обязательно проконсультируйтесь с врачом и, при необходимости, с имамом.",
  },
  {
    id: 4,
    question: "Что делать, если дома поднялось высокое давление?",
    answer:
      "Сохраняйте спокойствие, прилягте и измерьте давление. Примите назначенное лекарство. Если давление не снижается — вызывайте скорую помощь.",
  },
];


  const features = [
  {
    key: "врачи",
    titleKey: "Удобство записи на прием",
    descKey: "Онлайн-запись экономит время пациентов и сотрудников, снижает количество звонков и ошибок.",
    altKey: "home.section2.Tutors.altText", // Added altKey
    defaultTitle: "Experienced Tutors",
    defaultDesc: "Instructors have experience working on real projects.",
    img: "/book.jpg",
    // alt: "Experienced Tutors", // Removed hardcoded alt
  },
  {
    key: "Teaching",
    titleKey: "Профессиональные врачи",
    descKey: "Вы можете быть уверены в профессиональном подходе, точной диагностике и заботе о вашем здоровье.",
    altKey: "home.section2.Teaching.altText", // Added altKey
    defaultTitle: "Best Teaching Style",
    defaultDesc: "Learn the basics of programming and choose your own path.",
    img: "/Без названия.jpg",
    // alt: "Best Teaching Style", // Removed hardcoded alt
  },
  {
    key: "Support",
    titleKey: "Обратная связь и поддержка",
    descKey: "Пациенты могут оставлять отзывы, задавать вопросы, что помогает улучшать сервис.",
    altKey: "home.section2.Course.altText", // Added altKey
    defaultTitle: "Intensive Course",
    defaultDesc: "6 lessons a week. 24/7 support.",
    img: "/stylee24.webp",
    // alt: "Intensive Course", // Removed hardcoded alt
  },
];


export default function Home() {
  const [showMore, setShowMore] = useState(false)
  const { data } = useGetDoctorsSpecializationsQuery()
  const specialization = data?.data
  const visibleSpecialization = showMore ? specialization : specialization?.slice(0, 3)
  const { data: doctor } = useGetAllDoctorsQuery("")
  const doctors = doctor?.data

  return (
    <div className="container  mx-auto">
 
      <HeroSection/>

         <section className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={feature.key}
                className="group p-8 bg-gray-50 dark:bg-[#0F172A] rounded-3xl transition-all duration-300 hover:scale-105 overflow-hidden h-full flex flex-col justify-between shadow-md dark:shadow-gray-700"
              >
                <div>
                  <h3 className="text-[23px] font-bold mb-4">
                    {(feature.titleKey)}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    {(feature.descKey)}
                  </p>
                </div>

                <div className="relative h-48 w-full">
                  <Image
                    src={feature.img || "/api/placeholder/200/200"}
                    alt={(feature.altKey)}
                    width={i === 0 ? 200 : 200} // Tutor image (external, 360x240 -> 200x133), Teaching & Course images (local, 819x819 -> 200x200)
                    height={i === 0 ? 133 : 200}
                    sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 30vw"
                    className={`${
                      i === 1 || i === 2
                        ? "relative m-auto"
                        : "object-contain absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-auto max-h-full transition-transform"
                    }`}
                    priority={false}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

 
  
      {/* Enhanced specialization section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Modern badge */}
          {/* <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full mb-6">
            <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase">ALWAYS CARING</span>
          </div> */}
          <h2 className="text-4xl font-bold text-slate-900 mb-12">
            Наши <span className="text-blue-600"> направления</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {visibleSpecialization?.map((Specialty) => (
              <div key={Specialty.id} className="transform hover:scale-105 transition-transform duration-300">
                <SpecializationCard Specialty={Specialty} />
              </div>
            ))}
          </div>
          <div className="pt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 font-semibold text-lg p-4 h-auto transition-all duration-300 rounded-full px-8 bg-transparent"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Показать меньше" : "Показать больше"}
            </Button>
          </div>
        </div>
      </section>
      {/* Enhanced doctors section */}
      <section className="text-center py-16 px-5">
        {/* Modern badge */}
        
        <h2 className="text-4xl font-bold text-slate-900 mb-12">
          Наши <span className="text-blue-600">Врачи</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl mx-auto">
          {doctors?.slice(0, 3)?.map((docs) => {
            return (
              <div key={docs.id} className="transform hover:scale-105 transition-transform duration-300">
                <DoctorCard key={docs.id} doctor={docs} />
              </div>
            )
          })}
        </div>
        <div className="pt-12">
          <Link href="/doctors">
            <Button
              variant="outline"
              size="lg"
              className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 font-semibold text-lg p-4 h-auto transition-all duration-300 rounded-full px-8 group bg-transparent"
            >
              Показать больше врачей
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>
      {/* FAQ section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto text-center">
          <div className="space-y-4 mb-8">
            {/* <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider">WHAT PEOPLE</p> */}
            <h2 className="text-4xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-gray-900">Часто задаваемые вопросы</h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4 text-blue-950">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="group border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <AccordionTrigger className="flex w-full items-center justify-between py-4 px-6 text-lg font-semibold text-gray-800 hover:no-underline bg-gray-50 group-data-[state=open]:bg-blue-50 group-data-[state=open]:text-blue-700 transition-colors duration-300">
                  <p>{faq.question}</p>
                  <span className="ml-auto shrink-0 transition-transform duration-200">
                    <ChevronUp className="h-5 w-5 text-gray-600 group-data-[state=open]:hidden group-data-[state=open]:text-blue-700" />
                    <ChevronDown className="h-5 w-5 text-gray-600 group-data-[state=closed]:hidden group-data-[state=closed]:text-blue-700" />
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-700 text-base font-normal leading-relaxed text-left">
                  <p className="text-sm font-normal">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  )
}
