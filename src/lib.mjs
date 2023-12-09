import { Octokit } from "octokit";
import { readFile, writeFile } from "node:fs/promises";
import { basename } from "node:path";
import { successCriteria } from "./wcag21.mjs";
import cloneDeep from "lodash.clonedeep";
import { paginateRest } from "@octokit/plugin-paginate-rest";

Octokit.plugin(paginateRest);

export const login = async ({ token }) => {
  // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
  const octokit = new Octokit({ auth: token });

  // Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();

  console.log("Succesfully authenticated as %s", login);

  return octokit;
};

export const createWcagLabels = async ({ octokit, owner, repo, color }) => {
  const wcagLabels = successCriteria.map(({ sc, title }) => ({
    name: `wcag/${sc}`,
    description: title,
  }));

  const labels = await octokit.paginate(octokit.rest.issues.listLabelsForRepo, {
    owner,
    repo,
  });

  const existingLabels = labels;

  const newLabels = wcagLabels.filter(
    (wcagLabel) => !existingLabels.some(({ name }) => name === wcagLabel.name),
  );

  if (newLabels.length > 0) {
    console.log(
      `${newLabels.length} WCAG labels need to be created for ${owner}/${repo}.`,
    );
  } else {
    console.log(
      `All ${labels.length} WCAG labels already exist for ${owner}/${repo}!`,
    );
  }

  const createResult = await Promise.all(
    newLabels.map(({ name, description }) =>
      octokit.rest.issues.createLabel({
        owner,
        repo,
        name,
        description,
        color,
      }),
    ),
  );
};

export const loadWcagIssues = async ({ octokit, owner, repo, website }) => {
  const issues = await octokit.rest.issues.list({
    owner,
    repo,
    filter: "all",
  });

  const isWcagLabel = (str) => /^wcag\//i.test(str);

  const wcagIssues = issues.data.filter(
    (issue) => !!issue.labels.find((label) => isWcagLabel(label.name)),
  );

  console.log(`${issues.data.length} issues:`);
  console.log(`${wcagIssues.length} WCAG issues:`);

  wcagIssues.forEach((issue) => {
    console.log(`${issue.title}\n${issue.html_url}\n`);
  });

  const labelToSC = successCriteria.reduce((_map, item) => {
    _map[`wcag/${item.sc}`] = item;
    return _map;
  }, {});

  // https://www.w3.org/TR/act-rules-format/
  const vocab = {
    WCAG20: "https://www.w3.org/TR/WCAG20/#",
    WCAG21: "https://www.w3.org/TR/WCAG21/#",
    "ACT-RULES-CG": "https://act-rules.github.io/",
  };

  // TODO: Perhaps take `website` from API, in repo settings?

  const auditResult = wcagIssues.map((issue) => {
    const wcagLabels = issue.labels.filter(({ name }) => isWcagLabel(name));
    const sc = labelToSC[wcagLabels[0].name];
    const testReference = sc.url.replace(
      "https://www.w3.org/TR/WCAG21/#",
      "WCAG21:",
    );

    return {
      "@type": "Assertion",
      assertedBy: issue.user.html_url,
      subject: website,
      date: issue.created_at,
      test: testReference,
      result: {
        date: issue.created_at,
        outcome: {
          id: "earl:failed",
        },
      },
    };
  });

  return auditResult;
};

export const mergeResults = async ({ inputFile, auditResult, outputFile }) => {
  const inputJSON = JSON.parse(await readFile(inputFile));
  const out = cloneDeep(inputJSON);
  out.auditSample = [...inputJSON.auditSample, ...auditResult];

  if (outputFile) {
    await writeFile(outputFile, JSON.stringify(out, null, "  "));
  }
};

export const uploadArtifact = async ({ outputFile }) => {
  const filename = basename(outputFile);
  await artifact.uploadArtifact(
    // name of the artifact
    filename,
    // files to include (supports absolute and relative paths)
    [outputFile],
  );
};
