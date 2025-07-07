import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { Facebook, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"

export default function DoctorCard({ el }) {

    return (
        <Card className="w-[300px] max-w-xs p-2 mx-auto overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-0">
                {/* Doctor Image Section */}
                <div className="relative  p-2 pb-4">
                    <div className="flex justify-center">
                        <div className="relative">
                            <Avatar className="w-40 h-40 border-4 border-white shadow-2xl">
                                <AvatarImage src={el?.doctorImage} alt={el?.name} className="object-cover" />
                                <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">{el.name[0]}</AvatarFallback>
                            </Avatar>
                            {/* Online status indicator */}
                            <div className={`absolute bottom-2 right-2 w-6 h-6 border-4 border-white rounded-full ${el.status ? "bg-green-500" : "bg-red-500" }`}></div>
                        </div>
                    </div>
                </div>

                {/* Doctor Info Section */}
                <div className="px-6 py-4 ">
                    <div className="text-center space-y-2">
                        <h3 className="text-lg font-bold text-gray-800 tracking-wide">{el.name}</h3>
                        <p className="text-sm font-semibold text-gray-600 uppercase tracking-widest">{el.spec}</p>

                        {/* Social Icons */}
                        <div className="flex justify-center space-x-3 pt-5 gap-5">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                                <Facebook className="w-4 h-4 text-white" />
                            </div>
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                                <Twitter className="w-4 h-4 text-white" />
                            </div>
                            <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors cursor-pointer">
                                <Linkedin className="w-4 h-4 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* View Profile Button */}
                <div className="mt-10">
                    <Link href={`/doctors/${el.id}`}>
                        <Button className="w-full h-12 bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white font-semibold text-sm tracking-wide  rounded-lg transition-all duration-300">
                            View Profile
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
