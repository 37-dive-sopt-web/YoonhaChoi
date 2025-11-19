import { style } from '@vanilla-extract/css';
import { themeVars } from '../../styles/theme.css';

export const container = style({
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    gap: '0.5rem', 
    paddingBottom: '2rem',
});

export const label = style({
    color: themeVars.color.gray_05,
});

export const input = style({
    height: "2.5rem",
    width: '100%',
    borderRadius: '8px', 
    border: '1px solid ' + themeVars.color.gray_03,
    paddingLeft: '1rem',
    paddingRight: '1rem',
    color: themeVars.color.black,
  
  '::placeholder': {
    color: themeVars.color.gray_05,
  },
  
  selectors: {
    '&:focus': {
      outline: 'none', 
      boxShadow: '0 0 0 2px ' + themeVars.color.teal_01,
      borderColor: 'transparent', 
    },
  },
});