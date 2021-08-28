module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx|svelte)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-svelte-csf",
    "@storybook/addon-storysource/register",
    "@storybook/addon-actions/register",
    "@storybook/addon-notes/register",
    "@storybook/addon-viewport/register",
    "@storybook/addon-a11y/register"
  ],
  "svelteOptions": {
    "preprocess": require("../svelte.config.cjs").preprocess
  }
}