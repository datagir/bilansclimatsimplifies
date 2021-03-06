import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import {
  Row,
  Col,
  Button,
  ButtonGroup,
  Callout,
  CalloutText,
} from '@dataesr/react-dsfr'

import { useEmissionsCreation } from 'hooks/useEmissions'
import { useToast } from 'hooks/useToast'
import EmissionForm from './emission/EmissionForm'

const Wrapper = styled.form`
  margin-bottom: 1rem;
  padding: 1rem 1rem 0;
  border: 1px solid rgb(232, 232, 232);
`
export default function NewEmission(props) {
  const [open, setOpen] = useState(false)

  const [type, setType] = useState('')
  const [localisation, setLocalisation] = useState('')
  const [valeur, setValeur] = useState('')
  const [unite, setUnite] = useState('')
  const [note, setNote] = useState('')
  const [classification, setClassification] = useState('')

  useEffect(() => {
    setType('')
    setValeur('')
    setUnite('')
    setNote('')
    setClassification('')
  }, [open])

  const poste = props.poste
  useEffect(() => {
    setOpen(false)
  }, [poste])

  const mutation = useEmissionsCreation()

  useToast(mutation)

  return open ? (
    <Wrapper
      onSubmit={(e) => {
        e.preventDefault()
        mutation.mutate(
          {
            bilan: props.bilan,
            poste: props.poste,
            type,
            localisation,
            valeur: String(valeur).replace(',', '.'),
            unite,
            note,
          },
          { onSuccess: () => setOpen(false) }
        )
      }}
    >
      <EmissionForm
        poste={props.poste}
        type={type}
        setType={setType}
        localisation={localisation}
        setLocalisation={setLocalisation}
        valeur={valeur}
        setValeur={setValeur}
        unite={unite}
        setUnite={setUnite}
        note={note}
        setNote={setNote}
        classification={classification}
        setClassification={setClassification}
      />
      <Row gutters>
        <Col>
          <ButtonGroup isInlineFrom='md' align='right'>
            <Button secondary onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button submit>Ajouter une source d'??mission</Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Wrapper>
  ) : (
    <>
      {props.empty ? (
        <>
          <Callout hasInfoIcon={false}>
            {props.poste === 1 ? (
              <>
                <CalloutText>
                  Le poste 1 du Bilan Climat Simplifi?? correspond aux ??missions
                  directes de GES des sources fixes contr??l??es par votre
                  entreprise. Autrement dit, il s???agit des ??missions li??es ?? la
                  combustion d???un combustible au sein de ces sources fixes que
                  sont un br??leur, une turbine, une chaudi??re, un groupe
                  ??lectrog??ne, etc.
                  <br />
                  <br />
                </CalloutText>
                <CalloutText>
                  Cette combustion peut servir ?? produire de la chaleur, un
                  travail m??canique ou de l?????lectricit??. Les combustibles
                  concern??s peuvent ??tre d???origine fossile (produits p??troliers,
                  houille, gaz, etc.) ou biog??nique (biomasse, d??chets
                  organiques, etc.).
                  <br />
                  <br />
                </CalloutText>
                <CalloutText>
                  Pour faire le calcul, il faut vous munir des quantit??s de
                  combustibles utilis??es (en kWh ou en litre ou en kg ou ???) par
                  type de combustible (fioul, gaz naturel, plaquettes
                  foresti??res, etc.). Ces donn??es sont ?? collecter, pour l???ann??e
                  de reporting, au niveau des factures d???achat ou de livraison
                  de combustibles, ou des compteurs d?????nergie. Elles doivent
                  ??tre agr??g??es au p??rim??tre de votre entreprise.
                  <br />
                  <br />
                </CalloutText>
              </>
            ) : (
              <>
                <CalloutText>
                  Le poste 2 du Bilan Climat Simplifi?? correspond aux ??missions
                  directes de GES des sources mobiles contr??l??es par votre
                  entreprise. Autrement dit, il s???agit des ??missions li??es ?? la
                  combustion de carburant au sein de ces sources mobiles, que
                  sont les v??hicules terrestres (voiture, tracteur, camion,
                  chariots ??l??vateurs, etc.), a??riens (avion, jet, etc.),
                  ferroviaires (train, m??tro), maritimes ou fluviaux.
                  <br />
                  <br />
                </CalloutText>
                <CalloutText>
                  Le Poste 2 ne concerne que l???utilisation des sources mobiles
                  contr??l??es par l???entreprise, cela n???inclut pas les
                  d??placements professionnels des salari??s via des modes de
                  transport non contr??l??s par l???entreprise, ou les d??placements
                  domicile-travail des salari??s (hors v??hicule de fonction), le
                  d??placement des clients ou des visiteurs, etc. Pour faire le
                  calcul, il faut vous munir des quantit??s de carburants
                  consomm??es (en kWh ou en litre ou ???) par type de carburant
                  (essence, diesel, GNC, etc.). Ces donn??es sont ?? collecter,
                  pour l???ann??e de reporting, au niveau des factures de
                  carburant. Si les quantit??s consomm??es pour chaque carburant
                  ne sont pas accessibles, il est possible d???extrapoler
                  l?????valuation des ??missions ?? partir du kilom??trage parcouru et
                  du tonnage transport?? par type de v??hicule. Les quantit??s
                  doivent ??tre agr??g??es au p??rim??tre de votre entreprise.
                  <br />
                  <br />
                </CalloutText>
              </>
            )}
            <ButtonGroup isInlineFrom='md' align='right'>
              <Button onClick={() => setOpen(true)}>
                Ajouter une source d'??mission
              </Button>
            </ButtonGroup>
          </Callout>
          <br />
        </>
      ) : (
        <ButtonGroup isInlineFrom='md' align='right'>
          <Button onClick={() => setOpen(true)}>
            Ajouter une source d'??mission
          </Button>
        </ButtonGroup>
      )}
    </>
  )
}
