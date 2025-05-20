export interface HAVBathingWaterInfoRoot {
  administrativeAuthority: AdministrativeAuthority
  algae: boolean
  bathingSeason: BathingSeason
  bathingWater: BathingWater
  cyano: boolean
  lastFourClassifications: LastFourClassifications[]
  pollutionSources: any[]
  supervisoryAuthority: SupervisoryAuthority
  updateDetail: Record<string, never> | UpdateDetail
}

export interface AdministrativeAuthority {
  contactInfo: ContactInfo
}

export interface ContactInfo {
  email?: string
  phone?: string
  url?: string
}
export interface BathingSeason {
  endsAt: string
  startsAt: string
}

export interface BathingWater {
  euType: boolean
  id: string
  municipality: Municipality
  name: string
  notEuMotive: string
  perimeterCoordinates: { latitude: string; longitude: string }[]
  samplingPointPosition: SamplingPointPosition
  waterTypeId: number
  waterTypeIdText: string
}

export interface Municipality {
  contactInfo: ContactInfo
  name: string
}

export interface SamplingPointPosition {
  latitude: string
  longitude: string
}

export interface LastFourClassifications {
  qualityClassId: number
  qualityClassIdText: string
  year: number
}

export interface SupervisoryAuthority {
  contactInfo: ContactInfo
}

export interface UpdateDetail {
  [key: string]: never
}
