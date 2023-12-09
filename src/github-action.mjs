import { getInput, getBooleanInput } from "@actions/core";
import {
  loadWcagIssues,
  mergeResults,
  login,
  createWcagLabels,
  uploadArtifact,
} from "./lib.mjs";

const input = getInput("input", { required: true }) || "../wcag-em.json";
const owner = getInput("owner", { required: true }) || "nl-design-system";
const repo = getInput("repo", { required: true }) || "documentatie";
const labelColor = getInput("label-color", { required: false }) || "D93F0B";
const website =
  getInput("label-color", { required: false }) || "https://nldesignsystem.nl";
const token = getInput("token", { required: true });
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

const auditResults = await loadWcagIssues({ octokit, owner, repo, website });

await mergeResults({
  inputFile: input,
  auditResults,
  outputFile: "tmp/wcag-em.json",
});

if (createArtifact) {
  await uploadArtifact({ outputFile });
}
