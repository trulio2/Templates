import { type IRootService } from '@/types'
import { rootStore } from './root.store'

class RootService implements IRootService {
  constructor() {}

  public getInitialized(): boolean {
    return rootStore((state) => state.initialized)
  }

  public setInitialized(value: boolean): void {
    const { setInitialized } = rootStore.getState()

    setInitialized(value)
  }
}

export default RootService
