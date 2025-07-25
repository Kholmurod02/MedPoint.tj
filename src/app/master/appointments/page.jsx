"use client"

import { useState, useEffect } from "react"
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
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { useGetDoctorOrdersQuery } from "@/entities/doctor/api/doctorApi"
import { useCancelOrderByDoctorMutation, useConfirmOrderByDoctorMutation } from "@/entities/order/api/orderApi"

export default function AppointmentsPage() {
  const token = Cookies.get("token")

  let doctorId = null
  try {
    const decode = jwtDecode(token)
    doctorId = decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
  } catch (error) {
    console.error("Invalid token", error)
  }

  const { data: appointment, isLoading } = useGetDoctorOrdersQuery(doctorId, {
    skip: !doctorId,
  })

  const [appointments, setAppointments] = useState(appointment?.data)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [reason, setReason] = useState("")
  

  useEffect(() => {
    if (appointment?.data) {
      setAppointments(appointment.data)
    }
  }, [appointment])


  const [confirmOrder] = useConfirmOrderByDoctorMutation()
  const handleAccept = (id) => {
    confirmOrder(id)
  }

  const openCancelDialog = (id) => {
    setSelectedId(id)
    setReason("")
    setCancelDialogOpen(true)
  }

  const[cancelOrder]=useCancelOrderByDoctorMutation()
  const confirmCancel = () => {
    let canceledOrder={
      orderId:selectedId,
      reason:reason
    }
   cancelOrder(canceledOrder)
    setCancelDialogOpen(false)
    setSelectedId(null)
    setReason("")
  }

  const badgeVariant = (status) => {
    switch (status) {
      case "Accepted":
      case "Finished":
        return "default"
      case "Pending":
      case "NotAcceptedYet":
        return "secondary"
      case "Cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Doctor Appointments</h1>

      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="min-w-[200px]">Cancellation Reason</TableHead>
              <TableHead className="text-right w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments?.map((appointment) => (
              <TableRow key={appointment?.id}>
                <TableCell>{appointment?.userName}</TableCell>
                <TableCell>{appointment?.date}</TableCell>
                <TableCell>{`${appointment?.startTime.slice(0, 5)} – ${appointment?.endTime.slice(0, 5)}`}</TableCell>
                <TableCell>
                  <Badge variant={badgeVariant(appointment?.orderStatus)}>{appointment?.orderStatus}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {appointment?.cancellationReason ?? "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  {(appointment?.orderStatus === "Pending" || appointment?.orderStatus === "NotAccepted") && (
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleAccept(appointment?.id)}
                      >
                        <Check className="h-4 w-4 text-green-500" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>{ openCancelDialog(appointment?.id)}}
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Cancel Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogDescription>
              Please provide a reason for cancelling this appointment.
            </DialogDescription>
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
