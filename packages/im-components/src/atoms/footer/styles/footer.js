import styled from "styled-components";

export const Container = styled.div`
    padding: 5rem 4rem;
    background: radial-gradient(circle, #1A1F38, 100%);  
   
    @media (max-width: 1000px) {
        padding: 7rem 3rem;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 100rem;
    margin: 0 auto;
`;

export const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 5rem;
    justify-content: space-between;

    @media (max-width: 100rem) {
        grid-template-columns: repeat(3, 1fr);  
    }
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 6rem;
`;

export const Link = styled.a`
    color: #fff;
    margin-bottom: 2rem;
    font-size: 1rem;
    text-decoration: none;

    &:hover {
        color: ff9c00;
        transition: 200ms ease-in;
    }
`;

export const Title = styled.p`
    font-size: 2.4rem;
    color: #fff;
    font-weight: bold;
    margin-bottom: 4rem;
`;