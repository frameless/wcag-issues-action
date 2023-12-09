import { getInput, getBooleanInput } from "@actions/core";
import {
  loadWcagIssues,
  mergeResults,
  login,
  createWcagLabels,
  uploadArtifact,
} from "./lib.mjs";

const input = getInput("input", { required: false });
const owner = getInput("owner", { required: true });
const repo = getInput("repo", { required: true });
const labelColor = getInput("label-color", { required: false });
const website = getInput("label-color", { required: true });
const token = getInput("token", { required: true });
const title = getInput("title", { required: false });
const description = getInput("description", { required: false });
const createLabels =
  getBooleanInput("create-labels", {
    required: false,
    default: false,
  }) || false;
const createArtifact =
  getBooleanInput("create-artifact", {
    required: false,
    default: false,
  }) || false;

const octokit = await login({ token });

if (createLabels) {
  await createWcagLabels({ octokit, owner, repo, color: labelColor });
}

const auditResult = await loadWcagIssues({ octokit, owner, repo, website });

await mergeResults({
  inputFile: input,
  auditResult,
  outputFile: "tmp/wcag-em.json",
  title,
  description,
});

if (createArtifact) {
  await uploadArtifact({ outputFile });
}
