import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import theme from "../theme";
import { ColorModeScript } from "@chakra-ui/react"
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            <body>
              <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            </body>
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}