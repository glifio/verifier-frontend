import styled from 'styled-components'
import Main from '../components/Main'
import Education from '../components/Education'

const Layout = styled.main`
  display: flex;
  flex-direction: column;
`

export default function Home() {
  return (
    <Layout>
      <Main />
      <Education />
    </Layout>
  )
}
