import styled from 'styled-components';

const UserAvatar = styled.img`
    width: ${props => props.className.includes('sm') ? '32px' : '80px'};
    width: ${props => props.className.includes('sm') ? '32px' : '80px'};
    margin-bottom: ${props => props.className.includes('has-margin') ? '10px' : '0'};
    border-radius: 50%;
`;

export default UserAvatar;