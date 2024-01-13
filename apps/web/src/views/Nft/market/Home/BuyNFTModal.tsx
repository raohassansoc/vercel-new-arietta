import React, { useState, useEffect, CSSProperties } from 'react';
import { useContractWrite, useProvider } from 'wagmi';
import ABI from "../Create/ERC721_1155_ABI.json"

const BuyNFTModal = ({ isOpen, onClose }) => {
    const provider = useProvider();
    if (!isOpen) {
        return null;
    }

    const styles: { [key: string]: CSSProperties } = {
        modalStyle: {
            display: 'flex',
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

    // const { write, isLoading } = useContractWrite({
    //     address: '0x1b61EEb2529F89F764959F329102Bd3604B9a8Bf',
    //     abi: "",
    //     functionName: 'buyNFT',
    //     args: [
    //         "tokenID",
    //         "price"
    //     ],
    //     async onSuccess(data) {
    //         console.log("NFT created of ===> ", data)
    //         try {
    //             const receipt = await provider.waitForTransaction(data.hash);
    //             console.log("My receipt ===> ", receipt)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     },
    //     onError(error) {
    //         console.log(error)
    //     }
    // } as any)



    return (
        <>
            <div style={styles.overlayStyle}
                onClick={onClose}
            />
            <div style={styles.modalStyle}>

            </div>
        </>
    );
};

export default BuyNFTModal;
