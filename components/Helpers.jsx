import styled from 'styled-components'

export const ResponseWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  > p {
    margin: 0;
    padding: 0;
    padding-left: var(--space-s);
    padding-right: var(--space-s);
  }

  margin-top: var(--space-m);
`
