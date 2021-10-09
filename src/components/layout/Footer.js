import React from 'react'
import {
  Footer,
  FooterLink,
  FooterBody,
  FooterBodyItem,
  Logo,
  FooterBottom,
  Link,
} from '@dataesr/react-dsfr'

export default function Header() {
  return (
    <Footer>
      <FooterBody
        description={`Retrouvez très prochainement l'outil Bilan Climat simplifié afin de réaliser vos bilans carbone d'entreprise sur les postes 1 & 2 du scope 1.`}
      >
        <Logo splitCharacter={10}>République Française</Logo>
        <FooterBodyItem>
          <Link href='https://www.ademe.fr/'>ademe.fr</Link>
        </FooterBodyItem>
        <FooterBodyItem>
          <Link href='https://beta.gouv.fr/'>beta.gouv.fr</Link>
        </FooterBodyItem>
        <FooterBodyItem>
          <Link href='https://data.ademe.fr/'>data.ademe.fr</Link>
        </FooterBodyItem>
      </FooterBody>
      <FooterBottom>
        <FooterLink href='/'>accessibilité : non conforme</FooterLink>
        <FooterLink href='/'>mentions légales</FooterLink>
        <FooterLink href='/'>données personnelles</FooterLink>
        <FooterLink href='/'>gestion des cookies</FooterLink>
      </FooterBottom>
    </Footer>
  )
}