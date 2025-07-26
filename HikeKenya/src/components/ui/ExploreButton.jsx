// components/Button.jsx (or wherever you save it)
import React from 'react';
import styled from 'styled-components';

const Button = ({ onClick, children, className }) => { // Added onClick, children, className props
  return (
    <StyledWrapper className={className}> {/* Pass className for external styling */}
      <button className="button type1" onClick={onClick}> {/* Attach onClick */}
        <span className="btn-txt">{children}</span> {/* Render children as text */}
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* Your existing styled-components CSS */
  .button {
    height: 50px;
    width: 200px;
    position: relative;
    background-color: transparent;
    cursor: pointer;
    border: 2px solid #D4AF37;
    overflow: hidden;
    border-radius: 8px;
    color: #D4AF37;
    margin-top: 40px;
    transition: all 0.5s ease-in-out;
  }

  .btn-txt {
    z-index: 1;
    font-weight: 800;
    letter-spacing: 4px;
  }

  .type1::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    transition: all 0.5s ease-in-out;
    background-color: #D4AF37;
    border-radius: 30px;
    visibility: hidden;
    height: 10px;
    width: 10px;
    z-index: -1;
  }

  .button:hover {
    box-shadow: 1px 1px 200px #252525;
    color: #fff;
    border: none;
  }

  .type1:hover::after {
    visibility: visible;
    transform: scale(100) translateX(2px);
  }
`;

export default Button;