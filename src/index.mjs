import {
  login,
  mergeResults,
  loadWcagIssues,
  createWcagLabels,
  uploadArtifact,
} from "./lib.mjs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const inputFile = null;
// const inputFile = "./wcag-evaluation.json";
const outputFile = join(tmpdir(), "wcag-evaluation.json");
const owner = "frameless";
const repo = "wcag-issues-action";
const labelColor = "D93F0B";
const website = "https://github.com/frameless/wcag-issues-action";
const token = process.env.GITHUB_TOKEN;
const createNewLabels = true;
const createArtifact = true;
const description = "This is just an example.";
const title = "GitHub Action for WCAG reports in GitHub Issues";

const octokit = await login({ token });

if (createNewLabels) {
  createWcagLabels({ octokit, owner, repo, color: labelColor });
}

const auditResult = await loadWcagIssues({ owner, repo, octokit, website });

await mergeResults({ inputFile, outputFile, auditResult, title, description });

if (createArtifact) {
  const artifactResult = await uploadArtifact({ outputFile });
  console.log(artifactResult);
}
