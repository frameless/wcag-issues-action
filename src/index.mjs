import {
  login,
  mergeResults,
  loadWcagIssues,
  createWcagLabels,
  uploadArtifact,
} from "./lib.mjs";
import { components } from "./components.mjs";
import { createLabels } from "./create-labels.mjs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const inputFile = null;
// const inputFile = "./wcag-evaluation.json";
const outputFile = join(tmpdir(), "wcag-evaluation.json");
const owner = "frameless";
const repo = "wcag-em";
const labelColor = "D93F0B";
const website = "https://github.com/frameless/wcag-issues-action";
const token = process.env.GITHUB_TOKEN;
const createNewLabels = false;
const createArtifact = false;
const createComponentLabels = true;
const description = "This is just an example.";
const title = "GitHub Action for WCAG reports in GitHub Issues";
const log = true;

const octokit = await login({ token });

if (createNewLabels) {
  await createWcagLabels({ octokit, owner, repo, color: labelColor, log });
}
if (createComponentLabels) {
  await createLabels({
    octokit,
    owner,
    repo,
    defaultColor: '3504F3',
    labels: components.map(({ id, description }) => ({
      name: `component/${id}`,
      description,
    })),
    log,
  });
}
process.exit(0);
const auditResult = await loadWcagIssues({ owner, repo, octokit, website });

await mergeResults({ inputFile, outputFile, auditResult, title, description });

if (createArtifact) {
  const artifactResult = await uploadArtifact({ outputFile });
  console.log(artifactResult);
}
