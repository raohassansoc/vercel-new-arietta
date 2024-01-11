import React, { useState, ChangeEvent, FormEvent, CSSProperties, useEffect } from 'react';
import { Web3Storage } from "web3.storage";
import ABI from "./ERC721_1155_ABI.json"
import { useContractWrite } from 'wagmi';

const NFTMintingComponent: React.FC = () => {
  const [callContractFn, setCallContractFn] = useState(false);
  const [tokenURI, setTokenURI] = useState("")
  const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDMzNjgwREU5MDNBRUIxMjc2NEZGRDJhOWNDRUFDNTNFYjdkMzVkQkIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTQ1MzA5NTA3NzQsIm5hbWUiOiJidWlsZGVyIn0.4B_Mvq1WvDruzbxzU37gHS4cfKG6DVsp4dDkdo495eA";
  const client = new Web3Storage({ token: apiKey });

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

  const { write } = useContractWrite({
    address: '0x4E0022eaAfB21f8050Bfa074673198b5261b6E3b',
    abi: ABI,
    functionName: 'createERC721Token',
    args: [
      nftDetails.itemName,
      nftDetails.externalLink,
      tokenURI,
    ],
    onSuccess(data) {
      alert(data)
    },
    onError(error) {
      console.log(error)
    }
  } as any)

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
    const cid = await client.put([nftDetails?.file]);
    const ipfsUrl = `https://ipfs.io/ipfs/${cid}/${nftDetails?.file?.name}`;
    return ipfsUrl
  }
  interface NFTMetaData {
    name: string | undefined; // Replace 'string' with the actual type of nftDetails?.itemName
    image: string;
    description: string | undefined; // Replace 'string' with the actual type of nftDetails?.description
    externalLink: string | undefined; // Replace 'string' with the actual type of nftDetails?.externalLink
  }

  const UploadMetaData = async () => {
    console.log("The First")
    const imgIPFS = await UploadNFTImg()
    console.log("My Image ===> ", imgIPFS)
    const metaData: NFTMetaData = {
      name: nftDetails?.itemName,
      image: imgIPFS,
      description: nftDetails?.description,
      externalLink: nftDetails?.externalLink
    }
    const fileName = "data.json";
    const file = new File([JSON.stringify(metaData)], fileName, { type: "data/json" });
    const cid = await client.put([file]);
    console.log("My meta Data ==> ", cid)
    const saveTokenURI = `https://ipfs.io/ipfs/${cid}/data.json`
    setTokenURI(saveTokenURI)
    setCallContractFn(true)


  }



  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('NFT Details:', nftDetails);
    UploadMetaData()
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
      <h2 style={styles.title}>Image, Video, Audio, or 3D Model</h2>
      <h6 style={{ marginBottom: '50px' }}>File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</h6>
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
        <button type="submit" style={styles.uploadButton}>Upload Item</button>
      </form>
    </div>
  );
};

export default NFTMintingComponent;
