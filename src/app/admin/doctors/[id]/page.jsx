import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent } from '@/shared/ui/card'
import { Calendar, DollarSign, Mail, MapPin, Phone, Star, Users } from 'lucide-react'
import React from 'react'

const DoctorById = () => {
  return (
    <div className='container m-auto p-auto'>
         <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={`/placeholder.svg?height=128&width=128`} />
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white text-3xl">
                  JS
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-2xl font-bold ">4.2</span>
                <span>(12 reviews)</span>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center  space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-blue-950">John Smith</h1>
                  {/* {doctor.verified && <CheckCircle className="h-6 w-6 text-green-400" title="Verified Doctor" />} */}
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className='bg-blue-500'>Dentist</Badge>
                  <Badge className='bg-green-700'>Online</Badge>
                  <Badge variant="outline" className="border-slate-600 text-slate-800">
                    5 years
                  </Badge>
                </div>
                <p className="text-slate-700 mb-4">Experienced internal medicine physician with expertise in preventive care and chronic disease management. Dr. Johnson has been practicing for over 15 years and has helped thousands of patients achieve better health outcomes through personalized care and evidence-based medicine.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-slate-700">
                    <Mail className="h-4 w-4" />
                    <span>doctor@email.com</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-700">
                    <Phone className="h-4 w-4" />
                    <span>+992919991111</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-700">
                    <MapPin className="h-4 w-4" />
                    <span>Central Hospital</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-slate-700">
                    <Users className="h-4 w-4" />
                    <span> 120 patients</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-700">
                    <DollarSign className="h-4 w-4" />
                    <span>$100 consultation</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-700">
                    <Calendar className="h-4 w-4" />
                    <span>Joined 2020-12-22</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-10'>
        <Card>
            
        </Card>
        
      </div>
    </div>
  )
}

export default DoctorById