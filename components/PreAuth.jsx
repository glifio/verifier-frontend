import React from 'react'
import { Box, StepHeader, Text, Card, IconGitHub } from './Shared'

export default () => {
  return (
    <Box display='flex' flexDirection='column' width='700px' minWidth='700px'>
      <Text color='core.darkgray' textAlign='center' m='0' p='0'>
        Connect to GitHub to begin
      </Text>
      <Card
        p={3}
        m={3}
        mt={1}
        border={0}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        width='100%'
        bg='background.screen'
        boxShadow={2}
      >
        <Box display='flex' flexDirection='row' justifyContent='space-between'>
          <StepHeader
            currentStep={1}
            totalSteps={3}
            glyphAcronym='Vr'
            title='Verify'
            showStepper={false}
            width='auto'
          />
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='center'
            alignItems='center'
            alignSelf='center'
            border={1}
            borderRadius={2}
            css={`
              transition: 0.24s ease-in-out;
              cursor: pointer;
              &:hover {
                opacity: 0.8;
              }
            `}
            onClick={() => {
              window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URL}&state=${process.env.OAUTH_STATE_STRING}`
            }}
          >
            <IconGitHub size={5} ml={2} />
            <Text mx={3} my={3}>
              Start
            </Text>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}
