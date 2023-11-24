
import styled from "styled-components"

export const Container = styled.div`
    background-color: black;
    .hero{
        position: relative;
        .background-image {
            filter : brightness(60%);
        }
        img {
            height: 100vh;
            width: 100vw;
        }
        .container {
            position: absolute;
            bottom: 5rem;
            .logo {
                img {
                    height: 100%;
                    width: 100%;
                    margin-left: 5rem;
                }
            }
            .buttons {
                margin: 5rem;
                gap: 2rem;
                button {
                    font-size: 1.4rem;
                    gap: 1rem;
                    border-radius: 0.2rem;
                    padding: 0.5rem;
                    padding-left: 2rem;
                    padding-right: 2.4rem;
                    border: none;
                    cursor: pointer;
                    transition: 0.3s ease ease-in-out;
                    &:hover {
                        opacity: 0.8;
                    }
                    &:nth-of-type(2){
                        background-color: rgba(109,109,110,0.7);
                        color: white;
                        svg {
                            font-size: 1.8rem;
                        }
                    }
                }
            }
        }
    }
`