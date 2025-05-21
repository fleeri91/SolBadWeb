'use client'

import { useEffect, useState } from 'react'
import {
  Card,
  Button,
  Group,
  Stepper,
  Box,
  Input,
  ActionIcon,
  Tooltip,
  Select,
  Slider,
  Title,
} from '@mantine/core'

import { useGeoStore } from '@/store/useGeo'

import { LocateFixed } from 'lucide-react'

const OnBoardingForm = () => {
  const { getCurrentLocation, geoLocation } = useGeoStore()

  const [active, setActive] = useState(0)
  const [distance, setDistance] = useState<number>(50)

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current))
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current))

  useEffect(() => {
    console.log(geoLocation)
  }, [geoLocation])

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="w-full">
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="Steg 1" description="Välj din position">
          <Box className="mx-auto max-w-sm p-8">
            <Title className="text-center" mb="md" order={2}>
              Ange position
            </Title>
            <Group gap="md" wrap="nowrap">
              <Input placeholder="Sök plats" className="w-full" />
              <Tooltip label="Använd GEO">
                <ActionIcon onClick={getCurrentLocation} size="lg">
                  <LocateFixed />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Box>
        </Stepper.Step>
        <Stepper.Step label="Steg 2" description="Välj färdmedel">
          <Box className="mx-auto max-w-sm p-8">
            <Title className="text-center" mb="md" order={2}>
              Färdmedel
            </Title>
            <Select
              placeholder="Välj färdmedel"
              data={['Bil', 'Cykel', 'Tåg', 'Gång']}
            />
          </Box>
        </Stepper.Step>
        <Stepper.Step label="Steg 3" description="Ange önskad distans">
          <Box className="mx-auto max-w-sm p-8">
            <Title
              className="text-center"
              mb="md"
              order={2}
            >{`${distance} km`}</Title>
            <Slider
              label={null}
              color="blue"
              defaultValue={50}
              onChange={setDistance}
            />
          </Box>
        </Stepper.Step>

        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Tillbaka
        </Button>
        <Button onClick={nextStep} disabled={geoLocation == null}>
          Nästa steg
        </Button>
      </Group>
    </Card>
  )
}

export default OnBoardingForm
