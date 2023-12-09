import {
  login,
  mergeResults,
  loadWcagIssues,
  createWcagLabels,
  uploadArtifact,
} from "./lib.mjs";

const inputFile = "./wcag-em.json";
const outputFile = "tmp/wcag-em.json";
const owner = "nl-design-system";
const repo = "documentatie";
const labelColor = "D93F0B";
const website = "https://nldesignsystem.nl";
const token = process.env.GITHUB_TOKEN;
const createNewLabels = false;
const createArtifact = false;

const octokit = await login({ token });

if (createNewLabels) {
  createWcagLabels({ octokit, owner, repo, color: labelColor });
}

const auditResult = await loadWcagIssues({ owner, repo, octokit, website });

await mergeResults({ inputFile, outputFile, auditResult });

if (createArtifact) {
  await uploadArtifact({ outputFile });
}
