"use client"

import React, { useState } from "react"
import { Button } from "@/shared/ui/button"
import { Calendar } from "@/shared/ui/calendar"
import { Card, CardContent, CardFooter } from "@/shared/ui/card"
import { useGetScheduleByDoctorIdQuery } from "@/entities/doctor/api/doctorApi"
import { useParams } from "next/navigation"
import { useAddOrderMutation } from "@/entities/order/api/orderApi"
import toast from "react-hot-toast"

export default function Calendar20() {
  const { id } = useParams()
  const [date, setDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const { data } = useGetScheduleByDoctorIdQuery(id)
  const doctorSchedule = data?.data
  const [addOrder] = useAddOrderMutation()

  const handleClick = async () => {
    try {
      const newOrder = {
        doctorId: id,
        date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
        startTime: `${selectedTime}:00`,
      }

      await addOrder(newOrder).unwrap()

      setSelectedTime("")
      toast.success("Appointment successfully booked!")
    } catch (error) {
      console.error("Booking failed:", error)

      // Обработка ошибок RTK Query
      const errMessage = error?.data?.message || "Что-то пошло не так"
      toast.error(errMessage)
    }
  }


  const timeToMinutes = (timeStr) => {
    if (!timeStr) return null
    const [h, m] = timeStr.split(":")
    return parseInt(h) * 60 + parseInt(m)
  }

  const formatDate = (dateObj) => {
    if (!dateObj) return ""
    return dateObj.toISOString().split("T")[0]
  }

  const selectedDateStr = formatDate(date)

  const isPastDate = (day) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const checkDate = new Date(day)
    checkDate.setHours(0, 0, 0, 0)
    return checkDate < today
  }

  const currentDay = date.toLocaleString("en-US", { weekday: "long" })
  const todaySchedule = doctorSchedule?.find((d) => d?.dayOfWeek === currentDay)
  const isDayOff = todaySchedule?.isDayOff ?? true

  const generateTimeSlots = () => {
    if (!todaySchedule) return []

    const workStartMin = timeToMinutes(todaySchedule.workStart)
    const workEndMin = timeToMinutes(todaySchedule.workEnd)
    const lunchStartMin = timeToMinutes(todaySchedule.lunchStart)
    const lunchEndMin = timeToMinutes(todaySchedule.lunchEnd)

    const slots = []

    for (let min = workStartMin; min < workEndMin; min += 30) {
      if (lunchStartMin !== null && min >= lunchStartMin && min < lunchEndMin) continue
      const hour = Math.floor(min / 60)
      const minute = min % 60
      const formatted = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
      slots.push(formatted)
    }

    return slots
  }

  const timeSlots = isDayOff ? [] : generateTimeSlots()

  return (
    <Card className="gap-0 p-0 md:w-[50%]">
      <CardContent className="relative p-0 md:pr-48 grid">
        <div className="p-6">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={date}
            disabled={isPastDate}
            showOutsideDays={false}
            className="bg-red-300 p-0 [--cell-size:2.5rem] md:[--cell-size:3rem]"
            formatters={{
              formatWeekdayName: (date) =>
                date.toLocaleString("en-US", { weekday: "short" }),
            }}
          />
        </div>

        <div className="no-scrollbar inset-y-0 right-0 flex max-h-35 w-full scroll-pb-6 flex-col gap-4 overflow-y-auto border-t p-6 md:absolute md:max-h-none md:w-48 md:border-l md:border-t-0">
          <div className="grid gap-2">
            {isDayOff ? (
              <p className="text-sm text-gray-500">The doctor isn't working today</p>
            ) : timeSlots.length === 0 ? (
              <p className="text-sm text-gray-500">No available time slots</p>
            ) : (
              timeSlots.map((time) => {
                const [hour, minute] = time.split(":").map(Number)
                const now = new Date()
                const isToday = date.toDateString() === now.toDateString()
                const isPastTime =
                  isToday &&
                  (hour < now.getHours() ||
                    (hour === now.getHours() && minute <= now.getMinutes()))

                return (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => setSelectedTime(time)}
                    className="w-full shadow-none"
                    disabled={isPastTime}
                  >
                    {time}
                  </Button>
                )
              })
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 border-t !py-5 px-6 md:flex-row">
        <div className="text-sm">
          {date && selectedTime ? (
            <>
              Your meeting is booked for{" "}
              <span className="font-medium">
                {date.toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </span>{" "}
              at <span className="font-medium">{selectedTime}</span>.
            </>
          ) : (
            <>Select a date and time for your meeting.</>
          )}
        </div>

        <Button
          disabled={!date || !selectedTime}
          className="w-full md:ml-auto md:w-auto bg-blue-900"
          onClick={handleClick}
        >
          Confirm
        </Button>
      </CardFooter>
    </Card>
  )
}
