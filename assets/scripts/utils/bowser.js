import Bowser from 'bowser';

export default function browserDetection() {
  const prefix = 'browser-';
  const $html = document.querySelector('html');

  const browser = Bowser.getParser(window.navigator.userAgent);
  const browserName = browser.getBrowserName().toLocaleLowerCase();
  const browserVersion = `version-${browser.getBrowserVersion().split('.')[0]}`;
  const browserEngine = browser.getEngineName().toLocaleLowerCase();

  const isSafariBelow11 = browser.satisfies({
    macos: {
      safari: '<11',
    },
  });

  $html.classList.add(prefix + browserName, prefix + browserVersion, prefix + browserEngine);

  if (isSafariBelow11) {
    $html.classList.add(`${prefix}is-safari-11-below`);
  }
}
