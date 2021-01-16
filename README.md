## About

GitHub Action to manage common files and workflow that you would like to sync to other repos as code by creating pull requests file changes.

This is Action is an alternative to [workflow templates](https://docs.github.com/en/actions/learn-github-actions/sharing-workflows-with-your-organization) which is sometimes too cumbersome.

## Usage

### YAML configuration

In the repository where you want to sync files from, create the YAML file `.github/syncs.yml`

```yaml
syncs:
  - repos:
      - jetersen/file-sync-test
      - jetersen/file-sync-test-destionation
    files:
      - src: workflows/labels.yml
        dest: .github/workflows/labels.yml
      - src: LICENSE
```

### Workflow

In the repository where you want sync files from, create the workflow file `.github/workflows/syncs.yml`

```yaml
name: Workflow Sync

on:
  push:
    branches:
      - main

jobs:
  file-syncs:
    runs-on: ubuntu-latest
    steps:
      - name: Running Workflow Sync
        uses: jetersen/ghaction.file.sync@v1
        with:
          appId: ${{ secrets.APP_ID }}
          privateKey: ${{ secrets.APP_PEM }}
```

### Inputs

Following inputs can be used as `step.with` keys

| Name          | Type   | Description                                                                               |
| ------------- | ------ | ----------------------------------------------------------------------------------------- |
| `appId`       | String | Your GitHub App's id                                                                      |
| `privateKey`  | String | A private key for your GitHub App                                                         |
| `githubToken` | String | defaults to `""` as you usally need a token with permissions to target other repositories |
| `configFile`  | String | Path to YAML file containing labels definitions. (default `.github/syncs.yml`)            |
| `dryRun`      | Bool   | If enabled, changes will not be applied. (default `false`)                                |

> 💡 Either use `githubToken` or use `appId` and `privateKey` by [creating a GitHub App for your user/organization](https://docs.github.com/en/developers/apps/creating-a-github-app)

### GitHub App Permissions

It is recommended to use a GitHub App as it provides granular repo permissions.
The GitHub App needs the following permissions

| Name          | Permissions | Why?                                                  |
| ------------- | ----------- | ----------------------------------------------------- |
| Pull requests | Read/Write  | To create pull request for files being synced         |
| Contents      | Read/Write  | To create branch and commits for files being synced   |
| Workflows     | Read/Write  | Permission to update `.github/workflows` files        |
| Metadata      | Read        | Mandatory for pull requests and workflows permissions |

### GitHub Token Permissions

If you choose to use a GitHub Token it would need the `workflow` and `repo` permissions if you need to update GitHub Action workflow files.
Be careful as this token will have access to all repositories, the recommendation is to use a GitHub App where you can choose which repos the app has access to.

## Examples

Works great with other GitHub Actions and GitHub Apps such as Dependabot as they have configuration files you need in each repo.

- [.github/dependabot.yml](https://docs.github.com/en/github/administering-a-repository/configuration-options-for-dependency-updates)
- [crazy-max/ghaction-github-labeler](https://github.com/crazy-max/ghaction-github-labeler)
- [release-drafter](https://github.com/release-drafter/release-drafter)

An example for syncing github labeler action.

```yaml
syncs:
  - repos:
      - jetersen/file-sync-test
    files:
      - src: .github/labels.yml
      - src: workflows/labels.yml
        dest: .github/workflows/labels.yml
```

[For working example checkout this repository](https://github.com/jetersen/workflows)
[For a pull request created by the action](https://github.com/jetersen/ghaction.file.sync/pull/1)
