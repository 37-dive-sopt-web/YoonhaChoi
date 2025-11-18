import { style } from '@vanilla-extract/css';
import { themeVars } from '../../styles/theme.css';

export const modalBack = style ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(2px)',
});

export const container = style ({
    backgroundColor: 'white',
    padding: '2rem 3rem ',
    borderRadius: '15px',
    width: '30rem',
    textAlign: 'center',
});

export const title = style ({
    marginBottom: '1rem',
    fontSize: '1.5em',
    fontWeight: 'bold',
});

export const message = style ({
    color: themeVars.color.gray_05,
    fontSize: '1.1em',
});

export const buttonGroup = style ({
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'space-between', 
    gap: '1rem', 
});

const baseButton = style ({
    padding: '1rem 0.8rem',
    borderRadius: '6px',
    cursor: 'pointer',
    flexGrow: 1, 
    transition: 'background-color 0.2s',
});

export const cancelButton = style ([baseButton, {
    border: '1px solid ' + themeVars.color.gray_03,
    ':hover': {
        backgroundColor: themeVars.color.gray_02,
    }
}]);

export const confirmButton = style ([baseButton, {
    backgroundColor: themeVars.color.red_01,
    color: 'white',
    ':hover': {
        backgroundColor: '#c53030',
    }
}]);