import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="load-row">
        <span />
        <span />
        <span />
        <span />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .load-row {
    width: 100px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

  .load-row span {
    display: inline-block;
    width: 10px;
    height: 10px;
    /* Main shade of #1F3B29 */
    background: #1F3B29;
    border-radius: 50px;
    animation: up-down6 0.5s ease-in infinite alternate;
  }

  .load-row span:nth-child(2) {
    /* Lighter shade 1 */
    background: #2b5439; /* Adjusted for a lighter but still dark green */
    animation-delay: 0.16s;
  }

  .load-row span:nth-child(3) {
    /* Lighter shade 2 */
    background: #3c724f; /* Adjusted for an even lighter shade */
    animation-delay: 0.32s;
  }

  .load-row span:nth-child(4) {
    /* Lighter shade 3 */
    background: #4e9064; /* Adjusted for the lightest shade */
    animation-delay: 0.48s;
  }

  @keyframes up-down6 {
    0% {
      transform: translateY(-10px);
    }

    100% {
      transform: translateY(10px);
    }
  }`;

export default Loader;