# 💼 Terminal Portfolio - Mateus Silva

> Backend Engineer Portfolio com tema Terminal Interativo

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/your-username/portfolio)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## 🎯 Visão Geral

Portfólio profissional de **Backend Engineer / Business System Analyst Lead** com **6+ anos de experiência** em sistemas de billing, análise de dados, Python, SQL, C++, e AWS.

### Conceito: **Terminal Interativo**

Design único inspirado em terminais de comando, interfaces CLI e documentação de APIs, refletindo a identidade de um engenheiro de backend.

---

## ✨ Principais Funcionalidades

### 🎨 Design & UI/UX

- **Dark Theme por Padrão** - Paleta terminal com cores neon (cyan, green, purple)
- **Fonte Monoespaçada** - JetBrains Mono para elementos técnicos
- **Scanline Effect** - Animação sutil de linhas CRT vintage
- **Glow Effects** - Text-shadow e box-shadow neon nos hovers
- **Gradient Text** - Gradientes animados em títulos e números
- **Blinking Cursor** - Cursor terminal piscando após títulos

### 🚀 Interatividade

- **Animações de Digitação** - Efeito typewriter no hero
- **Scroll Animations** - Elementos aparecem suavemente ao rolar
- **Skill Bars Animadas** - Preenchimento com gradiente shimmer
- **Hover Effects** - Microinterações em todos os elementos interativos
- **Smooth Scroll** - Navegação suave entre seções

### 🎮 Easter Eggs

1. **Terminal Console** (`Ctrl + Shift + K`)
   - Console interativo com comandos CLI
   - Comandos: `help`, `about`, `skills`, `contact`, `projects`, `clear`, `matrix`, `coffee`

2. **Konami Code** (↑ ↑ ↓ ↓ ← → ← → B A)
   - Ativa "Matrix Mode" com efeito especial

3. **Console Logs**
   - Mensagens estilizadas no Developer Console
   - Dicas de Easter eggs e comandos

### 🌍 Multilingual

- **3 idiomas**: Português (PT), Inglês (EN), Espanhol (ES)
- **Troca Dinâmica**: Alterna entre idiomas sem reload
- **Persistência**: Salva preferência no localStorage

### 🎨 Temas

- **Dark Mode** (padrão) - Terminal style
- **Light Mode** - Versão clara opcional
- **Toggle Suave** - Transição animada entre temas

---

## 📱 Seções do Portfólio

1. **Hero** - Apresentação com foto e animação de digitação
2. **Sobre** - Biografia e estatísticas (anos exp., projetos, etc.)
3. **Skills** - Categorias técnicas com progress bars animadas
4. **Experiência** - Timeline profissional com tags
5. **Projetos** - Cards detalhados com contexto/desafio/solução
6. **Formação** - Educação e certificações
7. **Contato** - Links sociais e download de CV

---

## 🛠️ Tecnologias Utilizadas

### Frontend

- **HTML5** - Estrutura semântica
- **CSS3** - Variáveis, Grid, Flexbox, Animations
- **JavaScript (Vanilla)** - Sem frameworks pesados
- **Google Fonts** - JetBrains Mono + Inter

### Features

- **Intersection Observer API** - Animações on-scroll
- **LocalStorage API** - Persistência de preferências
- **Fetch API** - Carregamento de conteúdo JSON
- **CSS Variables** - Theming dinâmico
- **CSS Grid & Flexbox** - Layout responsivo

### DevOps

- **Docker** - Containerização (Nginx)
- **Docker Compose** - Orquestração
- **Nginx** - Servidor web de produção

---

## 🚀 Como Executar

### Opção 1: Servidor Local (Python)

```bash
# Python 3
python -m http.server 8000

# Acesse: http://localhost:8000
```

### Opção 2: Servidor Local (Node.js)

```bash
npx http-server -p 8000

# Acesse: http://localhost:8000
```

### Opção 3: Docker (Recomendado)

```bash
# Build e run
docker-compose up -d

# Acesse: http://localhost:8080
```

### Opção 4: Windows Batch Script

```bash
# Execute o arquivo
start-server.bat

# Abrirá automaticamente no navegador
```

---

## 📁 Estrutura do Projeto

```
portfolio/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos (Terminal theme)
├── js/
│   └── app.js              # JavaScript (Interações + Easter eggs)
├── data/
│   └── content.json        # Conteúdo multilingual (PT/EN/ES)
├── assets/
│   ├── icons/
│   │   ├── brasil.svg      # Bandeira BR
│   │   ├── us.svg          # Bandeira US
│   │   └── es.svg          # Bandeira ES
│   ├── images/
│   │   └── mateus.jpeg     # Foto profile
│   └── Mateus Resume.pdf   # CV para download
├── docker-compose.yml      # Docker compose config
├── Dockerfile              # Docker image config
├── nginx.conf              # Nginx configuration
├── start-server.bat        # Windows script
├── DESIGN_GUIDE.md         # Documentação de design
└── README.md               # Este arquivo
```

---

## 🎨 Paleta de Cores

### Dark Theme (Terminal)

