"use client"

import * as React from "react"

import { Button } from "@/shared/ui/button"
import { Calendar } from "@/shared/ui/calendar"
import { Card, CardContent, CardFooter } from "@/shared/ui/card"

export default function Calendar20() {
  const [date, setDate] = React.useState(new Date(2025, 5, 12))
  const [selectedTime, setSelectedTime] = React.useState("10:00")
  const timeSlots = Array.from({ length: 37 }, (_, i) => {
    const totalMinutes = i * 15
    const hour = Math.floor(totalMinutes / 60) + 9
    const minute = totalMinutes % 60
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  })

  const bookedDates = Array.from({ length: 3 }, (_, i) => new Date(2025, 5, 17 + i))

  return (
   <CardContent className="flex flex-col gap-10 p-6">
  {/* Календарь: 100% на мобилках и планшетах, 50% на десктопе */}
  <div className="w-full md:w-1/2">
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      defaultMonth={date}
      disabled={bookedDates}
      showOutsideDays={false}
      modifiers={{ booked: bookedDates }}
      modifiersClassNames={{
        booked: "[&>button]:line-through opacity-100",
      }}
      className="bg-transparent"
      formatters={{
        formatWeekdayName: (date) => date.toLocaleString("en-US", { weekday: "short" }),
      }}
    />
  </div>

  {/* Тайм-слоты: тоже 100% на мобилках, 50% на десктопе */}
  <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l md:pl-6 max-h-72 md:max-h-none overflow-y-auto no-scrollbar">
    <div className="grid grid-cols-3 md:grid-cols-1 gap-2">
      {timeSlots.map((time) => (
        <Button
          key={time}
          variant={selectedTime === time ? "default" : "outline"}
          onClick={() => setSelectedTime(time)}
          className="w-full shadow-none text-sm">
          {time}
        </Button>
      ))}
    </div>
  </div>
</CardContent>

  );
}
