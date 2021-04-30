const { ZBClient } = require('zeebe-node')
import dotenv from 'dotenv'

dotenv.config()

async function start(count: number) {
  const zbc = new ZBClient({
    camundaCloud: {
      clientId: process.env.ZEEBE_CLIENT_ID,
      clientSecret: process.env.ZEEBE_CLIENT_SECRET,
      clusterId: process.env.ZEEBE_ADDRESS.split('.')[0],
    },
  })

  await new Promise((resolve, reject) => {
    console.log(`waiting for connection`)
    setTimeout(() => {
      resolve('')
    }, 2000)
  })

  console.log(`starting new instances`)

  const promises: any[] = []

  for (let i = 0; i < count; i++) {
    if (i % 100 === 0) {
      console.log(`Instance ${i}`)
    }
    promises.push(zbc.createWorkflowInstance('simple'))
  }

  const results = await Promise.all(promises)
  console.log(`Started ${results.length} instances.`)
}

start(20000)
