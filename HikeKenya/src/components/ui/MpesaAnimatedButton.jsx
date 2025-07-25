import React from 'react';
import styled from 'styled-components';
import mpesaIcon from '../../ImageIcons/download.png';

const MpesaAnimatedButton = ({ onClick }) => {
  return (
    <StyledWrapper>
      <button onClick={onClick}>
        <div className="svg-wrapper-1">
          <div className="svg-wrapper">
            <img src={mpesaIcon} alt="Mpesa" width={25} height={28} />
          </div>
        </div>
        <span> Pay Now</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    font-family: inherit;
    font-size: 16px;
    background: #d1fae5; /* green-100 */
    color: #065f46; /* green-800 */
    padding: 0.3em 1em;
    padding-left: 0.9em;
    display: flex;
    align-items: center;
    border: 1px solid #047857; /* green-600 */
    border-radius: 16px;
    overflow: hidden; /* ✅ clip overflowed span */
    transition: all 0.2s;
    cursor: pointer;
    position: relative;
  }

  button span {
    display: block;
    margin-left: 0.3em;
    transition: all 0.3s ease-in-out;
    white-space: nowrap;
  }

  button img {
    display: block;
    transform-origin: center center scale(1.1);
    transition: transform 0.3s ease-in-out;
  }

  button:hover .svg-wrapper {
    animation: fly-1 0.6s ease-in-out infinite alternate;
  }

  button:hover img {
    transform: translateX(1.2em) scale(1.8);
  }

  button:hover span {
    transform: translateX(10em); /* ✅ more than button width */
    opacity: 0; /* ✅ fade out */
  }

  button:active {
    transform: scale(0.95);
  }

  @keyframes fly-1 {
    from {
      transform: translateY(0.1em);
    }

    to {
      transform: translateY(-0.1em);
    }
  }
`;

export default MpesaAnimatedButton;
