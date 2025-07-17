"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/shared/ui/dialog"
import { Label } from "@/shared/ui/label"
import { Textarea } from "@/shared/ui/textarea"
import { Button } from "@/shared/ui/button"
import { Save, X, Star } from "lucide-react"
import toast from "react-hot-toast"
import { usePostReviewMutation } from "@/entities/reviews/api/reviewApi"

function StarRatingSelect({ value, onChange }) {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onChange(star)}
                    aria-label={`${star} star`}
                    className={`transition-transform hover:scale-110 focus:outline-none ${value >= star ? "text-yellow-400" : "text-gray-300"
                        }`}
                >
                    <Star
                        className={`h-6 w-6 ${value >= star ? "fill-yellow-400" : "fill-none"}`}
                    />
                </button>
            ))}
        </div>
    )
}

export function LeaveReviewModal({ doctorId }) {
    const [open, setOpen] = useState(false)
    const [review, setReview] = useState({
        doctorId: doctorId,
        rating: 3,
        comment: "",
    })

    const [postReview] = usePostReviewMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (review.rating === 0) {
            toast.error("Please select a rating")
            return
        }

        try {
            // TODO: сюда вызов API или RTK Query
            await postReview(review).unwrap()

            toast.success("Review submitted successfully!")
            setOpen(false)
            setReview({ doctorId: doctorId || 0, rating: 0, comment: "" })
        } catch (error) {
            toast.error("Failed to submit review")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className={' mx-10'}>
                    Leave Review
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg sm:mx-auto">
                <DialogTitle>Leave a Review</DialogTitle>
                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    <input type="hidden" value={review.doctorId} />

                    <div className="space-y-1">
                        <Label htmlFor="rating">Rating</Label>
                        <StarRatingSelect
                            value={review.rating}
                            onChange={(rating) => setReview({ ...review, rating })}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="comment">Comment</Label>
                        <Textarea
                            id="comment"
                            placeholder="Write your comment..."
                            value={review.comment}
                            onChange={(e) => setReview({ ...review, comment: e.target.value })}
                            required
                            rows={4}
                            className="resize-none"
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="submit">
                            <Save className="mr-2 h-4 w-4" />
                            Submit
                        </Button>
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => setOpen(false)}
                        >
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
