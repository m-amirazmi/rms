import { useMemo, useState, type FormEvent } from "react"

import { Plus, UserCircle } from "@phosphor-icons/react"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { Input } from "@workspace/ui/components/input"

import type { CustomerSelection, TechnicianSelection } from "@/features/wizard"
import { useWizardStore } from "@/features/wizard"

const EMPTY_QUERY = ""

const CUSTOMERS: CustomerSelection[] = [
  {
    id: "customer-ali-evans",
    fullName: "Ali Evans",
    phone: "+60123456789",
    email: "ali@example.com",
    previousRepairs: 3,
    isNew: false,
  },
  {
    id: "customer-alice-tan",
    fullName: "Alice Tan",
    phone: "+60187654321",
    previousRepairs: 1,
    isNew: false,
  },
  {
    id: "customer-jason-lee",
    fullName: "Jason Lee",
    phone: "+60112233445",
    previousRepairs: 0,
    isNew: false,
  },
]

const TECHNICIANS: TechnicianSelection[] = [
  {
    id: "tech-ahmad-faris",
    name: "Ahmad Faris",
    role: "Senior Technician",
    activeJobs: 2,
    availability: "busy",
  },
  {
    id: "tech-nurul-ain",
    name: "Nurul Ain",
    role: "Junior Technician",
    activeJobs: 1,
    availability: "busy",
  },
  {
    id: "tech-hafiz-zain",
    name: "Hafiz Zain",
    role: "Senior Technician",
    activeJobs: 0,
    availability: "available",
  },
]

interface CustomerForm {
  fullName: string
  phone: string
  email: string
  notes: string
}

const EMPTY_CUSTOMER_FORM: CustomerForm = {
  fullName: "",
  phone: "",
  email: "",
  notes: "",
}

function normalizePhone(phone: string) {
  return phone.replace(/[\s()-]/g, "")
}

function isValidMalaysianMobile(phone: string) {
  return /^(?:\+?60|0)1\d{7,9}$/.test(normalizePhone(phone))
}

function AvailabilityBadge({
  availability,
}: {
  availability: TechnicianSelection["availability"]
}) {
  const label =
    availability === "available"
      ? "Available"
      : availability === "busy"
        ? "Busy"
        : "Unavailable"

  return (
    <Badge variant={availability === "available" ? "secondary" : "outline"}>
      {label}
    </Badge>
  )
}

