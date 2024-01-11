import React, { CSSProperties, useEffect } from 'react';

import ABI from "./Factory_ABI.json";
import { useContractWrite } from 'wagmi'

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


const LiquiditySmartContract = ({ tokendata }) => {
    useEffect(() => {
        console.log("Token ===> ", tokendata)
    }, [tokendata])
    const { isLoading, isSuccess, write } = useContractWrite(
        {
            address: '0xEe23E4257e5a1698e6868079EFd4B03d99a77B0E',
            abi: ABI,
            functionName: 'createLiquidityToken',
            args: [
                tokendata.name,
                tokendata.symbol,
                tokendata.totalSupply,
                tokendata.transactionFeeYield,
                tokendata.transactionFeeLiquidity,
                tokendata.charityAddress,
                tokendata.charityPercent
            ],
            onSuccess(data) {
                alert(data)
            },
            onError(error) {
                console.log(error)
            }
        } as any
    )


    const createLiquidityTokens = async () => {
        try {
            write({
            } as any)

        } catch (error) {
            console.error('Error creating liquidity token:', error);
        }
    };

    return (
        <>
            <button onClick={createLiquidityTokens} style={styles.submitButton}>Liquidity Token</button>
        </>
    )
}

export default LiquiditySmartContract;