import { style } from '@vanilla-extract/css';
import { themeVars } from '../../../styles/theme.css';

export const arrow = style({
    cursor: 'pointer',
    color: themeVars.color.teal_02,
    fontWeight: 'bold',
    fontSize: '1.3rem',
});

export const title = style({
    paddingBottom: '2rem',
    fontSize: '2rem',
    fontWeight: 'bold',
});

export const linkContainer = style({
paddingTop: '0.5rem',
});

export const link = style({
    cursor: 'pointer',
    color: themeVars.color.teal_02,
});