import { App } from './src'

const app = new App()

app.run()
app.get('/', async (req, res) => {
  res.json({ message: 'Hello World' })
})
