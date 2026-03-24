# Terminal Portfolio - Mateus Silva

Software developer portfolio with an interactive terminal theme and a hidden investigation game.

**Live:** [https://resume.networkmat.uk/](https://resume.networkmat.uk/)

## Tech Stack

- **Frontend:** Vanilla JS, CSS, HTML
- **Backend:** C# / .NET 9 Minimal API (leaderboard)
- **Infra:** Docker, Nginx, GitHub Actions

## Local Development

Requires Python 3 and .NET 9 SDK.

```powershell
.\start-dev.ps1
# Frontend: http://localhost:8000
# API:      http://localhost:5000
```

## Docker

```bash
docker-compose up -d --build
# http://localhost:8080
```

## Tests

```bash
dotnet test ApiServer.Tests
```

## License

MIT. See [LICENSE](LICENSE).
