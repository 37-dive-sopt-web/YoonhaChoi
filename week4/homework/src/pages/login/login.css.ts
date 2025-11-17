import { style } from '@vanilla-extract/css';
import { themeVars } from '../../styles/theme.css';

export const container = style({
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'center',
    height: '100vh',
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