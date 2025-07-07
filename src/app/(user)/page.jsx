"use client"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/shared/ui/button"
import Link from "next/link"
import collective_doctors from '../../../public/file_4840344.jpg'
import { useState } from "react"
import DoctorCard from "@/features/doctor-card"
import doc from "../../../public/manDoctor.jpg"
import do2 from "../../../public/womenDoc.jpg"
import SpecializationCard from "@/features/specialization-card"
import { useGetAllReviewsQuery } from "@/entities/reviews/api/reviewApi"
import ReviewsSection from "@/features/reviews-section"

export default function Home() {
  const [showMore, setShowMore] = useState(false)
  const categories = [
    { name: "Junior-Doctor", level: "entry" },
    { name: "Middle-Doctor", level: "intermediate" },
    { name: "Senior-Doctor", level: "advanced" },
    { name: "Junior-Doctor", level: "entry" },
    { name: "Middle-Doctor", level: "intermediate" },
    { name: "Senior-Doctor", level: "advanced" },

  ]
  const visibleCategories = showMore ? categories : categories.slice(0, 3);

  const doctors = [
    { id: 1, doctorImage: doc, name: "John Doe", spec: 'Junior - Doctor', status: false },
    { id: 2, doctorImage: do2, name: "John Smith", spec: 'Senior - Doctor', status: true },
    { id: 3, doctorImage: doc, name: "Sarah John ", spec: 'Middle - Doctor', status: false }
  ]

  const { data: reviews } = useGetAllReviewsQuery()


  return (
    <div className="container m-auto">
      {/* hero section */}
      <section className="min-h-[520px] bg-[url('/doctorBg2.jpg')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
        {/* Decorative curved element */}
        <div className="h-[520px] bg-[rgba(19,19,19,0.15)] rounded-xl shadow-md backdrop-blur-xs border border-white/10">
          <div className="container mx-auto px-4 py-12 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content Section */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <p className="text-blue-500 font-semibold text-sm tracking-wider uppercase">CARING FOR LIFE</p>
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-800 leading-tight">
                    Leading the Way
                    <br />
                    <span className="text-slate-700">in Medical Excellence</span>
                  </h1>
                </div>

                <Button
                  size="lg"
                  className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-8 py-3 rounded-full font-medium"
                >
                  Our Services
                </Button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* about section */}
      <section className=" py-10 px-4 sm:py-10 sm:px-6 lg:py-15">
        <div className="mx-auto max-w-4xl text-center">
          {/* Welcome Text */}
          <p className="text-sm font-medium tracking-wider text-blue-900 uppercase mb-4">Welcome to MedPoint</p>

          {/* Main Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl mb-6">
            A Great Place to Receive Care
          </h1>

          {/* Description */}
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare.
            Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et.
          </p>

          {/* Learn More Button */}
          <Link href='/about'>
            <Button
              variant="ghost"
              className="text-blue-900 hover:text-blue-600 hover:bg-blue-50 font-medium text-base p-2 h-auto transition duration-300 ease-in-out"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 transition duration-300 ease-in-out group-hover:translate-x-1" />
            </Button>
          </Link>

        </div>
      </section>

      {/* collective photo section  */}
      <section className=" p-2  sm:px-5 mb-20 ">
        <div className="max-w-7xl mx-auto">
          <Image
            src={collective_doctors}
            alt="Collective of doctors"
            className="w-full h-auto rounded-xl object-cover"
            priority
          />
        </div>
      </section>

      {/* categories section */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-blue-400 font-medium text-sm tracking-wider uppercase mb-2">ALWAYS CARING</p>
          <h2 className="text-4xl font-bold text-slate-800 mb-12">Our Specialties</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {visibleCategories.map((category) => (
              <SpecializationCard category={category} key={category.id} />
            ))}
          </div>
          <div className="pt-10">
            <Button
              variant="ghost"
              className="text-blue-700 hover:text-blue-600 hover:bg-blue-50 font-medium text-base p-2 h-auto transition duration-300 ease-in-out"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show Less" : "Show More"}
            </Button>
          </div>
        </div>
      </section>

      {/*  doctors section */}

      <section className="text-center py-10 px-5">
        <p className="text-blue-700 font-medium text-sm tracking-wider uppercase mb-2">Trusted Care</p>
        <h2 className="text-4xl font-bold text-slate-800 mb-12">Our Doctors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          {doctors?.map((docs) => {
            return (
              <div key={docs.id}>
                <DoctorCard el={docs} />
              </div>
            )
          })}
        </div>
        <div className="pt-10">
          <Link href=''>
            <Button
              variant="ghost"
              className="text-blue-700 hover:text-blue-600 hover:bg-blue-50 font-medium text-base p-2 h-auto transition duration-300 ease-in-out" >
              Show More Doctors...
            </Button>
          </Link>
        </div>
      </section>


      {/* reviews section */}
      <section className="text-center my-20">
        <p className="text-blue-400 font-medium text-sm tracking-wider uppercase mb-2">Voices of Care</p>
        <h2 className="text-4xl font-bold text-slate-800 mb-12">What Our Patients Say</h2>
        <ReviewsSection />
      </section>


    </div>
  )
}
