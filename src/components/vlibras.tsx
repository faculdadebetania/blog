// @ts-nocheck
'use client';
import Script from 'next/script';
import { Fragment } from 'react';

export default function VLibras() {
  function handleLoad() {
    new window.VLibras.Widget('https://vlibras.gov.br/app');
    window.onload();
  }

  return (
    <Fragment>
      <div vw="true" className="enabled">
        <div vw-access-button="true" className="active" />
        <div vw-plugin-wrapper="true">
          <div className="vw-plugin-top-wrapper" />
        </div>
      </div>
      <Script
        src="https://vlibras.gov.br/app/vlibras-plugin.js"
        onLoad={handleLoad}
        strategy="afterInteractive"
      />
    </Fragment>
  );
}
