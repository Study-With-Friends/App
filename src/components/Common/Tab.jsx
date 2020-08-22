import styled from 'styled-components';

const Tab = styled.div`
    padding-right: 10px;
    cursor: pointer;
    font-weight: ${props => props.className && props.className.includes('active') ? 'bold' : 'normal'};
`;

export default Tab;