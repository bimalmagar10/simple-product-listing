import {createGlobalStyle} from "styled-components";
import {ChakraProvider,CSSReset} from "@chakra-ui/react";
import {AuthProvider} from "../auth";
import {AnimatePresence} from "framer-motion";
 export const GlobalStyle = createGlobalStyle`
      *,
      *::after,
      *::before {
       margin:0;
       padding:0;
       box-sizing:inherit;
      }
      html {
       font-size:62.5%;
      }
      body {
       font-family:'Cousine',sans-serif;
       box-sizing:border-box;
       background-color:#EBE7DD;
      }
 `;
function MyApp({ Component, pageProps }) {
  return (
    <> 
      <GlobalStyle/>
       <ChakraProvider resetCSS={false}>
          <AuthProvider>
             <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} />
              </AnimatePresence>
          </AuthProvider>
        </ChakraProvider>
    </>
  );
}

export default MyApp;
