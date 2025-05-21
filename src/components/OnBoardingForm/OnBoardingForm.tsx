'use client'

import { useState } from 'react'
import { Card, Button, Group, Stepper } from '@mantine/core'

const OnBoardingForm = () => {
  const [active, setActive] = useState(1)
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current))
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current))

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="w-full">
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step
          label="Steg 1"
          description="Välj din position"
        ></Stepper.Step>
        <Stepper.Step
          label="Steg 2"
          description="Välj färdmedel"
        ></Stepper.Step>
        <Stepper.Step
          label="Steg 3"
          description="Ange önskad distans"
        ></Stepper.Step>

        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Tillbaka
        </Button>
        <Button onClick={nextStep}>Nästa steg</Button>
      </Group>
    </Card>
  )
}

export default OnBoardingForm
