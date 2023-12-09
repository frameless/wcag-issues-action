# WCAG Issues action

This GitHub action is built with a couple techniques and libraries, if you want to know more about them check out these web pages:

- [GitHub Artifact `@actions/artifact`](https://github.com/actions/toolkit/tree/main/packages/artifact) library, for sharing the resulting JSON file as GitHub Artifact.
- [GitHub Action `@actions/core`](https://github.com/actions/toolkit/tree/main/packages/core) library, for reading the arguments from the action YAML.
- [GitHub `octokit.js`](https://github.com/octokit/octokit.js/) library, for getting information about issues in the GitHub API.
- [Expressing ACT Rule results with JSON-LD and EARL](https://www.w3.org/TR/act-rules-format/#appendix-data-example): the JSON format we use for output.
