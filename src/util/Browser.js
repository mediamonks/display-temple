/**
 * @example
 * Browser.isMobile
 *
 * @type {{
 *  isMobile: boolean
 *  isOS: boolean
 *  isOS9up: boolean
 *  isPad: boolean
 *  isSafari: boolean
 *  isFirefox: boolean
 *  isChrome: boolean
 *  isEdge: boolean
 *  isOpera: boolean
 * }}
 *
 * @return {object}
 */

const userAgent = navigator.userAgent;
let Browser = {};

Browser.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
Browser.isOS = /iPad|iPhone|iPod/.test(userAgent);
Browser.isOS9up = Browser.isOS && navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1] > 9;
Browser.isPad = /iPad/.test(userAgent);
Browser.isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
Browser.isFirefox = /firefox|fxios/i.test(userAgent);
Browser.isChrome = /chrome|chromium|crios/i.test(userAgent);
Browser.isEdge = /edg/i.test(userAgent);
Browser.isOpera = /opr\//i.test(userAgent);

export default Browser;
