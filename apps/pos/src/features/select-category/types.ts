import type { DeviceCategory } from "@/features/wizard"

export type { DeviceCategory }

export interface CategoryMeta {
  id: DeviceCategory
  label: string
  description: string
  modelCount: number
  avgRepairTime: string
  dailyIntakes: number
  tag: string | null
  iconBg: string
  iconText: string
  popularBrands: string[]
  priceFrom: number
}
