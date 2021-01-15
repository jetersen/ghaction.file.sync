import * as core from '@actions/core'
import {context, inputs} from './context'
import {FileSync} from './fileSync'
import {getOctokit} from './octokit'
import {Log} from './log'

async function run(): Promise<void> {
  try {
    const log = new Log(inputs.dryRun)
    const octokit = await getOctokit(log)
    const fileSync = new FileSync(inputs, context, octokit, log)
    await fileSync.run()
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
