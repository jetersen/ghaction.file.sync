export interface File {
  src: string
  dest: string | undefined
  content: string | null | undefined
}

export interface Sync {
  repos: string[]
  files: File[]
}

export interface Config {
  syncs: Sync[]
}

export interface Repo {
  owner: string
  repo: string
}

export interface Inputs {
  githubToken: string
  privateKey: string
  appId: string
  configFile: string
  dryRun: boolean
}
