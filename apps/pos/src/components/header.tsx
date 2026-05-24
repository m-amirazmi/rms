import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"

import { Badge } from "@workspace/ui/components/badge"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb"
import { Link } from "@tanstack/react-router"

export default function Header() {
  return (
    <header className="grid h-16 shrink-0 grid-cols-6 items-center gap-2 border-b px-4">
      <span className="col-span-1 text-lg font-semibold">Baiki POS</span>
      <Breadcrumb className="col-span-4 flex justify-center">
        <BreadcrumbList className="text-base capitalize">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Category</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Brand & Model</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Issues</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Parts</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Customer & Technician</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Summary</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="col-span-1 flex items-center justify-end gap-2">
        <Badge>KL Branch</Badge>
        <Button variant="ghost" size="icon">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="grayscale"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </header>
  )
}
