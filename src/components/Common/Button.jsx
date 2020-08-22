import styled from 'styled-components';

const Button = styled.button`
    color: #24292e;
    background-color: #fafbfc;
    box-shadow: 0 1px 0 rgba(27,31,35,.04), inset 0 1px 0 hsla(0,0%,100%,.25);
    transition: background-color .2s cubic-bezier(.3,0,.5,1);
    border: 1px solid rgba(27, 31, 35, 0.15);
    outline: none;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: ${props => props.className.includes('sm') ? '3px;' : '8px;'}
    padding-bottom: ${props => props.className.includes('sm') ? '3px;' : '8px;'}
    font-weight: bold;
    line-height: 20px;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border-radius: 6px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin-top: 10px;

    &:hover {
        background-color: #f3f4f6;
        transition-duration: 0.1s;
    }
}
`;

export default Button;