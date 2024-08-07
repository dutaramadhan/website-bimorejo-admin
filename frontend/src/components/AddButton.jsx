import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/system';

const StyledFab = styled(Fab)({
  position: 'fixed',
  bottom: '30px',
  right: '35px',
  backgroundColor: '#1976d2',
  '&:hover': {
    backgroundColor: '#115293',
  },
  '&:active': {
    backgroundColor: '#0d3a76',
  },
});

export default function AddButton({ onClick }) {
  return (
    <StyledFab color="primary" aria-label="add" onClick={onClick}>
      <AddIcon />
    </StyledFab>
  );
}
