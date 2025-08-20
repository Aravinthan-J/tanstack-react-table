export function applyUserTheme(
  userTheme: Record<string, { value: string }>,
  scopeSelector: string = ":root"
) {
  // Generate the CSS variable assignment string
  const cssVars = Object.entries(userTheme)
    .map(([key, obj]) => {
      // Convert dot notation to kebab (Color.Primary.500 → color-primary-500)
      const varName = "--theme-" + key.replace(/\./g, "-").toLowerCase();
      return `${varName}: ${obj.value};`;
    })
    .join(" ");

  // Remove any old injected theme styles
  const oldStyle = document.getElementById("dynamic-user-theme");
  if (oldStyle) oldStyle.remove();

  // Inject new style block
  const style = document.createElement("style");
  style.id = "dynamic-user-theme";
  style.innerHTML = `${scopeSelector} { ${cssVars} }`;
  document.head.appendChild(style);
}
