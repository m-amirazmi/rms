import type { DeviceCategory } from "@/features/wizard"

export interface BrandMetrics {
  modelCount: number
  completedRepairs: number
  compatibleParts: number
  partsUsed: number
  averageRepairTime: string
}

export interface BrandMeta {
  id: string
  name: string
  category: DeviceCategory
  logoSrc: string
  metrics: BrandMetrics
}
