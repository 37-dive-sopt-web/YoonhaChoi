import { style } from '@vanilla-extract/css';
import { themeVars } from '../../styles/theme.css';

export const title = style({
    paddingBottom: '2rem',
    fontSize: '2rem',
    fontWeight: 'bold',
});

export const table = style({
    display: 'flex',
    padding: '2rem 2rem',
    width: '100%',
});

export const tbody = style({
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    gap: '1rem',
});

export const tr = style({
    display: 'flex',
    justifyContent: 'space-between',
});

export const label = style({
    textAlign: 'left',
    color : themeVars.color.gray_05
});

export const value = style({
    fontWeight: 'bold',
    textAlign: 'right',
});

export const errorMessage = style({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
    color: themeVars.color.red_01,
});