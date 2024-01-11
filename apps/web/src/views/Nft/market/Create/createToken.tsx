import React, { useState, ChangeEvent, FormEvent, CSSProperties, useEffect } from 'react';
import ABI from "./Factory_ABI.json";
import Web3 from 'web3';
import { useAccount } from 'wagmi';
import { useNetwork, useSwitchNetwork, useContractWrite } from 'wagmi'
import LiquiditySmartContract from './LiquiditySmartContract';
import StandardSmartContract from './StandardSmartToken';


const CreateTokenComponent: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork()
  // console.log("address Connect", address);
  // console.log("Chain", chain?.id)
  // if (chain?.id == 56) {
  //   switchNetwork(92522)
  // }



  const [tokenDetails, setTokenDetails] = useState({
    tokenType: 'Standard Token',
    fee: '0.1 ASC',
    name: '',
    symbol: '',
    decimals: 0,
    totalSupply: 0,
    transactionFeeYield: 0,
    transactionFeeLiquidity: 0,
    charityAddress: '',
    charityPercent: 0
  });

  // ////////////////////////////////////////// Web3 Instance ////////////////////////////////////
  // let web3: Web3;

  // if (typeof window !== 'undefined' && typeof (window as any).ethereum !== 'undefined') {
  //   // Use MetaMask provider
  //   web3 = new Web3((window as any).ethereum);
  // } else {
  //   // Fallback to a local provider (e.g., Ganache)
  //   const provider = new Web3.providers.HttpProvider('https://bsc-testnet.publicnode.com');
  //   web3 = new Web3(provider);
  //   console.log("WEB3 Working Now")
  // }

  // const contractAddress = '0xE2832fe92Aa9ff5B503d70078e8fD87C5316C4B2';
  // const contract = new web3.eth.Contract(ABI, contractAddress);


  // ////////////////////////////////////////// Web3 Instance ////////////////////////////////////


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTokenDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleTokenTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setTokenDetails(prevState => ({
      ...prevState,
      tokenType: value
    }));
  };

  const renderLiquidityFields = () => {
    if (tokenDetails.tokenType === 'Liquidity Token') {
      return (
        <div>
          <input
            type="text"
            name="transactionFeeYield"
            placeholder="Transaction fee to generate yield(%)"
            value={tokenDetails.transactionFeeYield}
            onChange={handleInputChange}
            style={styles.inputField}
          />
          <input
            type="text"
            name="transactionFeeLiquidity"
            placeholder="Transaction fee to generate liquidity(%)"
            value={tokenDetails.transactionFeeLiquidity}
            onChange={handleInputChange}
            style={styles.inputField}
          />
          <input
            type="text"
            name="charityAddress"
            placeholder="Charity/Marketing address"
            value={tokenDetails.charityAddress}
            onChange={handleInputChange}
            style={styles.inputField}
          />
          <input
            type="text"
            name="charityPercent"
            placeholder="Charity/Marketing percent(%)"
            value={tokenDetails.charityPercent}
            onChange={handleInputChange}
            style={styles.inputField}
          />
        </div>
      );
    }
    return null;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const styles: { [key: string]: CSSProperties } = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '50px',
      marginBottom: '50px'
    },
    title: {
      fontSize: '32px',
      color: '#fcb016',
      marginBottom: '20px',
    },
    formContainer: {
      width: 'calc(80%)',
      backgroundColor: 'black',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      fontWeight: 'bold',
      color: '#fcb016',
      marginBottom: '5px',
    },
    inputField: {
      width: 'calc(100%)',
      padding: '10px',
      border: 'none',
      borderRadius: '5px',
      marginTop: '5px',
      backgroundColor: '#333',
      color: 'white',
    },
    selectField: {
      width: '100%',
      padding: '10px',
      border: 'none',
      borderRadius: '5px',
      marginTop: '15px',
      backgroundColor: '#333',
      color: 'white',
    },
    submitButton: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#fcb016',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      marginTop: '15px',
      transition: 'background-color 0.3s',
    },
    submitButtonHover: {
      backgroundColor: '#ffcc00',
    }
  }



  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create Token</h2>
      <form onSubmit={handleSubmit} style={styles.formContainer}>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Token Type*
            <select name="tokenType" value={tokenDetails.tokenType} onChange={handleTokenTypeChange} style={styles.selectField}>
              <option value="Standard Token">Standard Token</option>
              <option value="Liquidity Token">Liquidity Token</option>
              {/* Add other token types if needed */}
            </select>
          </label>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Fee : 0.1 ASC
          </label>
        </div>
        <div style={styles.formGroup}>
          <input
            type="text"
            name="name"
            placeholder="Name*"
            value={tokenDetails.name}
            onChange={handleInputChange}
            style={styles.inputField}
          />
          <input
            type="text"
            name="symbol"
            placeholder="Symbol*"
            value={tokenDetails.symbol}
            onChange={handleInputChange}
            style={styles.inputField}
          />
          <input
            type="text"
            name="decimals"
            placeholder="Decimals*"
            value={tokenDetails.decimals}
            onChange={handleInputChange}
            style={styles.inputField}
          />
          <input
            type="text"
            name="totalSupply"
            placeholder="Total Supply*"
            value={tokenDetails.totalSupply}
            onChange={handleInputChange}
            style={styles.inputField}
          />
        </div>
        {renderLiquidityFields()}
        {/* <button type="submit" style={styles.submitButton}
        // disabled={chain?.id == 92522 ? false : true}
        >Create Token</button> */}
        {
          tokenDetails.tokenType == "Liquidity Token" ? <LiquiditySmartContract tokendata={tokenDetails}/> : <StandardSmartContract tokendata={tokenDetails}/>
        }
      </form>
    </div>
  );
};

export default CreateTokenComponent;
