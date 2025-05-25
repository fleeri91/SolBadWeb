import axios from 'axios'
import { NextResponse } from 'next/server'

import { Bath } from '@/types/BathingWater'
import {
  HAVBathingWaterRoot,
  WatersAndAdvisory,
} from '@/types/HAV/HAVBathingWater'

export async function GET() {
  try {
    const response = await axios.get<HAVBathingWaterRoot>(
      'https://gw-test.havochvatten.se/external-public/bathing-waters/v2/bathing-waters'
    )

    const data = response.data

    const baths: Bath[] = data.watersAndAdvisories
      .filter(
        (item): item is WatersAndAdvisory =>
          !!item.bathingWater?.samplingPointPosition
      )
      .map((item) => {
        const bathingWater = item.bathingWater
        return {
          name: bathingWater.name,
          coordinates: {
            lon: Number(bathingWater.samplingPointPosition.longitude),
            lat: Number(bathingWater.samplingPointPosition.latitude),
          },
          id: bathingWater.id,
        }
      })

    return NextResponse.json(baths)
  } catch (error) {
    console.error('Failed to fetch bathing waters:', error)
    return new NextResponse('Failed to fetch bath spots', { status: 500 })
  }
}
