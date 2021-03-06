import React from 'react'
import styled from 'styled-components'
import { Button, ButtonGroup, Title } from '@dataesr/react-dsfr'
import { useKeycloak } from '@react-keycloak/web'

import { useUser } from 'hooks/useUser'
import MagicLink from 'components/base/MagicLink'
import DownloadButton from './ademeLoginButtons/DownloadButton'

const Wrapper = styled.div`
  margin-bottom: 1rem;
  padding: 2rem 1rem 1rem;
  background-color: rgb(232, 232, 232);
`
const StyledTitle = styled(Title)`
  text-align: center;
`
export default function AdemeLoginButton() {
  const { keycloak, initialized } = useKeycloak()

  const { data: user } = useUser(keycloak.authenticated)

  return initialized ? (
    keycloak.authenticated ? (
      <Wrapper>
        <StyledTitle as='h3' look='h3' align='center'>
          Bonjour {user?.firstName} {user?.lastName}
        </StyledTitle>
        <ButtonGroup isInlineFrom='md' align='center'>
          <Button secondary onClick={keycloak.logout}>
            Me deconnecter
          </Button>

          <MagicLink to='/bilans'>
            <Button>Voir mes bilans</Button>
          </MagicLink>
          {user?.isStaff && <DownloadButton />}
        </ButtonGroup>
      </Wrapper>
    ) : (
      <ButtonGroup isInlineFrom='md' align='center'>
        <MagicLink to='/inscription'>
          <Button size='lg'>M'inscrire</Button>
        </MagicLink>
        <Button onClick={keycloak.login} size='lg'>
          Me connecter
        </Button>
      </ButtonGroup>
    )
  ) : null
}
