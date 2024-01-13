import { useState, useEffect } from 'react'
import { Heading, Flex, Button, Grid, ChevronRightIcon, NextLinkFromReactRouter } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { NftToken } from 'state/nftMarket/types'
import { getLatestListedNfts, getNftsFromDifferentCollectionsApi } from 'state/nftMarket/helpers'
import { nftsBaseUrl, pancakeBunniesAddress } from 'views/Nft/market/constants'
import { isAddress } from 'utils'
import { CollectibleLinkCard } from '../components/CollectibleCard'
import GridPlaceholder from '../components/GridPlaceholder'
import { useContractRead } from 'wagmi';
import ABI from "../Create/ERC721_1155_ABI.json";
import NFTCard from './NFTCard'

/**
 * Fetch latest NFTs data from SG+API and combine them
 * @returns Array of NftToken
 */
const useNewestNfts = () => {
  const [newestNfts, setNewestNfts] = useState<NftToken[]>(null)
  // const [getAllNFTs, setGetAllNFTs] = useState([]);

  // const NFTResult = useContractRead({
  //   address: '0x1b61EEb2529F89F764959F329102Bd3604B9a8Bf',
  //   abi: ABI,
  //   functionName: 'getAllNFTs',
  // } as any)

  // useEffect(() => {
  //   try {
  //     const allNFTs = NFTResult.data;
  //     setGetAllNFTs(allNFTs as any)
  //   } catch (error) {
  //     console.log(error)
  //   }

  // }, [NFTResult])

  // useEffect(() => {
  //   console.log("my all NFT ===> ", getAllNFTs)
  // }, [getAllNFTs])


  // useEffect(() => {
  //   console.log("My NFTs ===> ", NFTResult.data[0][4])
  //   const nftmetaData = NFTResult.data[0][4]
  //   fetch(nftmetaData)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json(); // or response.text() if the response is not in JSON format
  //     })
  //     .then(data => {
  //       console.log("my nft META DAA", data); // Process the data
  //     })
  //     .catch(error => {
  //       console.error('Fetch error:', error);
  //     });
  // }, [NFTResult])

  useEffect(() => {
    const fetchNewestNfts = async () => {
      const nftsFromSg = await getLatestListedNfts(16)
      const nftsFromApi = await getNftsFromDifferentCollectionsApi(
        nftsFromSg.map((nft) => ({ collectionAddress: nft.collection.id, tokenId: nft.tokenId })),
      )

      const nfts = nftsFromSg
        .map((nftFromSg) => {
          const foundNftFromApi = nftsFromApi.find((nftFromApi) => nftFromApi.tokenId === nftFromSg.tokenId)
          if (foundNftFromApi) {
            return { ...foundNftFromApi, marketData: nftFromSg }
          }
          return null
        })
        .filter(Boolean)
      setNewestNfts(nfts)
    }
    fetchNewestNfts()
  }, [])

  return newestNfts
}

const Newest: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()
  const nfts = useNewestNfts()
  const [getAllNFTs, setGetAllNFTs] = useState([]);

  const NFTResult = useContractRead({
    address: '0x1b61EEb2529F89F764959F329102Bd3604B9a8Bf',
    abi: ABI,
    functionName: 'getAllNFTs',
  } as any)

  useEffect(() => {
    try {
      const allNFTs = NFTResult.data;
      // const listNFT = allNFTs.map((nft,ind) => {})
      // console.log("only listed ===> nft ", allNFTs)
      setGetAllNFTs(allNFTs as any)
    } catch (error) {
      console.log(error)
    }

  }, [NFTResult])

  useEffect(() => {
    console.log("my all NFT ===> ", getAllNFTs)
  }, [getAllNFTs])


  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" mb="26px">
        <Heading data-test="nfts-newest">{t('Newest Arrivals')}</Heading>
        {/* <Button
          as={NextLinkFromReactRouter}
          to={`${nftsBaseUrl}/activity/`}
          variant="secondary"
          scale="sm"
          endIcon={<ChevronRightIcon color="primary" />}
        >
          {t('View All')}
        </Button> */}
      </Flex>
      {nfts ? (
        <Grid
          gridRowGap="24px"
          gridColumnGap="16px"
          gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)']}
          style={{ marginBottom: "25px" }}
        >
          {
            getAllNFTs.map((nft, ind) => {

              return (
                <div>
                  {/* {nft.tokenId.toNumber()} */}
                  {nft.isListed ? <NFTCard nft={nft} /> : ""}

                  {/* <CollectibleLinkCard
                    data-test="newest-nft-card"
                    key={nft.owner + nft.tokenId.toNumber()}
                    nft={nft}
                    currentAskPrice={nft.price.toNumber()}
                  /> */}
                </div>
              )
            })
          }
          {/* {nfts.map((nft) => {
            console.log("mt nft ======>", nft)
            const isPBCollection = isAddress(nft.collectionAddress) === pancakeBunniesAddress
            const currentAskPrice =
              !isPBCollection && nft.marketData?.isTradable ? parseFloat(nft.marketData?.currentAskPrice) : undefined
            return (
              <CollectibleLinkCard
                data-test="newest-nft-card"
                key={nft.collectionAddress + nft.tokenId}
                nft={nft}
                currentAskPrice={currentAskPrice}
              />
            )
          })} */}
        </Grid>
      ) : (
        <GridPlaceholder numItems={8} />
      )}
    </>
  )
}

export default Newest