export function CustomerTechPage() {
  const [query, setQuery] = useState(EMPTY_QUERY)
  const [isNewCustomerOpen, setIsNewCustomerOpen] = useState(false)
  const [customerForm, setCustomerForm] =
    useState<CustomerForm>(EMPTY_CUSTOMER_FORM)
  const [formError, setFormError] = useState("")
  const selectedCustomer = useWizardStore(
    (state) => state.formData["customer-tech"]?.customer
  )
  const selectedTechnician = useWizardStore(
    (state) => state.formData["customer-tech"]?.technician
  )
  const updateFormData = useWizardStore((state) => state.updateFormData)

  const matchingCustomers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return CUSTOMERS
    return CUSTOMERS.filter(
      (customer) =>
        customer.fullName.toLowerCase().includes(normalizedQuery) ||
        customer.phone.toLowerCase().includes(normalizedQuery) ||
        customer.email?.toLowerCase().includes(normalizedQuery)
    )
  }, [query])

  const selectCustomer = (customer: CustomerSelection) => {
    updateFormData("customer-tech", { customer })
  }

  const selectTechnician = (technician: TechnicianSelection) => {
    if (!selectedCustomer || technician.availability === "unavailable") return
    updateFormData("customer-tech", { technician })
  }

  const closeNewCustomer = () => {
    setIsNewCustomerOpen(false)
    setCustomerForm(EMPTY_CUSTOMER_FORM)
    setFormError("")
  }

  const createCustomer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const fullName = customerForm.fullName.trim()
    const phone = customerForm.phone.trim()
    const email = customerForm.email.trim()

    if (fullName.length < 2) {
      setFormError("Enter a name with at least 2 characters.")
      return
    }
    if (!isValidMalaysianMobile(phone)) {
      setFormError("Enter a valid Malaysian mobile number.")
      return
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Enter a valid email address or leave the field blank.")
      return
    }

    selectCustomer({
      id: `customer-${Date.now()}`,
      fullName,
      phone,
      ...(email ? { email } : {}),
      ...(customerForm.notes.trim()
        ? { notes: customerForm.notes.trim() }
        : {}),
      previousRepairs: 0,
      isNew: true,
    })
    closeNewCustomer()
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Customer & Technician
        </h1>
        <p className="text-sm text-muted-foreground">
          Select a customer and assign a technician to continue.
        </p>
      </header>

      <section
        className="flex flex-col gap-3"
        aria-labelledby="customer-heading"
      >
        <h2 id="customer-heading" className="text-base font-semibold">
          Find Customer
        </h2>
        {selectedCustomer ? (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-primary bg-primary/5 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <UserCircle
                aria-hidden="true"
                className="size-8 shrink-0 text-primary"
              />
              <div className="min-w-0">
                <p className="truncate font-medium">
                  {selectedCustomer.fullName}
                  {selectedCustomer.isNew && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      New customer
                    </span>
                  )}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedCustomer.phone} · {selectedCustomer.previousRepairs}{" "}
                  previous repairs
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                updateFormData("customer-tech", { customer: undefined })
              }
            >
              Change
            </Button>
          </div>
        ) : (
          <>
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name, phone, or email"
              aria-label="Search customers"
            />
            <div className="overflow-hidden rounded-lg border border-border">
              {matchingCustomers.length ? (
                matchingCustomers.map((customer) => (
                  <button
                    key={customer.id}
                    type="button"
                    onClick={() => selectCustomer(customer)}
                    className="flex min-h-16 w-full items-center gap-3 border-b border-border p-4 text-left last:border-b-0 hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
                  >
                    <UserCircle
                      aria-hidden="true"
                      className="size-8 shrink-0 text-muted-foreground"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium">
                        {customer.fullName}
                      </span>
                      <span className="block text-sm text-muted-foreground">
                        {customer.phone} · {customer.previousRepairs} previous
                        {customer.previousRepairs === 1
                          ? " repair"
                          : " repairs"}
                      </span>
                    </span>
                    <span className="text-sm text-primary">Select</span>
                  </button>
                ))
              ) : (
                <p className="p-4 text-sm text-muted-foreground">
                  No customers found. Create a new customer to continue.
                </p>
              )}
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-fit"
              onClick={() => setIsNewCustomerOpen(true)}
            >
              <Plus aria-hidden="true" />
              Create New Customer
            </Button>
          </>
        )}
      </section>

      <section
        className="flex flex-col gap-3"
        aria-labelledby="technician-heading"
      >
        <h2 id="technician-heading" className="text-base font-semibold">
          Assign Technician
        </h2>
        {!selectedCustomer && (
          <p className="text-sm text-muted-foreground">
            Select a customer first to choose a technician.
          </p>
        )}
        {selectedTechnician && (
          <div className="flex items-center justify-between rounded-lg border border-primary bg-primary/5 p-4">
            <div>
              <p className="font-medium">{selectedTechnician.name}</p>
              <p className="text-sm text-muted-foreground">
                {selectedTechnician.role}
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                updateFormData("customer-tech", { technician: undefined })
              }
            >
              Change
            </Button>
          </div>
        )}
        <div className="overflow-hidden rounded-lg border border-border">
          {TECHNICIANS.map((technician) => {
            const isSelected = selectedTechnician?.id === technician.id
            const unavailable =
              !selectedCustomer || technician.availability === "unavailable"

            return (
              <button
                key={technician.id}
                type="button"
                disabled={unavailable}
                aria-pressed={isSelected}
                onClick={() => selectTechnician(technician)}
                className={`flex min-h-16 w-full items-center gap-3 border-b border-border p-4 text-left last:border-b-0 focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                  isSelected ? "bg-primary/5" : "hover:bg-muted/40"
                }`}
              >
                <UserCircle
                  aria-hidden="true"
                  className="size-8 shrink-0 text-muted-foreground"
                />
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{technician.name}</span>
                  <span className="block text-sm text-muted-foreground">
                    {technician.role} · {technician.activeJobs} active{" "}
                    {technician.activeJobs === 1 ? "job" : "jobs"}
                  </span>
                </span>
                <AvailabilityBadge availability={technician.availability} />
                {isSelected && (
                  <Badge variant="secondary" className="ml-1">
                    Selected
                  </Badge>
                )}
              </button>
            )
          })}
        </div>
      </section>

      <Dialog
        open={isNewCustomerOpen}
        onOpenChange={(open) => {
          if (!open) closeNewCustomer()
          else setIsNewCustomerOpen(true)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Customer</DialogTitle>
            <DialogDescription>
              Add the customer details. Name and Malaysian mobile number are
              required.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={createCustomer} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Full Name
              <Input
                autoFocus
                value={customerForm.fullName}
                onChange={(event) =>
                  setCustomerForm((form) => ({
                    ...form,
                    fullName: event.target.value,
                  }))
                }
                autoComplete="name"
                required
                minLength={2}
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Phone
              <Input
                type="tel"
                value={customerForm.phone}
                onChange={(event) =>
                  setCustomerForm((form) => ({
                    ...form,
                    phone: event.target.value,
                  }))
                }
                autoComplete="tel"
                required
                aria-invalid={
                  Boolean(customerForm.phone) &&
                  !isValidMalaysianMobile(customerForm.phone)
                }
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Email{" "}
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
              <Input
                type="email"
                value={customerForm.email}
                onChange={(event) =>
                  setCustomerForm((form) => ({
                    ...form,
                    email: event.target.value,
                  }))
                }
                autoComplete="email"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Notes{" "}
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
              <textarea
                value={customerForm.notes}
                onChange={(event) =>
                  setCustomerForm((form) => ({
                    ...form,
                    notes: event.target.value,
                  }))
                }
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-normal shadow-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
              />
            </label>
            {formError && (
              <p role="alert" className="text-sm text-destructive">
                {formError}
              </p>
            )}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={closeNewCustomer}
              >
                Cancel
              </Button>
              <Button type="submit">Save & Assign</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
