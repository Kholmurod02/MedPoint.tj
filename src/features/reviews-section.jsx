import { useGetReviewsForClientsQuery } from '@/entities/reviews/api/reviewApi'
import { Marquee } from '@/shared/magicui/marquee'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu'
import { Calendar, Eye, MoreVertical, Star, User, UserCheck } from 'lucide-react'
import React from 'react'

const ReviewsSection = () => {

    const { data } = useGetReviewsForClientsQuery()
    const reviewData = data?.data;
    console.log(reviewData);



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

    return (
        <div className="grid gap-4">
            <Marquee pauseOnHover className="[--duration:20s] cursor-pointer">
                {reviewData?.map((review) => (
                    <Card
                        key={review.id}
                        className={`shadow-sm border w-[350px] transition-all hover:shadow-md ${review.isHidden ? "border-red-200 bg-red-50/30" : "border-slate-200"
                            }`}
                    >
                        <CardContent className="p-4">
                            <div className="space-y-3">
                                {/* Header with user info and actions */}
                                <div className="flex items-start">
                                    <div className="flex flex-col  gap-2 min-w-0 flex-1">
                                        {/* User icon + name together */}
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                                <User className="w-3 h-3 text-green-600" />
                                            </div>
                                            <p className="font-medium text-slate-900 text-sm truncate">{review.userName}</p>
                                        </div>

                                        {/* Doctor name below */}
                                        <div className="min-w-0 flex-1 ml-6">
                                            <div className="flex items-center gap-1 mt-0.5">
                                                <UserCheck className="w-3 h-3 text-blue-600 flex-shrink-0" />
                                                <p className="text-xs text-slate-600 truncate">Dr. {review?.doctorName}</p>
                                            </div>
                                        </div>
                                    </div>
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



        </div>
    )
}

export default ReviewsSection