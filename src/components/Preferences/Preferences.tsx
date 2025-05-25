'use client'

import { usePreferencesStore } from '@/store/usePreferences'
import { Preferences } from '@/types/Preferences'
import { Transport } from '@/types/Transport'
import {
  Box,
  Flex,
  Modal,
  Select,
  Slider,
  Title,
  Button,
  Group,
} from '@mantine/core'
import { useState, useEffect } from 'react'

interface PreferencesProps {
  isOpen: boolean
  onClose: () => void
}

const transportOptions: { label: string; value: Transport }[] = [
  { label: 'Bil', value: 'Car' },
  { label: 'Cykel', value: 'Bicycle' },
  { label: 'Tåg', value: 'Train' },
  { label: 'Gång', value: 'Walk' },
]

const PreferencesForm = ({ isOpen, onClose }: PreferencesProps) => {
  const { preferences, setPreferences } = usePreferencesStore()

  const [localPreferences, setLocalPreferences] =
    useState<Preferences>(preferences)

  const handleTransportChange = (value: string | null) => {
    if (value && isTransport(value)) {
      setLocalPreferences((prev) => ({ ...prev, transport: value }))
    }
  }

  function isTransport(value: string): value is Transport {
    return ['Car', 'Train', 'Bicycle', 'Walk'].includes(value)
  }

  const handleDistanceChange = (value: number) => {
    setLocalPreferences((prev) => ({ ...prev, distance: value }))
  }

  const handleSave = () => {
    setPreferences(localPreferences)
    onClose()
  }

  useEffect(() => {
    if (isOpen) {
      setLocalPreferences(preferences)
    }
  }, [isOpen, preferences])

  return (
    <Modal opened={isOpen} onClose={onClose} centered>
      <Flex direction="column" gap="xl" className="px-16 py-8">
        <Box>
          <Title className="text-center" mb="md" order={2}>
            Färdmedel
          </Title>
          <Select
            placeholder="Välj färdmedel"
            data={transportOptions}
            value={localPreferences.transport}
            onChange={handleTransportChange}
          />
        </Box>
        <Box>
          <Title className="text-center" mb="md" order={2}>
            {localPreferences.distance} km
          </Title>
          <Slider
            label={null}
            min={1}
            max={200}
            value={localPreferences.distance}
            onChange={handleDistanceChange}
            className="w-full"
          />
        </Box>
      </Flex>
      <Group justify="end" gap="md" mt="xl">
        <Button variant="outline" onClick={onClose}>
          Avbryt
        </Button>
        <Button onClick={handleSave}>Spara</Button>
      </Group>
    </Modal>
  )
}

export default PreferencesForm
