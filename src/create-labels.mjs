const truncate = (str, limit, replacement = '…') => {
  let truncated = str.trim();

  if (truncated.length > limit) {
    truncated = `${truncated.slice(0, limit - replacement.length).trim()}${replacement}`;
  }

  return truncated;
}

export const createLabels = async ({
  octokit,
  owner,
  repo,
  defaultColor,
  labels,
  log,
}) => {
  if (
    !labels.some(
      ({ name, description }) =>
        typeof name === "string" &&
        name.length > 0 &&
        (typeof description === "undefined" ||
          (typeof description === "string" && description.length > 0)),
    )
  ) {
    throw new Error("Label configuration has incorrect property values.");
  }

  const targetLabels = labels.map(({ color, description, name }) => ({
    name,
    description: description ? truncate(description, 100) : "",
    color: color || defaultColor,
  }));

  const existingLabels = await octokit.paginate(
    octokit.rest.issues.listLabelsForRepo,
    {
      owner,
      repo,
    },
  );

  const newLabels = targetLabels.filter(
    (label) => !existingLabels.some(({ name }) => name === label.name),
  );

  const updatedLabels = targetLabels.filter((label) =>
    existingLabels.some(
      ({ name, description, color }) =>
        name === label.name &&
        (label.description !== description || label.color !== color),
    ),
  );

  if (newLabels.length > 0) {
    console.log(
      `${newLabels.length} WCAG labels need to be created for ${owner}/${repo}.`,
    );
  }

  if (updatedLabels.length > 0) {
    console.log(
      `${updatedLabels.length} WCAG labels need to be updated for ${owner}/${repo}.`,
    );
  }

  if (newLabels.length + updatedLabels.length === 0) {
    console.log(
      `All ${labels.length} WCAG labels already exist for ${owner}/${repo}!`,
    );
  }

  await Promise.all(
    newLabels.map(({ name, description, color }) =>
      octokit.rest.issues
        .createLabel({
          owner,
          repo,
          name,
          description,
          color,
        })
        .then(
          (arg) => {
            if (log) {
              console.log(`Created label: ${name}`);
            }
            return arg;
          },
          (arg) => {
            if (log) {
              console.log(arg);
              console.error(arg.data.errors);
              console.error(`Error: Failed to created label: ${name}`);
            }
            return arg;
          },
        ),
    ),
  );

  await Promise.all(
    updatedLabels.map(({ name, description, color }) =>
      octokit.rest.issues
        .updateLabel({
          owner,
          repo,
          name,
          description,
          color,
        })
        .then(
          (arg) => {
            if (log) {
              console.log(`Updated label: ${name}`);
            }
            return arg;
          },
          (arg) => {
            if (log) {
              console.error(`Error: Failed to update label: ${name}`);
            }
            return arg;
          },
        ),
    ),
  );
};
