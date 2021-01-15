## About

GitHub Action to manage common files and workflow that you would link to sync to other repos as code.

## Usage

YAML configuration

In the repository where you want to sync files from, create the YAML file `.github/syncs.yml`, you can also set a custom filename, that looks like:

```yaml
syncs:
  - repos:
      - jetersen/file-sync-test
      - jetersen/file-sync-test-destionation
    files:
      - src: workflows/labels.yml
        dest: .github/workflows/labels.yml
      - src: LICENSE
  - repos: |
      jetersen/file-sync-test
      ${{ secret. }}
```
