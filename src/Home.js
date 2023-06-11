import './Home.css';
import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';


class VideoComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
        };
    }

    handleOnReady = () => {
        this.setState({ isLoaded: true });
    };


    render() {
        const { videoId } = this.props;
        const { isLoaded } = this.state;
        const { width, height } = this.props;

        const opts = {
            height: `${((height * 40) / 100)}`,
            width: `${width - ((width * 10) / 100)}`,
            playerVars: {
                autoplay: 0,
            },
        };

        return (
            <>
                {!isLoaded && (
                    <img style={{ height: `${((height * 40) / 100)}px`, width: `${width - ((width * 10) / 100)}px`, objectFit: 'cover' }} src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="Thumbnail" />
                )}
                <div
                    style={{ display: isLoaded ? 'block' : 'none' }}
                >
                    <YouTube
                        videoId={videoId}
                        onReady={this.handleOnReady}
                        opts={opts}
                    />
                </div>
            </>
        );
    }
}

const Button = ({ f1Info }) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleButtonClick = () => {
        setShowPopup(true);
    };

    const handleCloseClick = () => {
        setShowPopup(false);
    };

    return (
        <div>
            <button
                style={{
                    backgroundColor: '#FFEB00',
                    borderRadius: '5px',
                    padding: '10px 20px',
                    border: 'none',
                    color: '#000',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'opacity 0.3s',
                }}
                onClick={handleButtonClick}
            >
                Show All Rules
            </button>

            {showPopup && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999,
                    }}
                >
                    <div
                        style={{
                            width: '80vw',
                            height: '60vh',
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '5px',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                            overflow: 'auto',
                            position: 'relative',
                        }}
                    >
                        <button
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                padding: '10px 15px 10px 15px',
                                backgroundColor: '#FFEB00',
                                borderRadius: '5px',
                                borderWidth: 0.5,
                                borderColor: 'black',
                                color: '#000',
                                cursor: 'pointer',
                            }}
                            onClick={handleCloseClick}
                        >
                            X
                        </button>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10 }}>
                            <h1>Rules</h1>
                            <ol>
                                {f1Info.map((item, index) => (
                                    <li className='mainFont' style={{ color: 'black', marginBottom: '15px' }} key={index}>{item}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

function Home() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    const f1Info = [
        "Race Weekend: A typical F1 race weekend consists of practice sessions, qualifying, and the main race.",
        "Qualifying: Drivers compete in three parts (Q1, Q2, Q3) to determine their starting positions for the race.",
        "Starting Grid: The starting grid is based on qualifying results, with the fastest driver starting from pole position.",
        "Race Points: The top 10 finishers earn points, with the winner receiving 25 points.",
        "DRS (Drag Reduction System): Drivers can adjust their rear wing for a speed boost when close to the car in front.",
        "Pit Stops: Drivers must make at least one pit stop to change tires and make adjustments.",
        "Safety Car: If there's a dangerous situation, a safety car is deployed, and drivers must reduce their speed.",
        "Penalties: Drivers can receive penalties for breaking rules, which can range from time penalties to disqualification.",
        "Technical Regulations: F1 cars must meet specific rules regarding dimensions, weight, engines, aerodynamics, and safety."
    ];

    useEffect(() => {
        const handleResize = () => {
            const CWindowWidth = window.innerWidth;
            const CWindowHeight = window.innerHeight
            setWindowHeight(CWindowHeight);
            setWindowWidth(CWindowWidth)
        };

        // Initial calculation on component mount
        handleResize();

        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const limitedF1Info = f1Info.slice(0, 4);

    return (
        <div className='home'>
            <div className='videoComponent'>
                <VideoComponent videoId="6tbUo_7JfEg" width={windowWidth} height={windowHeight} />
            </div>
            <h1 style={{ color: 'white', textAlign: 'center', margin: 0 }}>Rules</h1>
            <div style={{ padding: '0vh 5vw 0vh 5vw' }}>
                <ol>
                    {limitedF1Info.map((item, index) => (
                        <li className='mainFont' style={{marginBottom: '15px'}}  key={index}>{item}</li>
                    ))}
                </ol>
            </div>
            <Button f1Info={f1Info} />
            <div
                className="prediction-button"
                style={{
                    position: 'fixed',
                    top: '3vh',
                    right: '5vw',
                    backgroundColor: '#A6051A',
                    borderRadius: '5px',
                    padding: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#FFEB00',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                }}
            >
                Prediction
            </div>
        </div>
    )
}

export default Home
