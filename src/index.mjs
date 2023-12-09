import {
  login,
  mergeResults,
  loadWcagIssues,
  createWcagLabels,
  uploadArtifact,
} from "./lib.mjs";

const inputFile = "./wcag-evaluation.json";
const outputFile = "tmp/wcag-evaluation.json";
const owner = "frameless";
const repo = "wcag-issues-action";
const labelColor = "D93F0B";
const website = "https://github.com/frameless/wcag-issues-action";
const token = process.env.GITHUB_TOKEN;
const createNewLabels = true;
const createArtifact = false;

const octokit = await login({ token });

if (createNewLabels) {
  createWcagLabels({ octokit, owner, repo, color: labelColor });
}

// const auditResult = await loadWcagIssues({ owner, repo, octokit, website });

// await mergeResults({ inputFile, outputFile, auditResult });

// if (createArtifact) {
//   await uploadArtifact({ outputFile });
// }