| Cor | Hex | Uso |
|-----|-----|-----|
| **Terminal Cyan** | `#00ffff` | Acentos principais, títulos |
| **Terminal Green** | `#00ff88` | Prompts, bullets, success |
| **Terminal Purple** | `#a855f7` | Gradientes, hover effects |
| **Background** | `#0a0a0f` | Fundo principal |
| **Text Primary** | `#e8e8e8` | Texto principal |
| **Text Secondary** | `#a8a8a8` | Texto secundário |

### Glow Effects

- **Accent Glow**: `rgba(0, 255, 255, 0.3)`
- **Shadow Glow**: `0 0 20px rgba(0, 255, 255, 0.15)`

---

## ⚡ Performance

### Métricas Alvo

- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.0s
- **Time to Interactive (TTI)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1

### Otimizações

- Uso de Intersection Observer para lazy animations
- CSS transforms para animações (GPU acceleration)
- Fontes com `display=swap`
- SVG para ícones (escalável e leve)
- Vanilla JS (sem dependências pesadas)

---

## ♿ Acessibilidade

- **WCAG AA** compliance
- **Contraste de cores** adequado (AAA rating)
- **Navegação por teclado** completa
- **Aria labels** em elementos interativos
- **Semantic HTML** (header, nav, main, section, article, footer)
- **prefers-reduced-motion** suportado (desabilita animações)

---

## 📱 Responsividade

### Breakpoints

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: 768px - 1400px
- **Large Desktop**: > 1400px

### Mobile Adaptations

- Layout hero vertical
- Menu hamburguer com backdrop blur
- Cards em coluna única
- Timeline simplificada
- Fontes redimensionadas

---

## 🎮 Easter Eggs

### Terminal Console

**Ativação**: `Ctrl + Shift + K`

**Comandos disponíveis**:

```bash
$ help      # Lista de comandos
$ about     # Sobre mim
$ skills    # Lista de skills
$ contact   # Informações de contato
$ projects  # Projetos destacados
$ clear     # Limpa terminal
$ matrix    # ??? (surpresa)
$ coffee    # ☕ Mensagem divertida
```

### Konami Code

**Sequência**: ↑ ↑ ↓ ↓ ← → ← → B A

**Efeito**: Ativa "Matrix Mode" com animação especial

### Console Logs

Abra o Developer Console (F12) para ver mensagens estilizadas e dicas!

---

## 🔧 Customização

### Alterar Cores

Edite as variáveis CSS em `css/styles.css`:

```css
:root {
  --terminal-cyan: #00ffff;    /* Sua cor */
  --terminal-green: #00ff88;   /* Sua cor */
  /* ... */
}
```

### Alterar Conteúdo

Edite o arquivo `data/content.json`:

```json
{
  "hero": {
    "pt": {
      "name": "Seu Nome",
      "title": "Seu Título"
    }
  }
}
```

### Adicionar Novo Idioma

1. Adicione configuração em `js/app.js`:
```javascript
const LANGUAGES = {
  fr: { flag: 'assets/icons/fr.svg', code: 'FR', ... }
};
```

2. Adicione conteúdo em `data/content.json`:
```json
{
  "hero": {
    "fr": { "name": "...", ... }
  }
}
```

---

## 📝 TODO / Melhorias Futuras

- [ ] PWA (Progressive Web App)
- [ ] Blog section com Markdown support
- [ ] Analytics (Google Analytics / Plausible)
- [ ] Contact form com backend
- [ ] Mais Easter eggs (ASCII art, Matrix rain effect)
- [ ] Modo "Hacker" com mais efeitos terminal
- [ ] Syntax highlighting real em code snippets
- [ ] Testimonials / Recommendations section

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fork o projeto
2. Criar uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abrir um Pull Request

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

**Mateus Morais Silva**

- 💼 Business System Analyst Lead @ CSG International
- 🎓 Pós-graduação em Data Science e IA
- 📍 Brasil
- 🌐 Idiomas: Português (nativo), Inglês (fluente), Espanhol (fluente)

### 📬 Contato

- **Email**: thi.hero2012@gmail.com
- **LinkedIn**: [linkedin.com/in/mhassilvamat](https://www.linkedin.com/in/mhassilvamat/)
- **GitHub**: [github.com/silva-mateus](https://github.com/silva-mateus)

---

## 🌟 Agradecimentos

- **Google Fonts** - JetBrains Mono & Inter
- **Font Awesome** - Ícones
- **Inspirações**: GitHub CLI, Vercel CLI, Railway.app, VS Code

---

## 📊 Stats do Projeto

- **Linhas de código**: ~2500+
- **Arquivos**: 12
- **Idiomas suportados**: 3 (PT, EN, ES)
- **Easter eggs**: 3+
- **Animações**: 15+
- **Seções**: 7

---

## 🔗 Links Úteis

- [Design Guide](DESIGN_GUIDE.md) - Documentação completa de design
- [LinkedIn](https://www.linkedin.com/in/mhassilvamat/) - Perfil profissional
- [GitHub](https://github.com/silva-mateus) - Outros projetos

---

<div align="center">

**Desenvolvido com ❤️ e ☕ por Mateus Silva**

`// Made with HTML, CSS, and JavaScript`

</div>

---

**Última atualização**: Janeiro 2026  
**Versão**: 1.0.0  
**Status**: ✅ Em produção
