export type DeviceCategory =
  | "smartphone"
  | "laptop"
  | "tablet"
  | "wearable"
  | "console"
  | "other"

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
