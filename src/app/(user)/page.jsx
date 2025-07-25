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

export default function Home() {
  const [showMore, setShowMore] = useState(false)
  const { data } = useGetDoctorsSpecializationsQuery()
  const specialization = data?.data
  const visibleSpecialization = showMore ? specialization : specialization?.slice(0, 3)
  const { data: doctor } = useGetAllDoctorsQuery("")
  const doctors = doctor?.data
  const faqs = [
    {
      id: 1,
      question: "Is it safe to use traditional (folk) remedies with pharmacy medicine?",
      answer:
        "Some folk remedies can interfere with or increase the side effects of modern medicine. Always consult a doctor before combining them.",
    },
    {
      id: 2,
      question: "What should I do if the medicine doesn’t help after 2–3 days?",
      answer:
        "Do not increase the dose yourself. Contact a doctor — the medication may need to be changed, or the diagnosis reviewed.",
    },
    {
      id: 3,
      question: "Can I continue fasting (e.g. during Ramadan) while taking medicine?",
      answer:
        "Your doctor may adjust the dosage schedule. In cases of serious illness, religion allows exceptions — always consult both your doctor and imam if needed.",
    },
    {
      id: 4,
      question: "What should I do if I have high blood pressure at home?",
      answer:
        "Stay calm, lie down, and measure your pressure. Take your prescribed medicine. If it doesn't go down — call emergency services.",
    },
  ]
  return (
    <div className="container mx-auto">
      {/* Enhanced hero section */}
      <section className="min-h-[520px] bg-[url('/doctorBg2.jpg')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
        {/* Subtle modern overlay */}
        <div className="h-[520px] bg-gradient-to-r from-blue-900/20 via-blue-800/15 to-slate-900/20 rounded-2xl shadow-xl backdrop-blur-sm border border-white/20">
          <div className="container mx-auto px-4 py-12 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Enhanced Content Section */}
              <div className="space-y-8">
                <div className="space-y-6">
                  {/* Modern badge */}
                  <div className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-blue-100 animate-fadeInUp">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                    <p className="text-blue-600 font-semibold text-sm tracking-wider uppercase">CARING FOR LIFE</p>
                  </div>
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight drop-shadow-lg animate-fadeInUp delay-100">
                    Leading the Way
                    <br />
                    <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                      in Medical Excellence
                    </span>
                  </h1>
                </div>
                <Link href="/services">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeInUp delay-200"
                  >
                    Our Services
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Enhanced about section */}
      <section className="py-16 px-4 sm:py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          {/* Modern welcome badge */}
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full mb-6">
            <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase">Welcome to MedPoint</span>
          </div>
          {/* Enhanced heading */}
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl mb-6">
            A Great Place to
            <span className="block text-blue-600">Receive Care</span>
          </h1>
          {/* Enhanced description */}
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare.
            Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et.
          </p>
          {/* Enhanced button */}
          <Link href="/about">
            <Button
              variant="ghost"
              size="lg"
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold text-lg p-4 h-auto transition-all duration-300 rounded-full group"
            >
              Learn More
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>
      {/* Enhanced collective photo section */}
      <section className="p-2 sm:px-5 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <Image
              src="/file_4840344.jpg"
              width={200}
              height={200}
              alt="Collective of doctors"
              className="relative w-full h-auto rounded-2xl object-cover shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
              priority
            />
          </div>
        </div>
      </section>
      {/* Enhanced specialization section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Modern badge */}
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full mb-6">
            <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase">ALWAYS CARING</span>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-12">
            Our <span className="text-blue-600">Specialties</span>
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
              {showMore ? "Show Less" : "Show More"}
            </Button>
          </div>
        </div>
      </section>
      {/* Enhanced doctors section */}
      <section className="text-center py-16 px-5">
        {/* Modern badge */}
        <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full mb-6">
          <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase">Trusted Care</span>
        </div>
        <h2 className="text-4xl font-bold text-slate-900 mb-12">
          Our <span className="text-blue-600">Doctors</span>
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
              Show More Doctors
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>
      {/* FAQ section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto text-center">
          <div className="space-y-4 mb-8">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider">WHAT PEOPLE</p>
            <h2 className="text-4xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-gray-900">Usually Asked</h2>
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
