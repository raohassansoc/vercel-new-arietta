import React, { useState, ChangeEvent, FormEvent, CSSProperties, useEffect } from 'react';
import { Web3Storage } from "web3.storage";
import ABI from "./ERC721_1155_ABI.json"
import { useContractWrite, useProvider } from 'wagmi';
const JWT = 'Bearer 	1c3762a932d78d0f698f'

const NFTMintingComponent: React.FC = () => {
  const provider = useProvider();
  const [callContractFn, setCallContractFn] = useState(false);
  const [tokenURI, setTokenURI] = useState("https://bafybeihjaf4grevkk7fxgpeu2w532q7f2j7tyfqirdebm3537urrwsfgqq.ipfs.w3s.link/data.json")
  const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDMzNjgwREU5MDNBRUIxMjc2NEZGRDJhOWNDRUFDNTNFYjdkMzVkQkIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTQ1MzA5NTA3NzQsIm5hbWUiOiJidWlsZGVyIn0.4B_Mvq1WvDruzbxzU37gHS4cfKG6DVsp4dDkdo495eA";
  const client = new Web3Storage({ token: apiKey });
  // ///////////////////////////////////// For PINATA //////////////////////////////////
  const pinataApiKey = "001f4d346646b671ae73";
  const pinataApiSecret =
    "2cc2d5b9209a6581097301405618daa24bec58dffac0190656baba2bd35e853e";
  const pinataJWT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4MjQwMzVmYS1hMWVmLTRlZWMtOGI1YS1jOTg0ZmZlNjRjODQiLCJlbWFpbCI6ImFtbWFyc2lkZGlxdWk5MDg3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwMDFmNGQzNDY2NDZiNjcxYWU3MyIsInNjb3BlZEtleVNlY3JldCI6IjJjYzJkNWI5MjA5YTY1ODEwOTczMDE0MDU2MThkYWEyNGJlYzU4ZGZmYWMwMTkwNjU2YmFiYTJiZDM1ZTg1M2UiLCJpYXQiOjE2ODE0MTk5MDR9.EK_i5OMSk48gB1VIBhCqaSyycihNyOoFxvzWxq3ZzZw";


  // Loading State
  const [loadingState, setLoadinState] = useState(false)
  // /////////////// initial reload NFT State
  const initialNFTDetails = {
    file: null,
    itemName: '',
    listPrice: '',
    externalLink: '',
    description: ''
  };
  // /////////////// initial reload NFT State
  const [nftDetails, setNFTDetails] = useState({
    file: null as File | null,
    itemName: '',
    listPrice: '',
    externalLink: '',
    description: ''
  });
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNFTDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const { write, isLoading } = useContractWrite({
    address: '0x1b61EEb2529F89F764959F329102Bd3604B9a8Bf',
    abi: ABI,
    functionName: 'createNFT',
    args: [
      tokenURI,
    ],
    async onSuccess(data) {
      console.log("NFT created of ===> ", data)
      try {
        const receipt = await provider.waitForTransaction(data.hash);
        console.log("My receipt ===> ", receipt)
      } catch (error) {
        console.log(error)
      }
    },
    onError(error) {
      console.log(error)
    }
  } as any)

  useEffect(() => {
    setLoadinState(isLoading)

  }, [isLoading])

  useEffect(() => {
    console.log("outer ======.")
    if (!isLoading) {
      console.log("inner ======.")
      setNFTDetails(initialNFTDetails)
      setPreviewURL(null)
    }
  }, [isLoading])

  useEffect(() => {
    if (callContractFn) {
      write({
      } as any)
      setCallContractFn(false)
    }
  }, [callContractFn])

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'video/mp4', 'video/webm', 'audio/mp3', 'audio/wav', 'audio/ogg', 'model/gltf-binary', 'model/gltf+json'];
      const maxFileSize = 100 * 1024 * 1024; // 100 MB
      if (allowedTypes.includes(file.type) && file.size <= maxFileSize) {
        setNFTDetails(prevState => ({
          ...prevState,
          file: file
        }));

        const reader = new FileReader();
        reader.onload = () => {
          setPreviewURL(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Invalid file type or size. Please select a file within the allowed types and maximum size of 100 MB.');
      }
    }
  };

  const UploadNFTImg = async () => {
    console.log("Uploading NFT")
    // const cid = await client.put([nftDetails?.file]);
    // const ipfsUrl = `https://ipfs.io/ipfs/${cid}/${nftDetails?.file?.name}`;
    // return ipfsUrl
    return "dsd"
  }

  async function uploadFileToPinata() {
    const endpoint = "https://api.pinata.cloud/pinning/pinFileToIPFS";
    const formData = new FormData();
    await formData.append("file", nftDetails?.file);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataApiSecret,
      },
      body: formData,
    });

    const result = await response.json();
    console.log(`https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`);
    // setImage(result.IpfsHash);
    return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
  }

  async function createNftMetadata() {
    const imgIPFS = await uploadFileToPinata()
    const metadata = {
      name: nftDetails?.itemName,
      image: imgIPFS,
      description: nftDetails?.description,
      externalLink: nftDetails?.externalLink
    };

    const endpoint = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
    const data = JSON.stringify(metadata);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataApiSecret,
      },
      body: data,
    });

    const result = await response.json();
    console.log(`https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`)
    // return result.IpfsHash;
    // return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
    setTokenURI(`https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`)
    setCallContractFn(true)
  }
  interface NFTMetaData {
    name: string | undefined; // Replace 'string' with the actual type of nftDetails?.itemName
    image: string;
    description: string | undefined; // Replace 'string' with the actual type of nftDetails?.description
    externalLink: string | undefined; // Replace 'string' with the actual type of nftDetails?.externalLink
  }

  // const UploadMetaData = async () => {
  //   console.log("The First")
  //   const imgIPFS = await UploadNFTImg()
  //   console.log("My Image ===> ", imgIPFS)
  //   const metaData: NFTMetaData = {
  //     name: nftDetails?.itemName,
  //     image: imgIPFS,
  //     description: nftDetails?.description,
  //     externalLink: nftDetails?.externalLink
  //   }
  //   const fileName = "data.json";
  //   const file = new File([JSON.stringify(metaData)], fileName, { type: "data/json" });
  //   const cid = await client.put([file]);
  //   console.log("My meta Data ==> ", cid)
  //   const saveTokenURI = `https://ipfs.io/ipfs/${cid}/data.json`
  //   setTokenURI(saveTokenURI)
  //   setCallContractFn(true)


  // }



  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadinState(true)
    console.log('NFT Details:', nftDetails);
    // UploadMetaData()
    // write({
    // } as any)
    createNftMetadata()
  };

  const styles: { [key: string]: CSSProperties } = {
    container: {
      backgroundColor: 'black',
      color: '#fcb016',
      padding: '20px',
      borderRadius: '8px',
      maxWidth: '100%',
      margin: 'auto',
    },
    title: {
      fontSize: '28px',
      //   marginBottom: '30px',
      textAlign: 'left',
    },
    inputField: {
      width: '100%',
      padding: '12px',
      marginBottom: '20px',
      border: '1px solid #fcb016',
      borderRadius: '8px',
      backgroundColor: 'black',
      color: '#fcb016',
      fontSize: '16px',
      boxSizing: 'border-box',
    },
    inputField1: {
      width: '100%',
      padding: '12px',
      marginBottom: '20px',
      marginTop: '40px',
      border: '1px solid #fcb016',
      borderRadius: '8px',
      backgroundColor: 'black',
      color: '#fcb016',
      fontSize: '16px',
      boxSizing: 'border-box',
    },
    fileInput: {
      width: '100%',
      padding: '12px',
      marginBottom: '20px',
      marginTop: '20px',
      border: '2px dashed #fcb016',
      borderRadius: '8px',
      backgroundColor: 'black',
      color: '#fcb016',
      fontSize: '16px',
      boxSizing: 'border-box',
      textAlign: 'center',
      cursor: 'pointer',
    },
    uploadText: {
      marginBottom: '10px',
    },
    uploadButton: {
      width: '100%',
      padding: '15px',
      backgroundColor: '#fcb016',
      color: 'black',
      border: 'none',
      borderRadius: '8px',
      fontSize: '18px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Image</h2>
      <h6 style={{ marginBottom: '50px' }}>File types supported: JPG, PNG. Max size: 100 MB</h6>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="fileInput" style={styles.fileInput}>
            <div style={styles.uploadText}>
              {previewURL ? (
                <img src={previewURL} alt="Preview" style={{ width: '400px', height: '300px', borderRadius: '8px' }} />
              ) : (
                'Click here to Upload'
              )}
            </div>
            <input
              type="file"
              id="fileInput"
              accept=".jpg, .png, .gif, .svg, .mp4, .webm, .mp3, .wav, .ogg, .glb, .gltf"
              onChange={handleFileInputChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        <input
          type="text"
          name="itemName"
          placeholder="Item Name*"
          value={nftDetails.itemName}
          onChange={handleInputChange}
          style={styles.inputField1}
        />
        {/* <input
          type="text"
          name="listPrice"
          placeholder="List Price*"
          value={nftDetails.listPrice}
          onChange={handleInputChange}
          style={styles.inputField}
        /> */}
        <input
          type="text"
          name="externalLink"
          placeholder="Symbol"
          value={nftDetails.externalLink}
          onChange={handleInputChange}
          style={styles.inputField}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={nftDetails.description}
          onChange={handleInputChange}
          style={{ ...styles.inputField, height: '120px' }}
        ></textarea>
        {
          loadingState ? <button style={styles.uploadButton}>Loading...</button> : <button type="submit" style={styles.uploadButton}>Upload Item</button>
        }


      </form>
    </div>
  );
};

export default NFTMintingComponent;
