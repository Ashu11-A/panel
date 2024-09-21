import '@/helpers.js'
import '@/config/index.js'
import { Kernel } from '@/controllers/kernel.js'
import { watch } from 'node:fs'
import { Global } from '@/config/index.js'
import { Vite } from '@/libs/vite.js'
import { opine } from 'opine'
import { Terminal } from '@/controllers/terminal.js'
import { Database } from '@/controllers/database/index.js'
import { Model } from 'denodb'
import { EnvConfiguration } from './controllers/configs/envConfiguration.js'
console.log('Loading [kernels].green...')
let timeout: number | null = null

/**
 * Watcher of env options
 */
new Kernel({
  identify: 'Configuration',
  priority: 0,
  after() {
    watch('.env', () => {
      if (!timeout) {
        EnvConfiguration.config()
        timeout = setTimeout(() => {
          timeout = null
        }, 100)
      }
    })
  },
})

/**
 * Database Configuration
 */
new Kernel({
  identify: 'Database',
  priority: 1,
  imports: {
    paths: ['models/**/*.ts'],
    import(module) {
      const model = module as { default:typeof Model }
      if (Database.schemas) {
        Database.schemas.push(model.default)
      }
    },
  },
  async after() {
    Database.preset()
    await Database.initialize()
  },
})

/**
 * Http configuration Kernel
 */
new Kernel({
  identify: 'Http',
  after() {
    const app = opine()

    if (Global.node.get === 'development') {
      Vite(Global.port.get, Global.dev_port.get)
      console.log(
        `[RESTAPI].blue is running on port ${Global.dev_port.get}`,
      )
      console.log(`[VITE].blue is running on port ${Global.port.get}`)
    } else {
      console.log(`Dashboard is running on port ${Global.dev_port.get}`)
    }

    app.listen({
      port: (Global.node.get === 'development'
        ? Global.dev_port.get
        : Global.port.get),
      hostname: Global.hostname.get,
    })
  },
})

await Kernel.initialize()
await Terminal.start()
