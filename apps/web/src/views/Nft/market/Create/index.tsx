import { Card, Heading, PageHeader } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import { useTranslation } from '@pancakeswap/localization'
import NFTMintingComponent from './mintNft'

const Create = () => {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader>
        <Heading as="h1" scale="xxl" color="secondary" data-test="nft-activity-title">
          Create Your NFT's
        </Heading>
      </PageHeader>
      <Page>
        <Card>
        <NFTMintingComponent />
        </Card>
      </Page>
    </>
  )
}

export default Create
