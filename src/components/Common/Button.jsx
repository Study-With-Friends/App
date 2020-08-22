import styled from 'styled-components';

const Button = styled.div`
    margin: 10px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    padding: 0 14px;
    box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
    background: $white;
    color: $purple;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: .025em;
    transition: all .15s ease;
    cursor: pointer;
    
    &:hover {
      color: $light-purple;
      transform: translateY(-1px);
      box-shadow: 0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08);
    }
    
    &.inverse {
      @extend .button;
      color: $white;
      background: $purple;
      
      &:hover {
        color: $white;
        background-color: $light-purple;
      }
    }
`;

export default Button;