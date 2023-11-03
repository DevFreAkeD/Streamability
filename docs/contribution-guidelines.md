# Contributing 👥

Streamability is very open to contributions! If you have a feature request or bug report, please open an [issue](https://github.com/Thenlie/Streamability/issues) with the applicable tag. If you would like to create a feature yourself, [fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks) the repository and add in your changes. Then submit a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) which will be reviewed and eventually merged if it meets all contribution requirements. You can find out more about these requirements in the [contribution guidelines](https://github.com/Thenlie/Streamability/blob/main/docs/contribution-guidelines.md).

---

# Branching Strategy 🌲

When creating branches, be sure to use the proper naming convention. Each item should by hyphen separated and lowercase.

1. Issue number. If no issue, `NA-0`
2. Issue type. If no issue, pick the most suitable type. 
3. Description.

Example:
```
13-feat-show-card
```

You should branch off of the `develop` branch, not `main` as this is where all PRs will point. Be sure your branch is up to date before submitting PRs by running `git rebase develop` while checked out to your branch. You can read more about this below.

---

# Git Workflow 🧬

Streamability V2 is attempting to have a linear commit history on `main` as well as `develop`. You can read more about the benefits of linear commit histories [here](https://www.bitsnbites.eu/a-tidy-linear-git-history/#:~:text=A%20linear%20history%20is%20simply,branches%20with%20independent%20commit%20histories.). 

Creating and pushing a new feature branch is quite simple. Follow the steps below:

1. Checkout to `develop` and pull the most recent changes.
```s
git pull origin develop
```

2. Create a new feature branch using the proper naming convention.
```s
git checkout -b <"issue-num"-"issue-type"-"branch-name">
```
> NOTE: If you do not have an issue number or type, `NA-0`, should be used instead followed by the branch name.
> 
> The branch name is whatever the developer thinks fits best but should be descriptive, lowercase, and hyphen separated. 

3. Add your changes to the branch and create a new commit. The commit should contain a descriptive message of the changes or additions you have made. It is also a good idea to run an es-lint check first.
```s
npm run lint
git add -A
git commit -m "descriptive message"
```
> One common issue when learning to work with linear histories is avoiding merge commits. As an example, if you are on `feature` and another developer merges a pull request to `develop`, using the command `git merge develop` will create a merge commit on the feature branch log. Assuming the code added to develop is unrelated to the feature,this is an unnecessary commit on the feature branch. To avoid this, `git rebase develop` should be used instead.

4. Push your branch to the remote repository
```s
git push origin branch-name
```
> NOTE: This assumes you named the remote `origin`.

5. If you need to make changes to your code after the PR review, you can do so and add, then commit as normal. After you have done this use an interactive rebase to squash the commits into as few as possible. You will then need to force push your branch back to the remote.
```s
git rebase -i HEAD~2
...
git push -f origin branch-name
```
> NOTE: `HEAD~2` would pick the current HEAD and on commit previous for the rebase. Change this number as needed depending on the number of commits you have. You can read more about rebasing [here](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase).

## Work-in-Progress Commits

If you would like to make commits without running the full test suite, you can do so with the following command:
```s
git commit -m "msg" --no-verify
```
You can also set an environment flag in you shell to do this. Here is a helpful script for quickly creating WIP commits:
```s
export NO_VERIFY=1 && git add -A && git commit -m "CI Skipped. --WIP--" && export NO_VERIFY=
```

---

# Code Quality 🧼

## ES Lint

In order to make it easier for lots of people to contribute to the project, we want to maintain a high standard of code. To help achieve this, [ES Lint](https://eslint.org/) has been set up in the project. It has also been added to an automation that will run on each PR. Your PR will be blocked if the lint check fails, so be sure not run lint check locally before pushing. To do this, use the commands below.

Run lint check, returns errors and warnings:
```s
npm run lint
```
Run lint check and fix any errors it can:
```s
npm run lint-fix
```

ES Lint will throw warnings for implicit use of the `any` type. This should be avoided whenever possible, but can also be ignored with an es-lint flag when absolutely necessary.

Should you encounter an area where es-lint and prettier conflict, ignore prettier first.

## TypeScript

The easiest way to check for typescript issues is to run the command `npm run watch`. This will run the TypeScript compiler in watch mode so errors and warning will automatically update on save. If you would like to just run the compiler once, use `npm run compile`.

TypeScript also has a standardized comment syntax that should be followed for primary components/functions.

## Logs

Console logs may not be left in the code. If you need to log an error, or a debug log for some reason, you can use the [Logger](https://github.com/Thenlie/Streamability/blob/main/src/logger.ts) class. This will strip the logs from production builds. See the snippet below for an example of how to use the logger.

```js
const LOG = new Logger('ScreenName');

LOG.error('my custom error message');
LOG.debug('my custom debug message');
```

# Testing 🧪

This project features a Vitest testing suite. All tests will need to pass in order for PR's to main or develop to be unblocked. You can run these tests locally with the commands below:
```s
npm test
```

To run the tests in watch mode:
```s
npm test -- -w
```

To run a single test:
```s
npm test <test-name>
```

These tests will be run on each commit. See [work in progress commits](#work-in-progress-commits) if you would like to bypass this behavior.

When running UI automation tests, failing tests will print out the React Testing Library DOM at time of failure. It is common for this to get truncated in out app. The size of this print can be expanded with the `DEBUG_PRINT_LIMIT` environment variable.
