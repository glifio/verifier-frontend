import styled from 'styled-components'
import { SmartLink, StandardBox } from '@glif/react-components'

const QABox = styled(StandardBox)`
  display: grid;
  padding: 3rem;
  row-gap: 3rem;
  column-gap: 6rem;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }

  @media (min-width: 768px) and (max-width: 1199px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  p {
    color: var(--gray-dark);
  }
`

export default function Education() {
  return (
    <QABox>
      <div>
        <h3>What is a verified Filecoin address?</h3>
        <p>
          Anyone who is likely to be using Filecoin to store and use real data
          can verify their Filecoin address to receive DataCap. DataCap can be
          spent in storage deals with miners.
        </p>
      </div>

      <div>
        <h3>What is a Filecoin Notary?</h3>
        <p>
          A Notary is someone who is charged with allocating the amount of
          DataCap an address is likely to require, and granting that address a
          DataCap up to that amount. This app is one example of a Notary. You
          can find other Notaries (who will support larger DataCap allocations){' '}
          <SmartLink href='https://filecoinplus.on.fleek.co/verifiers'>
            here
          </SmartLink>
          .
        </p>
      </div>

      <div>
        <h3>Why does it matter?</h3>
        <p>
          Data stored by verified addresses makes Filecoin storage miners
          eligible for more block rewards. This drives miners to compete for
          verified deals by improving quality of service. You can read more
          about this mechanism in the{' '}
          <SmartLink href='https://filecoin.io/2020-engineering-filecoins-economy-en.pdf'>
            Filecoin Econ Whitepaper
          </SmartLink>{' '}
          or in the original{' '}
          <SmartLink href='https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0003.md'>
            FIP
          </SmartLink>
          .
        </p>
      </div>

      <div>
        <h3>How can I renew my address verification?</h3>
        <p>
          Once you&rsquo;ve exhausted your DataCap, you can come back here and
          follow the same steps. This process can only be repeated at most once
          per 30 days.
        </p>
      </div>

      <div>
        <h3>How do I verify my address?</h3>
        <p>
          Simply login with GitHub and enter your Filecoin address. We&rsquo;ll
          grant that address DataCap.
        </p>
      </div>

      <div>
        <h3>How much DataCap will I receive?</h3>
        <p>
          As long as your GitHub account is at least 180 days old, you will
          receive at least 64GiB of DataCap. Any amount above 64GiB of DataCap
          allocation granted depends on your GitHub account age and activity and
          how many verified deals your Filecoin Address has made on chain.
        </p>
      </div>

      <div>
        <h3>How can I find miners who will take my deals?</h3>
        <p>
          There is a list of miners offering special pricing for clients storing
          verified deals{' '}
          <SmartLink href='https://github.com/filecoin-project/notary-governance/issues/8'>
            here
          </SmartLink>
          .
        </p>
      </div>

      <div>
        <h3>What can I do with DataCap?</h3>
        <p>
          Clients with DataCap have increased power on the network. You can find
          a list of suggestions on how to best make use of that DataCap{' '}
          <SmartLink href='https://github.com/filecoin-project/notary-governance/issues/9'>
            here
          </SmartLink>
          .
        </p>
      </div>
    </QABox>
  )
}
