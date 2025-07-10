'use client'
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Textarea } from "@/shared/ui/textarea"
import { Card, CardContent } from "@/shared/ui/card"
import { MapPin, Mail, Send, Clock } from "lucide-react"
import { useState } from "react"
import axios from "axios"

export default function ContactSection() {

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post('/api/sendMessage', { fullName, email, message })
      setFullName('')
      setEmail('')
      setMessage('')

    } catch (error) {
      console.error(error);

    }
  }

  return (
    <div className="min-h-screen p-4 md:p-7">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Get In Touch Section */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Get In Touch</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-900 to-blue-900 rounded-full"></div>
            </div>

            <div className="space-y-6">
              {/* Location Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-700 to-blue-900 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">Location</h3>
                      <p className="text-gray-900">Dushanbe, Tajikistan</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-700 to-blue-900 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-900">medpoint.tj@gmail.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Phone Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-700 to-blue-900 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">Working Hours</h3>
                      <p className="text-gray-600">Mon-Sat 09:00-20:00 <br /> Sunday Emergency only</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Send Message Section */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Message</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-blue-900 rounded-full"></div>
            </div>

            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <Input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      type="text"
                      placeholder="Your Full Name"
                      className="h-12 text-base border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Your Email Address"
                      className="h-12 text-base border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      placeholder="Your Message"
                      rows={6}
                      className="text-base h-30 border-gray-200 focus:border-purple-500 focus:ring-purple-500 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-700 to-blue-900 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
