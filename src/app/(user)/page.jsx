"use client"
import Image from "next/image"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/shared/ui/button"
import Link from "next/link"
import collective_doctors from "../../../public/file_4840344.jpg"
import { useState } from "react"
import DoctorCard from "@/features/doctor-card"
import doc from "../../../public/manDoctor.jpg"
import do2 from "../../../public/womenDoc.jpg"
import SpecializationCard from "@/features/specialization-card"
import ReviewsSection from "@/features/reviews-section"

export default function Home() {
  const [showMore, setShowMore] = useState(false)

  const categories = [
    { id: 1, name: "Junior-Doctor", level: "entry" },
    { id: 2, name: "Middle-Doctor", level: "intermediate" },
    { id: 3, name: "Senior-Doctor", level: "advanced" },
    { id: 4, name: "Junior-Doctor", level: "entry" },
    { id: 5, name: "Middle-Doctor", level: "intermediate" },
    { id: 6, name: "Senior-Doctor", level: "advanced" },
  ]

  const visibleCategories = showMore ? categories : categories.slice(0, 3)

  const doctors = [
    { id: 1, doctorImage: doc, name: "John Doe", spec: "Junior - Doctor", status: false },
    { id: 2, doctorImage: do2, name: "John Smith", spec: "Senior - Doctor", status: true },
    { id: 3, doctorImage: doc, name: "Sarah John ", spec: "Middle - Doctor", status: false },
  ]

  return (
    <div className="container m-auto">
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
                  <div className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-blue-100">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                    <p className="text-blue-600 font-semibold text-sm tracking-wider uppercase">CARING FOR LIFE</p>
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight drop-shadow-lg">
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
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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
              src={collective_doctors || "/placeholder.svg"}
              alt="Collective of doctors"
              className="relative w-full h-auto rounded-2xl object-cover shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
              priority
            />
          </div>
        </div>
      </section>

      {/* Enhanced categories section */}
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
            {visibleCategories.map((category) => (
              <div key={category.id} className="transform hover:scale-105 transition-transform duration-300">
                <SpecializationCard category={category} />
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
          {doctors?.map((docs) => {
            return (
              <div key={docs.id} className="transform hover:scale-105 transition-transform duration-300">
                <DoctorCard el={docs} />
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

      {/* Enhanced reviews section */}
      <section className="text-center my-20 py-8">
        {/* Modern badge */}
        <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full mb-6">
          <Star className="w-4 h-4 text-blue-600 mr-2" />
          <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase">Voices of Care</span>
        </div>

        <h2 className="text-4xl font-bold text-slate-900 mb-12">
          What Our <span className="text-blue-600">Patients Say</span>
        </h2>

        <ReviewsSection />
      </section>
    </div>
  )
}
