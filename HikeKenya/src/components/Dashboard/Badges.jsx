import React from 'react';
import styled from 'styled-components';

const Badges = ({ user, badges }) => {
  return (
    <StyledWrapper>
      <div className="flex justify-center items-center gap-2 py-10 flex-wrap">
        {badges.map((badge) => {
          const isEarned = user.points >= badge.pointsRequired;

          return (
            <div key={badge.id} className="flex items-center">
              <div className={`cards ${isEarned ? 'earned' : 'locked'}`}>
                <div className="outlinePage">
                  <img
                    src={badge.icon}
                    alt={badge.title}
                    className="badge-main-icon"
                    style={{ filter: isEarned ? "none" : "grayscale(100%)" }}
                  />
                </div>

                {/* detailPage: The content that appears on hover */}
                <div className={`detailPage ${isEarned ? '' : 'locked-detail'}`}>
                  {/* Added a flex container to keep content centered/aligned within the detailPage */}
                  <div className="detail-content">
                    <svg className="icon medals slide-in-top" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width={40} height={40}>
                      <path d="M896 42.666667h-128l-170.666667 213.333333h128z" fill="#FF4C4C" />
                      <path d="M768 42.666667h-128l-170.666667 213.333333h128z" fill="#3B8CFF" />
                      <path d="M640 42.666667h-128L341.333333 256h128z" fill="#F1F1F1" />
                      <path d="M128 42.666667h128l170.666667 213.333333H298.666667z" fill="#FF4C4C" />
                      <path d="M256 42.666667h128l170.666667 213.333333h-128z" fill="#3B8CFF" />
                      <path d="M384 42.666667h128l170.666667 213.333333h-128z" fill="#FBFBFB" />
                      <path d="M298.666667 256h426.666666v213.333333H298.666667z" fill="#E3A815" />
                      <path d="M512 661.333333m-320 0a320 320 0 1 0 640 0 320 320 0 1 0-640 0Z" fill="#FDDC3A" />
                      <path d="M512 661.333333m-256 0a256 256 0 1 0 512 0 256 256 0 1 0-512 0Z" fill="#E3A815" />
                      <path d="M512 661.333333m-213.333333 0a213.333333 213.333333 0 1 0 426.666666 0 213.333333 213.333333 0 1 0-426.666666 0Z" fill="#F5CF41" />
                      <path d="M277.333333 256h469.333334a21.333333 21.333333 0 0 1 0 42.666667h-469.333334a21.333333 21.333333 0 0 1 0-42.666667z" fill="#D19A0E" />
                      <path d="M277.333333 264.533333a12.8 12.8 0 1 0 0 25.6h469.333334a12.8 12.8 0 1 0 0-25.6h-469.333334z m0-17.066666h469.333334a29.866667 29.866667 0 1 1 0 59.733333h-469.333334a29.866667 29.866667 0 1 1 0-59.733333z" fill="#F9D525" />
                      <path d="M512 746.666667l-100.309333 52.736 19.157333-111.701334-81.152-79.104 112.128-16.298666L512 490.666667l50.176 101.632 112.128 16.298666-81.152 79.104 19.157333 111.701334z" fill="#FFF2A0" />
                    </svg>
                    <div className="gradesBox">
                      <svg className="icon gradesIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width={30} height={30}>
                        <path d="M382.6 805H242.2c-6.7 0-12.2-5.5-12.2-12.2V434.3c0-6.7 5.5-12.2 12.2-12.2h140.4c6.7 0 12.2 5.5 12.2 12.2v358.6c0 6.6-5.4 12.1-12.2 12.1z" fill="#ea9518" data-spm-anchor-id="a313x.search_index.0.i36.40193a81WcxQiT" className />
                        <path d="M591.1 805H450.7c-6.7 0-12.2-5.5-12.2-12.2V254.9c0-6.7 5.5-12.2 12.2-12.2h140.4c6.7 0 12.2 5.5 12.2 12.2v537.9c0 6.7-5.5 12.2-12.2 12.2z" fill="#f2be45" data-spm-anchor-id="a313x.search_index.0.i35.40193a81WcxQiT" className />
                        <path d="M804.4 805H663.9c-6.7 0-12.2-5.5-12.2-12.2v-281c0-6.7 5.5-12.2 12.2-12.2h140.4c6.7 0 12.2 5.5 12.2 12.2v281c0.1 6.7-5.4 12.2-12.1 12.2z" fill="#ea9518" data-spm-anchor-id="a313x.search_index.0.i37.40193a81WcxQiT" className />
                      </svg>
                      <p className="gradesBoxLabel">POINTS</p>
                      <p className="gradesBoxNum">{badge.pointsRequired}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .flex-wrap {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 10px;
  }

  /* Adjust card size */
  .cards {
    position: relative;
    width: 150px;
    height: 90px;
    transition-duration: 0.5s;
    background: none;
    overflow: hidden;
    flex-shrink: 0;

    &.locked .outlinePage {
        filter: grayscale(100%);
        opacity: 0.7;
    }
  }

  .cards:hover {
    height: 250px;
  }

  .cards:hover .outlinePage {
    box-shadow: 0 5px 10px #b1985e;
  }

  .cards:hover .detailPage {
    display: flex;
  }

  /* Adjust outlinePage size and content alignment */
  .outlinePage {
    position: relative;
    background: linear-gradient(45deg, #fffbf0, #ffdd87);
    width: 100%;
    height: 90px;
    border-radius: 8px;
    transition-duration: 0.5s;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5px;
    box-sizing: border-box;
  }

  /* Adjust detailPage size and content alignment */
  .detailPage {
    position: relative;
    display: none;
    width: 100%;
    height: 90px;
    background: white;
    top: -15px;
    z-index: 1;
    transition-duration: 1s;
    border-radius: 0 0 15px 15px;
    overflow: hidden;
    align-items: center;
    justify-content: flex-start;
    padding: 5px;
    box-sizing: border-box;
    
    /* NEW: Greyscale and reduced opacity for locked detail page */
    &.locked-detail {
        filter: grayscale(100%);
        opacity: 0.5; /* Adjust opacity as desired */
        pointer-events: none; /* Disable interaction/hover effect on locked detail */
    }
  }

  /* Badge Main Icon - Smaller size */
  .badge-main-icon {
    width: 60px;
    height: 60px;
    object-fit: contain;
    margin-bottom: 3px;
    filter: none;
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    bottom: auto;
  }

  /* Hide original elements */
  .trophy, .ranking_number, .ranking_word, .userAvatar {
    display: none;
  }

  /* Removed splitLine entirely from here */
  .splitLine {
    display: none; 
  }

  /* Adjust userName for smaller cards */
  /* If you decided to remove userName from JSX, you can also remove this block */
  .userName {
    position: relative;
    font-weight: 600;
    color: #6b7578;
    left: auto;
    font-size: 14px;
    top: auto;
    margin-top: 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 90%;
  }

  /* Medals in detailPage - Smaller size */
  .medals {
    position: absolute;
    top: 10px;
    right: 5px;
    width: 60px;
    height: 60px;
  }

  /* Grades box adjustments */
  .gradesBox {
    position: relative;
    height: 70px;
    top: 5px;
    margin-right: 5px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: auto;
  }

  .gradesIcon {
    position: relative;
    top: auto;
    width: 40px;
    height: 40px;
  }

  .gradesBoxLabel {
    position: relative;
    display: block;
    margin-left: 5px;
    color: #424c50;
    letter-spacing: 3px;
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 0;
    font-weight: 800;
    font-size: 10px;
    white-space: nowrap;
  }

  .gradesBoxNum {
    position: relative;
    font-family: Arial, Helvetica, sans-serif;
    display: block;
    font-size: 18px;
    font-weight: 800;
    margin-left: 5px;
    color: #ea9518;
    top: 0;
    white-space: nowrap;
  }

  /* Animations remain the same */
  .slide-in-top {
    animation: slide-in-top 1s cubic-bezier(0.65, 0.05, 0.36, 1) both;
  }

  @keyframes slide-in-top {
    0% {
      transform: translateY(-100px);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export default Badges;