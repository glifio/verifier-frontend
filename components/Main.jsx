import React from 'react'
import PreAuth from './PreAuth'
import PostAuth from './PostAuth'
import { Box, Title, Header, HeaderGlyph } from '@glif/react-components'
import CheckVerifiedStorageAmount from './CheckVerifiedStorageAmount'
import { useJwt } from '../lib/JwtHandler'

export default () => {
  const { jwt } = useJwt()
  return (
    <Box
      position='relative'
      display='flex'
      flexWrap='wrap'
      minHeight='90vh'
      alignItems='center'
      justifyContent='center'
      flexGrow='1'
      p={[2, 3, 5]}
    >
      <Box
        display='flex'
        maxWidth={13}
        width={['100%', '100%', '40%']}
        flexDirection='column'
        alignItems='flex-start'
        alignContent='center'
        mb={4}
      >
        <HeaderGlyph
          alt='Source: https://unsplash.com/photos/g2Zf3hJyYAc'
          text='Verify'
          imageUrl='/imgverify.png'
          color='white'
          fill='white'
        />
        <Box
          display='flex'
          flexDirection='column'
          mt={[2, 4, 4]}
          alignSelf='center'
          textAlign='left'
        >
          <Header lineHeight={1}>Verify yourself, get verified storage</Header>
          <Title mt={3} lineHeight='140%'>
            Get DataCap once a month by connecting to any GitHub account over
            180 days old.
          </Title>
        </Box>
      </Box>
      <Box
        display='flex'
        width={['100%', '80%', '55%']}
        minWidth={11}
        flexWrap='wrap'
        justifyContent='space-evenly'
        margin='auto'
      >
        <Box
          display='flex'
          flexDirection='column'
          p={3}
          mt={[5, 0, 0]}
          minHeight={10}
          width='100%'
          maxWidth={13}
          alignItems='center'
          justifyContent='center'
          borderRadius={2}
          bg='background.screen'
        >
          {jwt ? <PostAuth /> : <PreAuth />}
        </Box>
        <CheckVerifiedStorageAmount />
      </Box>
    </Box>
  )
}
