import { getCssText } from '@livepeer/react';

import {
  Head,
  Html,
  Main,
  default as NextDocument,
  NextScript,
} from 'next/document';
import * as React from 'react';

class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
