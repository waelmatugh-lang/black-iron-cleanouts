/**
 * Inline, render-blocking script that sets the initial theme class on <html>
 * BEFORE first paint — prevents a light/dark flash on load.
 * Placed as the first child of <body>.
 */
export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&m)){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
