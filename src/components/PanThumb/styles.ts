import styled from "styled-components";

export const Main = styled.div`
  &.pan-item {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    cursor: default;
    box-shadow: 0 1px 3px rgba(0,0, 0, 0.2);
  }

  & .pan-info-roles-container {
    padding: 20px;
    text-align: center;
  }

  & .pan-thumb {
    width: 100%;
    height: 100%;
    background-position: center center;
    background-size: cover;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    transform-origin: 95% 40%;
    transition: all 0.3s ease-in-out;
  }

  & .pan-info {
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: inset 0 0 0 5px rgba(0,0, 0, 0.05);
  }

  &.pan-item:hover .pan-thumb {
    transform: rotate(-110deg);
  }
`