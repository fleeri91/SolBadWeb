'use client'

import Map from '@/components/Map'
import Preferences from '@/components/Preferences'
import { Bath } from '@/types/BathingWater'
import { Box, ActionIcon } from '@mantine/core'
import { Settings } from 'lucide-react'
import { useState } from 'react'
import useSWR from 'swr'
import HomePageLoading from './loading'

const HomePage = () => {
  const [PreferencesOpen, setPreferencesOpen] = useState<boolean>(false)

  const { data, isLoading, error, mutate } = useSWR<Bath[]>(`/bathingWaters`, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    errorRetryCount: 3,
    errorRetryInterval: 5000,
  })

  if (isLoading) {
    return <HomePageLoading />
  }

  if (error) {
    return (
      <div>
        <h1>error</h1>
        <button onClick={() => mutate()}>Try again</button>
      </div>
    )
  }

  if (!data) {
    return <></>
  }

  return (
    <div className="h-screen">
      <Map locations={data} />
      <Box className="absolute right-0 bottom-0 p-4">
        <ActionIcon size="input-md" onClick={() => setPreferencesOpen(true)}>
          <Settings />
        </ActionIcon>
      </Box>
      <Preferences
        onClose={() => setPreferencesOpen(false)}
        isOpen={PreferencesOpen}
      />
    </div>
  )
}

export default HomePage
