"use client"

import { useState } from "react"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import { Input } from "@/shared/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Eye, EyeOff, Filter, MoreHorizontal, Search, Star, Trash2, UserCheck } from "lucide-react"

// Your actual data structure
const reviewsData = [
  {
    id: 2,
    doctorId: 1,
    doctorName: "Doctor Test",
    userId: 2,
    userName: "Med1 Point",
    rating: 3,
    comment: "Doctor was very good!",
    isHidden: false,
    createdAt: "2025-07-03T16:39:28.4012688",
    updatedAt: "0001-01-01T05:00:00",
  },
  {
    id: 1,
    doctorId: 2,
    doctorName: "Test Testov",
    userId: 1,
    userName: "Admin User",
    rating: 5,
    comment: "Testing the review service",
    isHidden: true,
    createdAt: "2025-06-29T23:04:42.0380085",
    updatedAt: "0001-01-01T05:00:00",
  },
]

export default function ReviewsAdminTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [visibilityFilter, setVisibilityFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")

  const filteredReviews = reviewsData.filter((review) => {
    const matchesSearch =
      review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesVisibility =
      visibilityFilter === "all" ||
      (visibilityFilter === "visible" && !review.isHidden) ||
      (visibilityFilter === "hidden" && review.isHidden)

    const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter

    return matchesSearch && matchesVisibility && matchesRating
  })

  const getVisibilityBadge = (isHidden) => {
    if (isHidden) {
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
          <EyeOff className="w-3 h-3 mr-1" />
          Hidden
        </Badge>
      )
    } else {
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
          <Eye className="w-3 h-3 mr-1" />
          Visible
        </Badge>
      )
    }
  }

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? "fill-yellow-500 text-yellow-500" : "fill-gray-200 text-gray-200"}`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getAverageRating = () => {
    if (reviewsData.length === 0) return 0
    const sum = reviewsData.reduce((acc, review) => acc + review.rating, 0)
    return (sum / reviewsData.length).toFixed(1)
  }

  return (
    <div className="w-full space-y-6 p-6  min-h-screen">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <Card className="border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                <p className="text-2xl font-bold text-blue-600">{reviewsData.length}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Visible Reviews</p>
                <p className="text-2xl font-bold text-green-600">{reviewsData.filter((r) => !r.isHidden).length}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Eye className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hidden Reviews</p>
                <p className="text-2xl font-bold text-red-600">{reviewsData.filter((r) => r.isHidden).length}</p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <EyeOff className="w-4 h-4 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-yellow-600">{getAverageRating()}</p>
              </div>
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-yellow-600 fill-current" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>


      <Card className="border-blue-200 shadow-lg">
        {/* <CardHeader className="bg-gradient-to-r from-blue-400 to-indigo-200 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">Doctor Reviews Management</CardTitle>
          <CardDescription className="text-blue-100">Manage and moderate patient reviews for doctors</CardDescription>
        </CardHeader> */}
        <CardContent className="p-6">
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search reviews, patients, or doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <Select value={visibilityFilter} onValueChange={setVisibilityFilter}>
              <SelectTrigger className="w-full sm:w-[180px] border-blue-200">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reviews</SelectItem>
                <SelectItem value="visible">Visible</SelectItem>
                <SelectItem value="hidden">Hidden</SelectItem>
              </SelectContent>
            </Select>
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger className="w-full sm:w-[180px] border-blue-200">
                <Star className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reviews Table */}
          <div className="rounded-lg border border-blue-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50 hover:bg-blue-100">
                  <TableHead className="font-semibold text-blue-900">Patient</TableHead>
                  {/* <TableHead className="font-semibold text-blue-900">Doctor</TableHead> */}
                  <TableHead className="font-semibold text-blue-900">Rating</TableHead>
                  {/* <TableHead className="font-semibold text-blue-900">Review</TableHead> */}
                  <TableHead className="font-semibold text-blue-900">Date</TableHead>
                  <TableHead className="font-semibold text-blue-900">Status</TableHead>
                  <TableHead className="font-semibold text-blue-900 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.map((review) => (
                  <TableRow key={review.id} className="hover:bg-blue-50/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border-2 border-blue-200">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={review.userName} />
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {review.userName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">{review.userName}</div>
                          {/* <div className="text-sm text-gray-500">Patient ID: {review.userId}</div> */}
                        </div>
                      </div>
                    </TableCell>
                    {/* <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border-2 border-green-200">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={review.doctorName} />
                          <AvatarFallback className="bg-green-100 text-green-700">
                            <UserCheck className="w-5 h-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">{review.doctorName}</div>
                          <div className="text-sm text-gray-500">Doctor ID: {review.doctorId}</div>
                        </div>
                      </div>
                    </TableCell> */}
                    <TableCell>{renderStars(review.rating)}</TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">{formatDate(review.createdAt)}</div>
                    </TableCell>
                    <TableCell>{getVisibilityBadge(review?.isHidden)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="hover:bg-blue-100">
                            <MoreHorizontal className="w-4 h-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="hover:bg-blue-50">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-yellow-50 text-yellow-700">
                            {review.isHidden ? (
                              <>
                                <Eye className="w-4 h-4 mr-2" />
                                Show Review
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-4 h-4 mr-2" />
                                Hide Review
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="hover:bg-red-50 text-red-700">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>


        </CardContent>
      </Card>
    </div>
  )
}
