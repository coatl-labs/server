# @coatl/server

A simple server for creating RESTful APIs.

## Installation

```bash
npm install @coatl/server
```

## Usage

```typescript
import { App } from '@coatl/server';

const app = new App({
    port: process.env.PORT || 3000,
});

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.run();
```

## License

MIT
