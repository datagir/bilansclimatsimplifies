import React from 'react'
import { Select } from '@dataesr/react-dsfr'

import { useFacteursEmission } from 'hooks/useFacteursEmission'

export default function TypeSelector(props) {
  const { data: facteurEmission } = useFacteursEmission()
  return facteurEmission ? (
    <Select
      label={`Type d'émission`}
      selected={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      options={
        props.poste === 1
          ? [
              { value: '', label: '', disabled: true, hidden: true },
              ...Object.entries(facteurEmission)
                .filter((entry) => Number(entry[1].poste) === props.poste)
                .filter((entry) => entry[1].groupe === 'Les plus utilisés')
                .sort((a, b) =>
                  a[0].toLowerCase() > b[0].toLowerCase() ? 1 : -1
                )
                .map((entry) => ({
                  value: entry[0],
                  label: entry[1].affichage,
                })),
              { value: '', label: '-----', disabled: true },
              ...Object.entries(facteurEmission)
                .filter((entry) => Number(entry[1].poste) === props.poste)
                .filter((entry) => entry[1].groupe !== 'Les plus utilisés')

                .sort((a, b) =>
                  a[0].toLowerCase() > b[0].toLowerCase() ? 1 : -1
                )
                .map((entry) => ({
                  value: entry[0],
                  label: entry[1].affichage,
                })),
            ]
          : [
              { value: '', label: '', disabled: true, hidden: true },
              { value: '', label: 'Routier', disabled: true },
              ...Object.entries(facteurEmission)
                .filter((entry) => Number(entry[1].poste) === props.poste)
                .filter((entry) => entry[1].groupe === 'Routier')
                .sort((a, b) =>
                  a[0].toLowerCase() > b[0].toLowerCase() ? 1 : -1
                )
                .map((entry) => ({
                  value: entry[0],
                  label: entry[1].affichage,
                })),
              { value: '', label: 'Non routier', disabled: true },
              ...Object.entries(facteurEmission)
                .filter((entry) => Number(entry[1].poste) === props.poste)
                .filter((entry) => entry[1].groupe !== 'Routier')
                .sort((a, b) =>
                  a[0].toLowerCase() > b[0].toLowerCase() ? 1 : -1
                )
                .map((entry) => ({
                  value: entry[0],
                  label: entry[1].affichage,
                })),
            ]
      }
      required
    />
  ) : null
}