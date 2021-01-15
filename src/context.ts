import isBase64 from 'is-base64'
import * as core from '@actions/core'
import {context as ghContext} from '@actions/github'
import {Inputs} from './types'

function privateKey(): string {
  const inputPrivateKey = core.getInput('privateKey') || ''
  return isBase64(inputPrivateKey)
    ? Buffer.from(inputPrivateKey, 'base64').toString('utf8')
    : inputPrivateKey
}

export const inputs: Inputs = {
  githubToken: core.getInput('githubToken') || '',
  privateKey: privateKey(),
  appId: core.getInput('appId') || '',
  configFile: core.getInput('configFile') || '.github/syncs.yml',
  dryRun: /true/i.test(core.getInput('dryRun'))
}

export const context = ghContext
