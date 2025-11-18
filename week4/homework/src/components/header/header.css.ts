import { style } from '@vanilla-extract/css';
import { themeVars } from '../../styles/theme.css';

export const headerContainer = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: themeVars.color.teal_01,
    padding: '1rem 15rem',
    color:themeVars.color.white,
});

export const leftSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
});

export const title = style({
    fontSize: '1.5rem', 
    fontWeight: 'bold',
});

export const tabList = style({
    display: 'flex',
    gap: '1rem',
});

export const tabButton = style({
    cursor: 'pointer',
    selectors: {
        '&:focus': {
            outline: 'none',
        },
         '&:hover': {
         color: themeVars.color.gray_03,
        }
    }
});

export const mainContainer = style({
    display: 'flex',
    height: '80vh',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding:'3rem 25rem',
})