import { Octokit } from "octokit";
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
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

export const getPrComments = async ({ octokit, owner, repo }) => {
  return await octokit.paginate(octokit.rest.issues.listCommentsForRepo, {
    owner,
    repo,
  });
};

const issueLink = (url) =>
  url.replaceAll(
    /^https:\/\/(?:[^.]+\.)?github.com\/([^/]+)\/([^/]+)\/issues\/([^/#]+)$/gi,
    "[$1/$2#$3](https://github.com/$1/$2#issuecomment-$3",
  );

export const logComments = async ({
  octokit,
  owner,
  repo,
  issuesJsonFile,
  jsonOutputFile,
  markdownOutputFile,
}) => {
  const offline = true;

  // const out = (await getPrComments({ octokit, owner, repo })).filter(
  //   ({ user: { login } }) => login === "Robbert",
  // );

  const cached = existsSync(issuesJsonFile);
  const issues =
    offline && cached
      ? JSON.parse(await readFile(issuesJsonFile))
      : await octokit.paginate(octokit.rest.issues.listForRepo, {
          owner,
          repo,
        });

  if (!cached) {
    await writeFile(issuesJsonFile, JSON.stringify(issues, null, "  "));
  }

  const issuesByRepo = issues.reduce((map, obj) => {
    map[obj.url] = obj;
    return map;
  }, {});

  const out = offline
    ? JSON.parse(await readFile(jsonOutputFile))
    : await getPrComments({ octokit, owner, repo });
  let markdown = Object.values(
    Object.groupBy(out, ({ issue_url }) => issue_url),
  )
    .map((issues) => {
      const issue_url = issues[0].issue_url ?? "";
      const issueObj = issuesByRepo[issue_url];

      return (
        (issueObj
          ? `## ${issueLink(issueObj.url)} : ${issueObj.title}\n\n`
          : `## ${issueLink(issues[0].issue_url)}\n\n`) +
        issues
          .map(
            ({ body, created_at, html_url, user: { login } }) =>
              `### Comment by [@${login}](https://github.com/${login}) at ${new Intl.DateTimeFormat(
                "en-US",
                {
                  dateStyle: "full",
                  timeStyle: "long",
                  timeZone: "Europe/Amsterdam",
                },
              ).format(new Date(created_at))}\n\nIssue: [${html_url.replace(
                /^https:\/\/github.com\/([^/]+)\/([^/]+)\/issues\/([^/#]+)$/gi,
                "$1/$2#$3",
              )}](${html_url})\n\n${body}`,
          )
          .join("\n\n")
      );
    })
    // .flatten()
    .join("\n\n");

  markdown = `# Comments\n\n${markdown}`;

  await writeFile(jsonOutputFile, JSON.stringify(out, null, "  "));
  await writeFile(markdownOutputFile, markdown);
};

const token = process.env.GITHUB_TOKEN;

const octokit = await login({ token });

const repos = [
  { owner: "nl-design-system", repo: "backlog" },
  { owner: "nl-design-system", repo: "basis" },
  { owner: "nl-design-system", repo: "beheer" },
  { owner: "nl-design-system", repo: "candidate" },
  { owner: "nl-design-system", repo: "documentatie" },
  { owner: "nl-design-system", repo: "example" },
  { owner: "nl-design-system", repo: "gebruikersonderzoeken" },
  { owner: "nl-design-system", repo: "hall-of-fame" },
  { owner: "nl-design-system", repo: "index" },
  { owner: "nl-design-system", repo: "terraform" },
  { owner: "nl-design-system", repo: "themes" },

  { owner: "nl-design-system", repo: "editor" },
  { owner: "nl-design-system", repo: "theme-wizard" },

  { owner: "nl-design-system", repo: "utrecht" },
  { owner: "nl-design-system", repo: "rijkshuisstijl-community" },
  { owner: "nl-design-system", repo: "lux" },
  { owner: "nl-design-system", repo: "rvo" },
  { owner: "nl-design-system", repo: "denhaag" },
  { owner: "nl-design-system", repo: "tilburg" },
  { owner: "nl-design-system", repo: "mijn-services" },
  { owner: "nl-design-system", repo: "nlds-community-blocks" },
].forEach(({ owner, repo }) => {
  logComments({
    octokit,
    issuesJsonFile: `./tmp/${repo}.issues.json`,
    jsonOutputFile: `./tmp/${repo}.all.json`,
    markdownOutputFile: `./tmp/${repo}.md`,
    owner,
    repo,
  });
});
