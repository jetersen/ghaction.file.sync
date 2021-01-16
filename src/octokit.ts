import * as core from '@actions/core'
import {
  GitHub,
  getOctokitOptions as tokenOctokitOptions
} from '@actions/github/lib/utils'
import {createAppAuth} from '@octokit/auth-app'
import {config} from '@probot/octokit-plugin-config'
import {createPullRequest} from 'octokit-plugin-create-pull-request'
import {inputs, context} from './context'
import {Log} from './log'

export async function getOctokit(
  log: Log
): Promise<InstanceType<typeof GitHub>> {
  core.startGroup('🔐 Authenticating')

  let options

  if (inputs.githubToken) {
    log.info('🔑 Authenticating with a GitHub Token')
    options = tokenOctokitOptions(inputs.githubToken)
  }

  try {
    if (!options && inputs.appId && inputs.privateKey) {
      const appCredentials = {
        appId: inputs.appId,
        privateKey: inputs.privateKey
      }

      log.info('🔑 Authenticating with a GitHub App Installation Token')

      const appOctokit = new GitHub({
        authStrategy: createAppAuth,
        auth: {
          type: 'app',
          ...appCredentials
        }
      })
      log.info('📝 Fetching GitHub App Installation Token')
      const {
        data: {id: installationId}
      } = await appOctokit.apps.getRepoInstallation(context.repo)
      options = {
        authStrategy: createAppAuth,
        auth: {
          type: 'installation',
          installationId,
          ...appCredentials
        }
      }
      log.info(`✅ Fetched GitHub App Installation Token`)
    }
    if (!options) {
      throw new Error(
        `💥 No credentials provided, please provide a 'github-token' to authenticate as a user or provide a 'app-id' and 'private-key' to authenticate as a GitHub App`
      )
    }
  } catch (e) {
    log.error(e.message)
    throw new Error(
      '🔒 Failed to authenticate, did you remember to install your GitHub App?'
    )
  } finally {
    core.endGroup()
  }

  const github = GitHub.plugin(config, createPullRequest)
  return new github(options)
}
