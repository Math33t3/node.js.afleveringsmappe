import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"
import App from './App';
import {
  ChakraProvider,
  Box,
} from '@chakra-ui/react';
import theme from './theme';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Views from './components/views';
import UserContext from './components/AccountContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ColorModeScript />
        <Box textAlign="center" fontSize="xl">
          <ColorModeSwitcher justifySelf="flex-end" right="0.5" />
        </Box>
        <UserContext>
          <Views />
          <App />
        </UserContext>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);
