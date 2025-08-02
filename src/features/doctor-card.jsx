import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Facebook, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"


export default function DoctorCard({ doctor }) {
  const fullName = `${doctor?.firstName} ${doctor?.lastName}`
  const primarySpecialization = doctor?.specialization[0] || "General Practitioner"
  const imageUrl = doctor?.profileImageUrl || null

  return (
    <Link href={`/doctors/${doctor.id}`}>
      <Card className=" max-w-sm overflow-hidden rounded-xl shadow-lg bg-white h-[520px] " >
        <CardHeader className="relative bg-doctor-card-bg-light-blue h-[235px] flex items-center justify-center rounded-2xl ">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={`${fullName}'s profile`}
            quality='90%'
            width={400}
            height={400}
            className="object-cover w-full h-full "
          />
          {/* <Button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-doctor-card-button-blue text-white px-6 py-2 rounded-full text-sm font-medium shadow-md hover:bg-doctor-card-button-blue/90">
            {primarySpecialization.replace(/([A-Z])/g, " $1").trim()}
          </Button> */}
        </CardHeader>
        <CardContent className="p-4 text-center">
          <h2 className="text-2xl font-bold text-doctor-card-text-dark-blue mt-4">{fullName}</h2>
          <p className="text-doctor-card-text-gray text-base mt-1">
            {primarySpecialization.replace(/([A-Z])/g, " $1").trim()}
          </p>
          <p className="text-doctor-card-text-medium-gray text-sm mt-4 leading-relaxed">{doctor?.description.slice(0, 100)}</p>
        </CardContent>
        {/* <CardFooter className="flex justify-center gap-4 pb-2">
          <Button
            className="px-4 py-2 rounded-xl"
            onClick={() => {
              // Навигация на страницу профиля
              window.location.href = "/profile";
            }}
          >
            Профиль
          </Button>

          <Button
            className="px-4 py-2 rounded-xl"
            onClick={() => {
            
            }}
          >
            Начать чат
          </Button>
        </CardFooter> */}

      </Card>
    </Link>

  )
}
