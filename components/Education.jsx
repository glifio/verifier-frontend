import styled from 'styled-components'
import { StandardBox, space } from '@glif/react-components'

const QAWrapper = styled.div`
  max-width: 30em;
  margin-left: ${space()};
  margin-right: ${space()};
`

const QA = ({ question, answers }) => (
  <QAWrapper>
    <h3 color='core.nearblack'>{question}</h3>
    {answers.map((AnswerComponent, i) => (
      <AnswerComponent key={i} />
    ))}
  </QAWrapper>
)

const EducationWrapper = styled(StandardBox)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: ${space('large')};
`

export default function Education() {
  return (
    <EducationWrapper>
      <QA
        question='What is a verified Filecoin address?'
        answers={[
          (props) => (
            <p {...props}>
              Anyone who is likely to be using Filecoin to store and use real
              data can verify their Filecoin address to receive DataCap. DataCap
              can be spent in storage deals with miners.
            </p>
          )
        ]}
      />
      <QA
        question='What is a verified Filecoin address?'
        answers={[
          (props) => (
            <p {...props}>
              Anyone who is likely to be using Filecoin to store and use real
              data can verify their Filecoin address to receive DataCap. DataCap
              can be spent in storage deals with miners.
            </p>
          )
        ]}
      />
      <QA
        question='What is a Filecoin Notary?'
        answers={[
          (props) => (
            <p {...props}>
              A Notary is someone who is charged with allocating the amount of
              DataCap an address is likely to require, and granting that address
              a DataCap up to that amount. This app is one example of a Notary.
              You can find other Notaries (who will support larger DataCap
              allocations){' '}
              <a href='https://filecoinplus.on.fleek.co/verifiers'>here.</a>
            </p>
          )
        ]}
      />
      <QA
        question='Why does it matter?'
        answers={[
          (props) => (
            <p {...props}>
              Data stored by verified addresses makes Filecoin storage miners
              eligible for more block rewards. This drives miners to compete for
              verified deals by improving quality of service. You can read more
              about this mechanism in the
              <a href='https://filecoin.io/2020-engineering-filecoins-economy-en.pdf'>
                {' '}
                Filecoin Econ Whitepaper{' '}
              </a>
              or in the original{' '}
              <a href='https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0003.md'>
                {' '}
                FIP.
              </a>
            </p>
          )
        ]}
      />
      <QA
        question='How can I renew my address verification?'
        answers={[
          (props) => (
            <p {...props}>
              Once you&rsquo;ve exhausted your DataCap, you can come back here
              and follow the same steps. This process can only be repeated at
              most once per 30 days.
            </p>
          )
        ]}
      />
      <QA
        question='How do I verify my address?'
        answers={[
          (props) => (
            <p {...props}>
              Simply login with GitHub and enter your Filecoin address.
              We&rsquo;ll grant that address DataCap.
            </p>
          )
        ]}
      />
      <QA
        question='How much DataCap will I receive?'
        answers={[
          (props) => (
            <p {...props}>
              As long as your GitHub account is at least 180 days old, you will
              receive at least 64GiB of DataCap. Any amount above 64GiB of
              DataCap allocation granted depends on your GitHub account age and
              activity and how many verified deals your Filecoin Address has
              made on chain.
            </p>
          )
        ]}
      />
      <QA
        question='How can I find miners who will take my deals?'
        answers={[
          (props) => (
            <p {...props}>
              There is a list of miners offering special pricing for clients
              storing verified deals{' '}
              <a href='https://github.com/filecoin-project/notary-governance/issues/8'>
                {' '}
                here.
              </a>
            </p>
          )
        ]}
      />
      <QA
        question='What can I do with DataCap?'
        answers={[
          (props) => (
            <p {...props}>
              Clients with DataCap have increased power on the network. You can
              find a list of suggestions on how to best make use of that DataCap{' '}
              <a href='https://github.com/filecoin-project/notary-governance/issues/9'>
                {' '}
                here.
              </a>
            </p>
          )
        ]}
      />
    </EducationWrapper>
  )
}
