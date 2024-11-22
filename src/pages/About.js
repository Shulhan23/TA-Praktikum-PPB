import React, { useState, useEffect } from 'react';
import styles from "../styles/About.module.css";

function About() {
    const [githubData, setGithubData] = useState({
        name: '',
        avatar_url: '',
    });

    useEffect(() => {
        const fetchGithubData = async () => {
            try {
                const response = await fetch('https://api.github.com/users/shulhan23'); 
                const data = await response.json();
                setGithubData({
                    name: data.name,
                    avatar_url: data.avatar_url,
                });
            } catch (error) {
                console.error("Failed to fetch GitHub data:", error);
            }
        };
        
        fetchGithubData();
    }, []);

    return (
        <div className={styles.borderall}>
            <div className={`${styles["homepage-wrapper"]} text-center`}>
                <h1>Disney Wonderland</h1>
                <div className={styles.subtitle}>
                    This app is created to complete
                    <br />
                    Mobile Device Programming Final Task.
                </div>
                
                <a href="https://github.com/shulhan23" target="_blank" rel="noopener noreferrer">
                    <img className={styles.img} src={githubData.avatar_url || 'images/abcd.png'} alt="GitHub Profile" />
                </a>
                
                <h2>{githubData.name || "Shulhan Aziz"}</h2>
                <div className={`text-center ${styles["fw-bold"]}`}>21120122130049</div>
                <div className={styles["about-info"]}>
                    <p>Diponegoro University</p>
                    <p>Computer Engineering</p>
                </div>
                
                <br />
                <div className="text-center">
                    <h4>
                        <a href="https://disneyapi.dev/" target="_blank" rel="noreferrer">
                            API USED
                        </a>
                    </h4>
                    <a href="https://github.com/">
                        <img className={styles.imggit} src="https://static-00.iconduck.com/assets.00/github-icon-2048x2048-eyd5tyuo.png" alt="GitHub Icon" />
                    </a>
                </div>
                <br />
            </div>
        </div>
    );
}

export default About;
