import React from 'react'
import PreAuth from './PreAuth'
import PostAuth from './PostAuth'
import {
  Box,
  Card,
  IconGlif,
  Title,
  Text,
  StyledATag,
  Menu,
  MenuItem
} from './Shared'
import CheckVerifiedStorageAmount from './CheckVerifiedStorageAmount'
import { useJwt } from '../lib/JwtHandler'

export default () => {
  const { jwt } = useJwt()
  return (
    <>
      <Box p={[3, 5]} minHeight='85vh'>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='flex-start'
          alignContent='center'
          mb={4}
        >
          <Menu display='flex' justifyContent='space-between' width='100%'>
            <MenuItem>
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                borderRadius={3}
                bg='core.primary'
                borderRadius={3}
                height={7}
              >
                <IconGlif width='48px' height='48px' fill='white' />
              </Box>
            </MenuItem>
            <MenuItem>
              <StyledATag href='#help' pb={1}>
                Help
              </StyledATag>
            </MenuItem>
          </Menu>
          <Box display='flex' flexDirection='column' mt={4}>
            <Title fontSize={5}>Verify your Filecoin storage</Title>
            <Text mt={1} fontSize={4}>
              Verified storage is cheaper for you to store and maintain.
            </Text>
          </Box>
        </Box>
        <Box display='flex' flexDirection='row' flexWrap='wrap'>
          <Card
            p={3}
            my={3}
            border={0}
            borderRadius={2}
            borderWidth={1}
            overflow='hidden'
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            maxWidth='400px'
            minWidth='320px'
            maxHeight='320px'
            width='100%'
            bg='background.screen'
            boxShadow={2}
          >
            {jwt ? <PostAuth /> : <PreAuth />}
          </Card>
          <Card
            flexGrow='1'
            p={3}
            my={[0, 2, 3]}
            border={0}
            overflow='hidden'
            display='flex'
            flexDirection='row'
            flexWrap='wrap'
            justifyContent='center'
            minHeight='380px'
            minWidth='360px'
          >
            <CheckVerifiedStorageAmount />
          </Card>
        </Box>
      </Box>
    </>
  )
}
