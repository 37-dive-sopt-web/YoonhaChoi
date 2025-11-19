import { style } from '@vanilla-extract/css';
import { themeVars } from '../../styles/theme.css';

export const title = style({
    paddingBottom: '2rem',
    fontSize: '2rem',
    fontWeight: 'bold',
});

export const idContainer = style({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    paddingBottom: '3rem',
})

export const label = style({
    color: themeVars.color.gray_05,
})

export const name = style({
    fontWeight: 'bold',
})