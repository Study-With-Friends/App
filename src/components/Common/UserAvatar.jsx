import styled from 'styled-components';

const UserAvatar = styled.img`
    width: ${props => props.className === 'sm' ? '32px' : '80px'};
    width: ${props => props.className === 'sm' ? '32px' : '80px'};
    margin-bottom: 10px;
    border-radius: 50%;
`;

export default UserAvatar;