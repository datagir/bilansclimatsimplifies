import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import {
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Alert,
  Button,
  ButtonGroup,
} from '@dataesr/react-dsfr'

import {
  validateSiren,
  validateNombreSalaries,
  validateAnnee,
} from 'utils/validators'
import { useBilan, useBilansMutation } from 'hooks/useBilans'
import MagicLink from 'components/base/MagicLink'
import BilanForm from './newBilan/BilanForm'

export default function EditBilan() {
  const history = useHistory()

  const { id } = useParams()

  const { data: bilan } = useBilan(id)
  const mutation = useBilansMutation(id)

  const [raisonSociale, setRaisonSociale] = useState('')
  const [nombreSalaries, setNombreSalaries] = useState('')
  const [siren, setSiren] = useState('')
  const [naf, setNaf] = useState('')
  const [region, setRegion] = useState('')
  const [annee, setAnnee] = useState('')
  useEffect(() => {
    if (bilan) {
      setRaisonSociale(bilan.raisonSociale)
      setNombreSalaries(bilan.nombreSalaries)
      setSiren(bilan.siren)
      setNaf(bilan.naf)
      setRegion(bilan.region)
      setAnnee(bilan.annee)
    }
  }, [bilan])

  const [errors, setErrors] = useState([])
  const dictionary = {
    annee: 'Année de reporting du bilan',
    nombreSalaries: 'Nombre de salariés',
    siren: 'SIREN',
  }
  console.log(mutation)

  return (
    <>
      <Row gutters>
        <Col>
          <Breadcrumb>
            <BreadcrumbItem href='/bilans'>Mes bilans</BreadcrumbItem>
            <BreadcrumbItem href={`/bilans/${id}`}>
              {bilan?.raisonSociale} - {bilan?.annee}
            </BreadcrumbItem>
            <BreadcrumbItem>Informations</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row gutters>
        <Col>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              mutation.reset()
              setErrors([])
              let error = false
              if (!validateSiren(siren)) {
                setErrors((prevErrors) => [...prevErrors, 'siren'])
                error = true
              }
              if (!validateNombreSalaries(nombreSalaries)) {
                setErrors((prevErrors) => [...prevErrors, 'nombreSalaries'])
                error = true
              }
              if (!validateAnnee(annee)) {
                setErrors((prevErrors) => [...prevErrors, 'annee'])
                error = true
              }

              if (!error) {
                mutation.mutate(
                  {
                    raisonSociale,
                    nombreSalaries,
                    siren,
                    naf,
                    region,
                    annee,
                  },
                  {
                    onSuccess: () => {
                      history.push(`/bilans/${id}`)
                    },
                  }
                )
              }
            }}
          >
            <BilanForm
              raisonSociale={raisonSociale}
              setRaisonSociale={setRaisonSociale}
              nombreSalaries={nombreSalaries}
              setNombreSalaries={setNombreSalaries}
              checkNombreSalaries={() => {
                if (!validateNombreSalaries(nombreSalaries)) {
                  setErrors((prevErrors) => [...prevErrors, 'nombreSalaries'])
                } else {
                  setErrors((prevErrors) =>
                    prevErrors.filter((error) => error !== 'nombreSalaries')
                  )
                }
              }}
              siren={siren}
              setSiren={setSiren}
              naf={naf}
              setNaf={setNaf}
              region={region}
              setRegion={setRegion}
              annee={annee}
              setAnnee={setAnnee}
              errors={errors}
            />

            <ButtonGroup align='right' isInlineFrom='md'>
              <MagicLink to={`/bilans/${id}`}>
                <Button secondary>Annuler</Button>
              </MagicLink>
              <Button submit>Valider</Button>
            </ButtonGroup>
            {mutation.isError && (
              <Alert
                type='error'
                title='Une erreur est survenue'
                description={mutation?.error?.response?.data?.nonFieldErrors}
              />
            )}
            {errors.length ? (
              <Alert
                type='error'
                title='Votre formulaire comporte des erreurs'
                description={`${
                  errors.length > 1 ? 'Les champs' : 'Le champ'
                } ${errors
                  .map(
                    (error, index) =>
                      `${dictionary[error]}${
                        index === errors.length - 2
                          ? ' et '
                          : index < errors.length - 2
                          ? ', '
                          : ''
                      }`
                  )
                  .join('')} ${
                  errors.length > 1
                    ? 'ne sont pas correctement remplis'
                    : `n'est pas correctement rempli`
                }.`}
              />
            ) : null}
          </form>
        </Col>
      </Row>
    </>
  )
}
