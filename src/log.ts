import * as core from '@actions/core'

export class Log {
  private readonly dryRun

  constructor(dryRun: boolean) {
    this.dryRun = dryRun
  }

  private logMessage(message: string): string {
    return `${this.dryRun ? '[dryrun] ' : ''}${message}`
  }

  startGroup(name: string): void {
    core.startGroup(name)
  }

  endGroup(): void {
    core.endGroup()
  }

  info(message: string): void {
    core.info(this.logMessage(message))
  }

  error(message: string): void {
    core.error(this.logMessage(message))
  }

  warning(message: string): void {
    core.warning(this.logMessage(message))
  }
}
