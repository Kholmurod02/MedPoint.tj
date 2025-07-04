"use client"

import { useState } from "react"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { Switch } from "@/shared/ui/switch"
import {
  Calendar,
  Search,
  Star,
  User,
  UserCheck,
  MoreVertical,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu"
import { useGetAllReviewsQuery, useRemoveReviewMutation, useStatusReviewMutation } from "@/entities/reviews/api/reviewApi"
import { Marquee } from "@/components/magicui/marquee"



export default function AdminReviews() {
  const [doctorName, setDoctorName] = useState('')
  const [userName, setUserName] = useState('')
  const [ratingFrom, setRatingFrom] = useState('')
  const [ratingTo, setRatingTo] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [status, setStatus] = useState(false)



  const params = {
    doctorName,
    userName,
    ratingFrom,
    ratingTo,
    dateFrom,
    dateTo,
    isHidden: status
  }

  const { data } = useGetAllReviewsQuery(params)
  const reviewData = data?.data;

  const formatDate = (dateString) => {
    if (dateString === "0001-01-01T00:00:00") return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const [removeReview] = useRemoveReviewMutation()
  const [statusReview] = useStatusReviewMutation()


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">


        {/* Filters */}
        <Card className="shadow-sm border-slate-200">

          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="doctorName">Doctor Name</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="doctorName"
                    placeholder="Search doctor..."
                    className="pl-10"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="userName">User Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="userName"
                    placeholder="Search user..."
                    className="pl-10"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Rating Range</Label>
                <div className="flex gap-2">
                  <Select
                    value={ratingFrom}
                    onValueChange={(value) => setRatingFrom(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="From" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Star</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={ratingTo}
                    onValueChange={(value) => setRatingTo(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="To" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Star</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Date Range</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      type="date"
                      className="pl-10"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      type="date"
                      className="pl-10"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
              <div className="flex items-center space-x-2">
                <Switch
                  id="showHidden"
                  checked={status}
                  onCheckedChange={(value) => setStatus(value)}
                />
                <Label htmlFor="showHidden" className="text-sm font-medium">
                  Show hidden reviews
                </Label>
              </div>

              <Button
                variant="outline"
                onClick={() =>
                  setFilters({
                    doctorName: "",
                    userName: "",
                    ratingFrom: "",
                    ratingTo: "",
                    createdFrom: "",
                    createdTo: "",
                    showHidden: false,
                  })
                }
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>

        </Card>

        {/* Reviews Grid */}
        <div className="grid gap-4">
          <Marquee pauseOnHover reverse className="[--duration:20s] cursor-pointer">
            {reviewData?.slice(0, Math.floor(reviewData.length / 2))?.map((review) => (
              <Card
                key={review.id}
                className={`shadow-sm border w-[350px] transition-all hover:shadow-md ${review.isHidden ? "border-red-200 bg-red-50/30" : "border-slate-200"
                  }`}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Header with user info and actions */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-3 h-3 text-green-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-slate-900 text-sm truncate">{review.userName}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <UserCheck className="w-3 h-3 text-blue-600 flex-shrink-0" />
                            <p className="text-xs text-slate-600 truncate">Dr. {review.doctorName}</p>
                          </div>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-slate-100 flex-shrink-0">
                            <MoreVertical className="w-3 h-3 text-slate-500" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem
                            className="cursor-pointer text-xs"

                          >
                            {review?.isHidden ? (
                              <>
                                <Eye className="w-3 h-3 mr-2" />
                                Unhide
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3 h-3 mr-2" />
                                Hide
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeReview(review.id)}>
                            <Trash2 className="w-3 h-3 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Rating and badges row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                          <span className="text-xs font-medium text-slate-700 ml-1">{review.rating}/5</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {review.isHidden && (
                          <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                            Hidden
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Comment section */}
                    <div className="bg-slate-50 rounded-md p-3 border-l-2 border-blue-200">
                      <p className="text-xs text-slate-700 leading-relaxed line-clamp-3">{review.comment}</p>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-1 justify-end">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-500">{formatDate(review.createdAt)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </Marquee>

          <Marquee pauseOnHover className="[--duration:20s] cursor-pointer">
            {reviewData?.slice(Math.floor(reviewData.length / 2))?.map((review) => (
              <Card
                key={review.id}
                className={`shadow-sm border w-[350px] transition-all hover:shadow-md ${review.isHidden ? "border-red-200 bg-red-50/30" : "border-slate-200"
                  }`}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Header with user info and actions */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-3 h-3 text-green-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-slate-900 text-sm truncate">{review.userName}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <UserCheck className="w-3 h-3 text-blue-600 flex-shrink-0" />
                            <p className="text-xs text-slate-600 truncate">Dr. {review.doctorName}</p>
                          </div>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-slate-100 flex-shrink-0">
                            <MoreVertical className="w-3 h-3 text-slate-500" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem
                            onClick={() => statusReview({ reviewId: review.id, isHidden: !review.isHidden })}
                            className="cursor-pointer text-xs">
                            {review.isHidden ? (
                              <>
                                <Eye className="w-3 h-3 mr-2" />
                                Unhide
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3 h-3 mr-2" />
                                Hide
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeReview(review.id)}>
                            <Trash2 className="w-3 h-3 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Rating and badges row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                          <span className="text-xs font-medium text-slate-700 ml-1">{review.rating}/5</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                          {review.id}
                        </Badge>
                        {review.isHidden && (
                          <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                            {review.isHidden}
                          </Badge>
                        )}
                      </div>

                    </div>

                    {/* Comment section */}
                    <div className="bg-slate-50 rounded-md p-3 border-l-2 border-blue-200">
                      <p className="text-xs text-slate-700 leading-relaxed line-clamp-3">{review.comment}</p>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-1 justify-end">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-500">{formatDate(review.createdAt)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </Marquee>

        </div>

        {/* {reviewData.length === 0 && (
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">No reviews found</h3>
              <p className="text-slate-500">Try adjusting your filters to see more results.</p>
            </CardContent>
          </Card>
        )} */}
      </div>
    </div>
  )
}
