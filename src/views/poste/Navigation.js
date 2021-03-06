import React from 'react'
import styled from 'styled-components'
import { useIsFetching } from 'react-query'
import { Button, ButtonGroup, Title, Text } from '@dataesr/react-dsfr'

import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.div`
  margin-bottom: 1rem;
  padding: 1rem 1rem 0;
  background-color: rgb(232, 232, 232);
`
const StyledTitle = styled(Title)`
  text-align: center;
`
const StyledText = styled(Text)`
  text-align: center;
`
export default function Navigation(props) {
  const isFetching = useIsFetching()

  return (
    <Wrapper>
      <StyledTitle as='h3'>
        Total du poste {props.poste} :{' '}
        {Math.round(props.bilan && props.bilan[`poste${props.poste}`] / 1000)}{' '}
        tCO2e
      </StyledTitle>
      <StyledText>
        {isFetching
          ? 'Sauvegarde en cours...'
          : `Votre bilan est sauvegardé. Vous pouvez fermer cette page et revenir éditer votre bilan plus tard depuis la rubrique "Mes Brouillons"`}
      </StyledText>
      {props.poste === 1 ? (
        <ButtonGroup isInlineFrom='md' align='center' isEquisized>
          <MagicLink to={`/bilans/${props.id}/`}>
            <Button secondary icon='fr-fi-arrow-left-s-line-double'>
              Revenir au bilan
            </Button>
          </MagicLink>
          <MagicLink to={`/bilans/${props.id}/poste2`}>
            <Button icon='fr-fi-arrow-right-s-line-double' iconPosition='right'>
              Passer au poste 2
            </Button>
          </MagicLink>
        </ButtonGroup>
      ) : (
        <ButtonGroup isInlineFrom='md' align='center' isEquisized>
          <MagicLink to={`/bilans/${props.id}/poste1`}>
            <Button secondary icon='fr-fi-arrow-left-s-line-double'>
              Revenir au poste 1
            </Button>
          </MagicLink>
          <MagicLink to={`/bilans/${props.id}?ready=1`}>
            <Button icon='fr-fi-check-line' iconPosition='right'>
              Publier mon bilan
            </Button>
          </MagicLink>
        </ButtonGroup>
      )}
    </Wrapper>
  )
}
