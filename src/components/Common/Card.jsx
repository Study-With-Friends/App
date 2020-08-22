import styled from 'styled-components';

const Card = styled.div`
    margin-top: 1em;
    margin-bottom: 1em;
    border-radius: 5px;
    border: 1px solid #E5E5E5;
    padding: 15px;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        background-color: #FBFBFB;
    }
`;

export default Card;