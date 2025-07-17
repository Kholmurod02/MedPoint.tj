"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import { Textarea } from "@/shared/ui/textarea"
import { Label } from "@/shared/ui/label"
import { Check, X } from "lucide-react"


const initialAppointments = [
  {
    id: 3,
    doctorId: 1,
    doctorName: "Doctor Test",
    userId: 1,
    userName: "Admin User",
    date: "2025-07-11",
    startTime: "17:00:00",
    endTime: "17:30:00",
    createdAt: "2025-07-11T15:48:40.681822",
    orderStatus: "NotAccepted",
    cancellationReason: null,
  },
  {
    id: 9,
    doctorId: 1,
    doctorName: "Doctor Test",
    userId: 2,
    userName: "Med1 Point",
    date: "2025-07-19",
    startTime: "17:00:00",
    endTime: "17:30:00",
    createdAt: "2025-07-15T13:50:59.7860327",
    orderStatus: "Pending",
    cancellationReason: null,
  },
  {
    id: 2,
    doctorId: 1,
    doctorName: "Doctor Test",
    userId: 1,
    userName: "Admin User",
    date: "2025-07-11",
    startTime: "13:30:00",
    endTime: "14:00:00",
    createdAt: "2025-07-11T11:35:04.4311663",
    orderStatus: "Finished",
    cancellationReason: null,
  },
  {
    id: 4,
    doctorId: 1,
    doctorName: "Doctor Test",
    userId: 1,
    userName: "Admin User",
    date: "2025-07-12",
    startTime: "13:15:00",
    endTime: "13:45:00",
    createdAt: "2025-07-12T13:14:11.5864809",
    orderStatus: "Finished",
    cancellationReason: null,
  },
  {
    id: 1,
    doctorId: 1,
    doctorName: "Doctor Test",
    userId: 1,
    userName: "Admin User",
    date: "2025-07-11",
    startTime: "13:00:00",
    endTime: "13:30:00",
    createdAt: "2025-07-11T11:34:38.3166186",
    orderStatus: "Finished",
    cancellationReason: null,
  },
  {
    id: 5,
    doctorId: 1,
    doctorName: "Doctor Test",
    userId: 2,
    userName: "Med1 Point",
    date: "2025-07-18",
    startTime: "11:00:00",
    endTime: "11:30:00",
    createdAt: "2025-07-12T17:04:08.2535667",
    orderStatus: "NotAccepted",
    cancellationReason: null,
  },
  {
    id: 8,
    doctorId: 1,
    doctorName: "Doctor Test",
    userId: 2,
    userName: "Med1 Point",
    date: "2025-07-31",
    startTime: "09:45:00",
    endTime: "10:15:00",
    createdAt: "2025-07-12T19:07:17.1896272",
    orderStatus: "NotAccepted",
    cancellationReason: null,
  },
  {
    id: 6,
    doctorId: 1,
    doctorName: "Doctor Test",
    userId: 1,
    userName: "Admin User",
    date: "2025-07-14",
    startTime: "08:00:00",
    endTime: "08:30:00",
    createdAt: "2025-07-12T18:11:30.3834187",
    orderStatus: "Finished",
    cancellationReason: null,
  },
  {
    id: 7,
    doctorId: 1,
    doctorName: "Doctor Test",
    userId: 2,
    userName: "Med1 Point",
    date: "2025-07-31",
    startTime: "08:00:00",
    endTime: "08:30:00",
    createdAt: "2025-07-12T19:06:58.6232265",
    orderStatus: "NotAccepted",
    cancellationReason: null,
  },
]

export default function AppointmentsPage() {
  
  const [appointments, setAppointments] = useState(initialAppointments)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [reason, setReason] = useState("")

  const handleAccept = (id) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, orderStatus: "Accepted" } : a)))
  }

  const openCancelDialog = (id) => {
    setSelectedId(id)
    setReason("")
    setCancelDialogOpen(true)
  }

  const confirmCancel = () => {
    if (selectedId == null) return
    setAppointments((prev) =>
      prev.map((a) => (a.id === selectedId ? { ...a, orderStatus: "Cancelled", cancellationReason: reason } : a)),
    )
    setCancelDialogOpen(false)
    setSelectedId(null)
    setReason("")
  }

  const badgeVariant = (status) => {
    switch (status) {
      case "Accepted":
      case "Finished":
        return "default" // green
      case "Pending":
      case "NotAcceptedYet":
        return "secondary" // gray
      case "Cancelled":
        return "destructive" // red
      default:
        return "outline"
    }
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Doctor Appointments</h1>

      <div className="overflow-x-auto border rounded-lg">
        <Table className="">
          <TableHeader>
            <TableRow>
              {/* <TableHead className="w-[60px]">ID</TableHead> */}
              <TableHead>Patient</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="min-w-[200px]">Cancellation Reason</TableHead>
              <TableHead className="text-right w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment?.id}>
                <TableCell>{appointment?.userName}</TableCell>
                <TableCell>{appointment?.date}</TableCell>
                <TableCell>{`${appointment?.startTime.slice(0, 5)} – ${appointment?.endTime.slice(0, 5)}`}</TableCell>
                <TableCell>
                  <Badge variant={badgeVariant(appointment?.orderStatus)}>{appointment?.orderStatus}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{appointment?.cancellationReason ?? "N/A"}</TableCell>

                <TableCell className="text-right">
                  {(appointment?.orderStatus === "Pending" || appointment?.orderStatus === "NotAccepted") && (
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleAccept(appointment?.id)}
                        aria-label={`Accept appointment ${appointment?.id}`}
                      >
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="sr-only">Accept</span>
                      </Button>

                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => openCancelDialog(appointment?.id)}
                        aria-label={`Cancel appointment ${appointment?.id}`}
                      >
                        <X className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Cancel</span>
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Cancel dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogDescription>Please provide a reason for cancelling this appointment.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason</Label>
              <Textarea
                id="reason"
                placeholder="Doctor unavailable, patient rescheduled, emergency…"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={confirmCancel} disabled={!reason.trim()}>
              Confirm Cancellation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
