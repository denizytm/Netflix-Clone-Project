
import styled from "styled-components"

export const Container = styled.div`
    .player {
        width: 100vw;
        height: 100vh;
        .back {
            position: absolute;
            padding: 2rem;
            z-index: 1;
            svg {
                font-size: 3rem;
                cursor: pointer;
            }
        }
        video {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }
`
