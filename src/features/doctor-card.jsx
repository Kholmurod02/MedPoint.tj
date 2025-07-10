import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Facebook, Twitter, Linkedin, Star, Clock } from "lucide-react"
import Link from "next/link"

export default function DoctorCardBlue({ el }) {
  return (
    <Card className="w-[300px] mx-auto overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-blue-50 rounded-xl border border-blue-100">
      <CardContent className="p-0">
        {/* Header Section */}
        <div className="relative p-4">
          {/* Status Badge */}
          <div className="flex justify-end mb-3">
            <Badge
              variant={el.status ? "default" : "secondary"}
              className={`${
                el.status ? "bg-green-500" : "bg-gray-400"
              } text-white px-2 py-0.5 rounded-full`}
            >
              {el.status ? "Online" : "Offline"}
            </Badge>
          </div>

          {/* Doctor Avatar */}
          <div className="flex justify-center">
            <Avatar className="w-24 h-24 border-2 border-white shadow-md">
              <AvatarImage
                src={el?.doctorImage || "/placeholder.svg"}
                alt={el?.name}
                className="object-cover"
              />
              <AvatarFallback className="bg-blue-500 text-white">
                {el.name?.[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Doctor Information */}
        <div className="px-4 py-3 space-y-3">
          <div className="text-center space-y-1">
            <h3 className="text-lg font-bold text-gray-800">{el.name}</h3>
            <p className="text-sm text-blue-600 font-medium">
              {el.spec}
            </p>
          </div>

          {/* Rating and Experience */}
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-gray-700">4.9</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="font-medium text-gray-700">8+ years</span>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-3 pt-2">
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Facebook className="w-4 h-4 text-blue-600" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Twitter className="w-4 h-4 text-blue-400" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Linkedin className="w-4 h-4 text-blue-700" />
            </Button>
          </div>
        </div>

        {/* Action Button */}
        <div className="px-4 pb-4 pt-1">
          <Link href={`/doctors/${el.id}`}>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              View Profile
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}