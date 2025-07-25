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

  // Safely get doctorId from token
  let doctorId = null
  if (token) {
    try {
      const decode = jwtDecode(token)
      doctorId = decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    } catch (error) {
      console.error("Invalid token", error)
    }
  }

  const { data: appointment, isLoading, error: apiError } = useGetDoctorOrdersQuery(doctorId, {
    skip: !doctorId,
  })

  const [appointments, setAppointments] = useState([])
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [reason, setReason] = useState("")
  const [notification, setNotification] = useState({ show: false, message: "", type: "" })

  useEffect(() => {
    if (appointment?.data) {
      setAppointments(appointment.data)
    } else {
      setAppointments([])
    }
  }, [appointment])

  const [confirmOrder] = useConfirmOrderByDoctorMutation()
  const handleAccept = async (id) => {
    try {
      await confirmOrder(id).unwrap()
      setNotification({ show: true, message: "Appointment confirmed successfully", type: "success" })
    } catch (error) {
      console.error("Failed to confirm order:", error)
      setNotification({ show: true, message: "Failed to confirm appointment", type: "error" })
    }
  }

  const openCancelDialog = (id) => {
    setSelectedId(id)
    setReason("")
    setCancelDialogOpen(true)
  }

  const [cancelOrder] = useCancelOrderByDoctorMutation()
  const confirmCancel = async () => {
    if (!reason.trim()) return
    
    try {
      await cancelOrder({
        orderId: selectedId,
        reason: reason
      }).unwrap()
      setCancelDialogOpen(false)
      setSelectedId(null)
      setReason("")
      setNotification({ show: true, message: "Appointment cancelled successfully", type: "success" })
    } catch (error) {
      console.error("Failed to cancel order:", error)
      setNotification({ show: true, message: "Failed to cancel appointment", type: "error" })
    }
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

  if (isLoading) return <div className="flex justify-center items-center h-64">Loading appointments...</div>
  if (apiError) return <div className="text-red-500 p-4">Error loading appointments</div>
  if (!doctorId) return <div className="text-red-500 p-4">Doctor not authenticated</div>

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Doctor Appointments</h1>

      {notification.show && (
        <div className={`mb-4 p-3 rounded-md ${notification.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {notification.message}
        </div>
      )}

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
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <TableRow key={`${appointment.id}-${appointment.date}`}>
                  <TableCell>{appointment.userName || "N/A"}</TableCell>
                  <TableCell>{appointment.date || "N/A"}</TableCell>
                  <TableCell>
                    {appointment.startTime && appointment.endTime 
                      ? `${appointment.startTime.slice(0, 5)} – ${appointment.endTime.slice(0, 5)}`
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={badgeVariant(appointment.orderStatus)}>
                      {appointment.orderStatus || "Unknown"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {appointment.cancellationReason || "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    {(appointment.orderStatus === "Pending" || appointment.orderStatus === "NotAcceptedYet") && (
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleAccept(appointment.id)}
                          aria-label="Accept appointment"
                        >
                          <Check className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => openCancelDialog(appointment.id)}
                          aria-label="Cancel appointment"
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No appointments found
                </TableCell>
              </TableRow>
            )}
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
                placeholder="Doctor unavailable, patient rescheduled, emergency..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="min-h-[100px]"
                required
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