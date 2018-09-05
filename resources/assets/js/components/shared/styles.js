import styled, { css } from 'styled-components';
import { rem } from 'polished';
import colors from './colors';

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
`;

const Label = styled.div`
  color: ${colors.primary};
  font-weight: 400;
  font-size: ${rem('17px')};
  margin-bottom: ${rem('5px')};
  display: flex;
  align-items: baseline;
`;

const Text = styled.div`
  color: ${colors.text};
  font-weight: 200;
  font-size: ${rem('15px')};
  margin-right: ${rem('10px')};
`;

const Button = styled.button`
  background: none;
  padding: ${rem('4px')} ${rem('16px')};
  border-radius: ${rem('4px')};
  color: ${colors.text};
  font-family: 'Nunito', sans-serif;
  font-weight: 200;
  border-color: ${colors.border};
  cursor: pointer;

  &:hover {
    border-color: ${colors.primary};
    background-color: ${colors.translucent};
    color: ${colors.primary};
    font-weight: 300;
  }

  &:active {
    font-weight: 500;
    background-color: ${colors.primary};
    border-color: ${colors.primary};
    color: ${colors.white};
  }
`;

const Container = styled.div`
  &:not(:empty) {
    width: 100%;
    padding: ${rem('16px')} 0;
    border-bottom: ${rem('1px')} solid ${colors.border};
    display: flex;
    flex-wrap: wrap;
  }
`

const DropdownWrapper = styled.div`
  border: ${rem('1px')} solid ${colors.border};
  border-radius: ${rem('5px')};
  padding: ${rem('20px')};
  position: absolute;
  z-index: 100;
  margin-top: ${rem('7px')};
  background-color: ${colors.white};
  top: 100%;
  left: 0;
`;

export default {
  LoaderWrapper,
  Label,
  Text,
  Button,
  Container,
  DropdownWrapper
};
