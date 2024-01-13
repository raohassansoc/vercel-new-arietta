import React, { useState, useEffect, CSSProperties } from 'react';

const NFTDetailModal = ({ isOpen, onClose, item }) => {
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

        leftPanelStyle: {
            width: '50%',
            paddingRight: '20px'
        },

        rightPanelStyle: {
            width: '50%',
            // paddingLeft: '10px'
        },

        imageStyle: {
            width: '100%',
            borderRadius: '5px',
        },

        buttonStyle: {
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
    }

    useEffect(() => {
        console.log("My Nft Detail ===> ", item)
    }, [])

    return (
        <>
            <div style={styles.overlayStyle}
                onClick={onClose}
            />
            <div style={styles.modalStyle}>
                <div style={styles.leftPanelStyle}>
                    <img style={styles.imageStyle} src={item?.image} alt="nft" />
                </div>
                <div style={styles.rightPanelStyle}>
                    <h2 style={{ color: "black", marginBottom: "10px", textAlign: "left" }}>Name: {item?.name}</h2>
                    <p style={{ color: "black", marginBottom: "10px", textAlign: "left" }}>Symbol: {item?.externalLink}</p>
                    {/* <p>{item.price}</p> */}
                    <p style={{ color: "black", marginBottom: "10px", textAlign: "left" }}>Description: {item.description}</p>
                    {/* <button style={styles.buttonStyle} onClick={() => console.log('Sell action')}>Sell</button> */}
                </div>
            </div>
        </>
    );
};

export default NFTDetailModal;
