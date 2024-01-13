import React, { useState, useEffect, CSSProperties } from 'react';
import Image from 'next/image';
import NFTDetailModal from './NFTDetailModal';
import { useContractWrite, useProvider, useContract, useSigner, usePrepareContractWrite, useAccount } from 'wagmi';

import ABI from "../Create/ERC721_1155_ABI.json"

const NFTCard = ({ nft }) => {
  const { address } = useAccount();
  const [myNFT, setMyNFT] = useState(null)
  const [ISopen, setISopen] = useState(false)
  const [ISopenBuy, setISopenBuy] = useState(false)

  // Buy NFT State
  const [tokenId, setTokenID] = useState("");
  const [tokenPrice, setTokenPrice] = useState("");
  const [ethConvertVal, setEthConvertVal] = useState(0)

  const [tdPrice, setTdPrice] = useState(0);
  const [tDId, setSetTdId] = useState(0)

  useEffect(() => {
    const convert = BigInt(Number(nft?.price?._hex))
    const ether = Number(convert) / 10 ** 18
    setEthConvertVal(ether)
  }, [nft])

  useEffect(() => {
    console.log("Mt data ===> ", Number(nft?.price?._hex))
    console.log("Mt data token ===> ", nft?.tokenId?.toNumber())

  }, [myNFT])

  const provider = useProvider();
  // const { data: signer } = useSigner();

  // const contract = useContract({
  //   addressOrName: '0x1b61EEb2529F89F764959F329102Bd3604B9a8Bf',
  //   contractInterface: ABI,
  //   signerOrProvider: signer || provider,
  // } as any);

  const { config } = usePrepareContractWrite({
    address: '0x1b61EEb2529F89F764959F329102Bd3604B9a8Bf',
    abi: ABI,
    functionName: 'buyNFT',
    args: [tDId, tdPrice],
    account: address,
    value: tdPrice
    // overrides: {
    //   value: tdPrice,
    // },
  } as any);

  const { write, isLoading } = useContractWrite(config);


  const buy = () => {
    let value = BigInt(Number(nft?.price?._hex))
    let id = nft?.tokenId?.toNumber()

    console.log(value)
    console.log(id)

    setTdPrice(Number(value))
    setSetTdId(id)

    write({} as any);

    // if (write) {
    //   write();
    // }
  }


  useEffect(() => {
    // console.log("what nft ===> ", nft[4])
    const nftMetaData = nft[4];
    fetch(nftMetaData)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // or response.text() if the response is not in JSON format
      })
      .then(data => {
        // console.log("my nft META DAA", data); 
        setMyNFT(data)
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });

  }, [nft])


  const styles: { [key: string]: CSSProperties } = {
    cardStyle: {
      width: '250px',
      height: "321px",
      borderRadius: '20px',
      padding: '20px',
      backgroundColor: '#27262c', // Set the background color to match the card
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      textAlign: 'center',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    },

    imageStyle: {
      height: '200px',
      width: '100%',
      margin: '0 auto',
      // borderRadius: '50%',
    },

    titleStyle: {
      fontSize: '22px',
      fontWeight: 'bold',
      margin: '10px 0'
    },

    priceStyle: {
      fontSize: '18px',
      margin: '5px 0',
      borderTop: "1px solid gray",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: "6px"
    },

    currencyStyle: {
      fontSize: '14px',
    },
    btnWrapper: {
      // width: '100%',
      // padding: 'px',
      backgroundColor: '#fcb016',
      color: 'black',
      border: 'none',
      borderRadius: '8px',
      fontSize: '15px',
      cursor: 'pointer',
    },
    // ///////////////////////////  Buy NFT Modal  /////////////////////
    modalStyle: {
      // display: 'flex',
      position: 'fixed',
      // top: '20%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#FFF',
      padding: '20px',
      zIndex: 1000,
      width: '60%',
      // height: "100vh",
      borderRadius: '10px',
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    },

    overlayStyle: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      zIndex: 1000,
    },
  }
  const closeModal = () => {
    setISopen(false);
  };


  return (
    <div style={styles.cardStyle} >
      <NFTDetailModal isOpen={ISopen} onClose={closeModal} item={myNFT} />
      {/* <BuyNFTModal isOpen={ISopenBuy} onClose={closeModalBuy} /> */}
      {
        ISopenBuy == true ? <>
          <div style={styles.overlayStyle}
            onClick={() => { setISopenBuy(false); setTokenID(""); setTokenPrice("") }}
          />
          <div style={styles.modalStyle}>
            <input style={{ marginBottom: "10px" }} type="text" placeholder='Token Id' onChange={(e) => setTokenID(e.target.value)} /> <br />
            <input style={{ marginBottom: "10px" }} type="text" placeholder='Price' onChange={(e) => setTokenPrice(e.target.value)} /> <br />
            <button onClick={() => {
              // buy()
            }
            }>Buy</button>
            {
              isLoading ? <p>Loading...</p> : " "
            }
          </div>
        </> : ""
      }

      <div onClick={() => {
        if (myNFT?.name != undefined) {
          setISopen(!ISopen)
        }
      }}>
        <Image
          width={100}
          height={100}
          style={styles.imageStyle}
          src={myNFT?.image == undefined ? `data:image/jpeg;base64,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` : myNFT?.image} // Replace with your image path
          alt="Pancake Bunnies"
        />
        <div style={styles.titleStyle}>{myNFT?.name == undefined ? "Demo" : myNFT?.name}</div>
      </div>
      {
        nft?.isListed ? <div style={styles.priceStyle}>
          <p>price: {ethConvertVal} ASC</p>
          <button onClick={() => buy()} style={styles.btnWrapper}>Buy Now</button>
        </div> : ""
      }

    </div>
  );
};

export default NFTCard;
