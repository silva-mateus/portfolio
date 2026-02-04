# Terminal Portfolio - Mateus Silva

Backend engineer portfolio with an interactive terminal theme.
There is a hidden terminal easter egg for curious visitors who want to explore and play.

📄 **View the Portifolio:**  
You can view the portifolio online here:  
[https://resume.networkmat.uk/](https://resume.networkmat.uk/)

## Local Setup

### Frontend (static)

Option 1: Python
```bash
python -m http.server 8000
# http://localhost:8000
```

Option 2: Node.js
```bash
npx http-server -p 8000
# http://localhost:8000
```

Option 3: Windows script
```bash
start-server.bat
```

### API server

Requires .NET 9 SDK or newer.

```bash
start-api-server.bat
# API: http://localhost:5000
```

### Docker

```bash
docker-compose up -d --build
# http://localhost:8080
```

## Repository Notes

- This repository is public for cloning and personal use.
- No external contributions are accepted at this time.

## License

MIT. See [LICENSE](LICENSE).
