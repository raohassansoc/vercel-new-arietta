import React, { CSSProperties, useEffect, useState } from 'react';

import ABI from "./Factory_ABI.json";
import { useContractWrite, useAccount, useProvider } from 'wagmi'

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
    const [loading, setLoading] = useState(false);
    const [TokenAdrs, setTokenAdrs] = useState(null);
    const provider = useProvider();

    const weiConvertert = tokendata.totalSupply * 1000000000000000000;
    const largeNumberBigInt = BigInt(weiConvertert)

    const { write, isLoading } = useContractWrite(

        {
            address: '0xF2fDff7D5772648E89662e19F5B9CffeC650CaA1',
            abi: ABI,
            functionName: 'createLiquidityToken',
            args: [
                tokendata.name,
                tokendata.symbol,
                largeNumberBigInt,
                tokendata.transactionFeeYield,
                tokendata.transactionFeeLiquidity,
                tokendata.charityAddress,
                tokendata.charityPercent
            ],
            async onSuccess(data) {
                setLoading(true)
                const tx = await provider.getTransaction(data.hash);

                console.log(tx)
                try {
                    const receipt = await provider.waitForTransaction(data.hash);
                    console.log("my Re ", receipt)
                    setTokenAdrs(receipt.logs[2].topics[1].replace('000000000000000000000000', ''))
                    setLoading(false)

                } catch (error) {
                    setLoading(false)
                }
            },
            onError(error) {
                console.log(error)
            }
        } as any
    )


    const createLiquidityTokens = async () => {

        setTokenAdrs(null)

        try {
            write({
            } as any)

        } catch (error) {
            console.error('Error creating liquidity token:', error);
        }
    };
    useEffect(() => { setLoading(isLoading) }, [isLoading])
    return (
        <>

            {TokenAdrs ? <div style={{ paddingTop: 15, display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                <p >Token Address: {TokenAdrs}</p>
                <a href={`https://tnexplorer.ariettachain.tech/address/${TokenAdrs}`} target='_blank' style={{}}>View On BlockScan</a>
            </div> : ''}
            {loading ?
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <a style={styles.submitButton}>Loading...</a></div> :
                <button onClick={createLiquidityTokens} style={styles.submitButton}>Liquidity Token</button>}

        </>
    )
}

export default LiquiditySmartContract;