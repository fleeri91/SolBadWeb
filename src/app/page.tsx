import OnBoardingForm from '@/components/OnBoardingForm'
import { Container, Flex } from '@mantine/core'

const HomePage = async () => {
  return (
    <div className="h-screen bg-blue-400">
      <Container size="md" className="h-full">
        <Flex justify="center" align="center" className="h-full">
          <OnBoardingForm />
        </Flex>
      </Container>
    </div>
  )
}

export default HomePage
