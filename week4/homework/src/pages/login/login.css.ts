import { style } from '@vanilla-extract/css';
import { themeVars } from '../../styles/theme.css';

export const container = style({
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding:'3rem 45rem',
})

export const title = style({
    paddingBottom: '2rem',
    fontSize: '2rem',
    fontWeight: 'bold',
});

export const link = style({
    marginTop: '1rem',
    textAlign: 'center',
    cursor: 'pointer',
    color: themeVars.color.teal_02,
});