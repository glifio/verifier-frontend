import { Box, Title, Text, StyledATag } from '@glif/react-components'

const QA = ({ question, answers }) => (
  <Box m={4} maxWidth={12}>
    <Title color='core.nearblack'>{question}</Title>
    {answers.map((AnswerComponent, i) => (
      <AnswerComponent key={i} />
    ))}
  </Box>
)

export default () => (
  <Box
    id='help'
    width='100%'
    bg='background.screen'
    flexGrow={2}
    py={4}
    px={[4, 5]}
    display='flex'
    justifyContent='space-between'
    alignItems='center'
    flexDirection='column'
  >
    <Box
      display='flex'
      flexDirection='row'
      flexWrap='wrap'
      width='100%'
      maxWidth={19}
      justifyContent={['center', 'center', 'space-between']}
    >
      <QA
        question='What is a verified Filecoin address?'
        answers={[
          ({ ...props }) => (
            <Text mt={4} color='core.darkgray' {...props}>
              Anyone who is likely to be using Filecoin to store and use real
              data can verify their Filecoin address to receive DataCap. DataCap
              can be spent in storage deals with miners.
            </Text>
          )
        ]}
      />
      <QA
        question='What is a Filecoin Notary?'
        answers={[
          ({ ...props }) => (
            <Text mt={4} color='core.darkgray' {...props}>
              A Notary is someone who is charged with allocating the amount of
              DataCap an address is likely to require, and granting that address
              a DataCap up to that amount. This app is one example of a Notary.
              You can find other Notaries (who will support larger DataCap
              allocations){' '}
              <StyledATag href='https://filecoinplus.on.fleek.co/verifiers'>
                here.
              </StyledATag>
            </Text>
          )
        ]}
      />
      <QA
        question='Why does it matter?'
        answers={[
          ({ ...props }) => (
            <Text mt={4} color='core.darkgray' {...props}>
              Data stored by verified addresses makes Filecoin storage miners
              eligible for more block rewards. This drives miners to compete for
              verified deals by improving quality of service. You can read more
              about this mechanism in the
              <StyledATag href='https://filecoin.io/2020-engineering-filecoins-economy-en.pdf'>
                {' '}
                Filecoin Econ Whitepaper{' '}
              </StyledATag>
              or in the original{' '}
              <StyledATag href='https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0003.md'>
                {' '}
                FIP.
              </StyledATag>
            </Text>
          )
        ]}
      />
      <QA
        question='How can I renew my address verification?'
        answers={[
          ({ ...props }) => (
            <Text mt={4} color='core.darkgray' {...props}>
              Once you’ve exhausted your DataCap, you can come back here and
              follow the same steps. This process can only be repeated at most
              once per 30 days. Please note that each DataCap request will need
              to use a new Filecoin address.
            </Text>
          )
        ]}
      />
      <QA
        question='How do I verify my address?'
        answers={[
          ({ ...props }) => (
            <Text mt={4} color='core.darkgray' {...props}>
              This app provides small data caps to anyone who has a GitHub
              account over 180 days old to make testing and experimentation
              easy. Simply link your GitHub account to a Filecoin address, and
              we’ll grant that address 32 GiB of DataCap.
            </Text>
          )
        ]}
      />
      <QA
        question='How can I find miners who will take my deals?'
        answers={[
          ({ ...props }) => (
            <Text mt={4} color='core.darkgray' {...props}>
              There is a list of miners offering special pricing for clients
              storing verified deals{' '}
              <StyledATag href='https://github.com/filecoin-project/notary-governance/issues/8'>
                {' '}
                here.
              </StyledATag>
            </Text>
          )
        ]}
      />
      <QA
        question='What can I do with DataCap?'
        answers={[
          ({ ...props }) => (
            <Text mt={4} color='core.darkgray' {...props}>
              Clients with DataCap have increased power on the network. You can
              find a list of suggestions on how to best make use of that DataCap{' '}
              <StyledATag href='https://github.com/filecoin-project/notary-governance/issues/9'>
                {' '}
                here.
              </StyledATag>
            </Text>
          )
        ]}
      />
    </Box>
  </Box>
)
