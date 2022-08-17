/**
 * @type {import('nextra-theme-docs').DocsThemeConfig}
 */
import { useRouter } from 'next/router';

const github = 'https://github.com/livepeer/livepeer.js';

const TITLE_WITH_TRANSLATIONS = {
  'en-US': 'Livepeer for JS',
} as const;

const EDIT_LINK_WITH_TRANSLATIONS = {
  'en-US': 'Question? Give us feedback →',
} as const;

import { DocsThemeConfig, useConfig } from 'nextra-theme-docs';

const Logo = ({ height }: { height: number }) => (
  <svg width={height} height={height} viewBox="0 0 1024 1024" fill="none">
    <circle cx="512" cy="512" r="512" fill="currentColor" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M292 662L292 762L392 762L392 662L292 662ZM292 462L292 562L392 562L392 462L292 462ZM692 462L692 562L792.001 562L792.001 462L692 462ZM292 362L292 262L392 262L392 362L292 362ZM492 461.999L492 361.999L592 361.999L592 461.999L492 461.999ZM492 561.999L492 661.999L592 661.999L592 561.999L492 561.999Z"
      fill="#131418"
    />
  </svg>
);

const config: DocsThemeConfig = {
  github,
  projectLink: github,
  docsRepositoryBase: `${github}/tree/main/docs/pages`,
  titleSuffix() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const { locale } = useRouter();
    return ` – livepeer.js`;
  },
  projectChatLink: 'https://discord.gg/livepeer',
  search: true,
  floatTOC: true,
  defaultMenuCollapsed: true,
  darkMode: true,
  nextThemes: {
    defaultTheme: 'dark',
  },
  bannerKey: 'livepeerjs-launch',
  banner() {
    return (
      <div className="flex justify-center items-center gap-2">
        We've just launched - check out our docs! <Logo height={15} />
      </div>
    );
  },
  footerText: `MIT ${new Date().getFullYear()} © Livepeer Inc.`,
  logo() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { locale } = useRouter();
    return (
      <>
        <Logo height={25} />
        <span
          className="ml-2 font-extrabold hidden md:inline select-none"
          title={
            'livepeer.js: ' +
            TITLE_WITH_TRANSLATIONS[
              (locale as keyof typeof TITLE_WITH_TRANSLATIONS) ?? 'en-US'
            ]
          }
        >
          livepeer.js
        </span>
      </>
    );
  },
  head() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const config = useConfig();
    const description =
      config.meta.description ||
      'livepeer.js makes building with Livepeer effortless.';
    const image = config.meta.image || 'https://livepeerjs.org/og.png';
    return (
      <>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#00a300" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#00a660" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="description" content={description} />
        <meta name="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@livepeer" />
        <meta name="twitter:image" content={image} />
        <meta
          name="og:title"
          content={`${config?.title ?? 'Getting Started'} – livepeer.js`}
        />
        <meta name="og:image" content={image} />
        <meta name="apple-mobile-web-app-title" content="livepeer.js" />
      </>
    );
  },
  sidebarSubtitle: ({ title }) => (
    <div className="flex items-center gap-2">
      <Logo height={10} />
      {title}
    </div>
  ),
  footerEditLink() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { locale } = useRouter();
    return (
      <>
        {
          EDIT_LINK_WITH_TRANSLATIONS[
            (locale as keyof typeof TITLE_WITH_TRANSLATIONS) ?? 'en-US'
          ]
        }
      </>
    );
  },
  i18n: [
    { locale: 'en-US', text: 'English' },
    { locale: 'es-ES', text: 'Español' },
    { locale: 'zh-CN', text: '简体中文' },
    { locale: 'ja', text: '日本語' },
    { locale: 'ko', text: '한국어' },
    { locale: 'ru', text: 'Русский' },
  ],
  gitTimestamp: 'Last updated on',
  font: false,
};

export default config;
