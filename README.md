# Portfólio - Mateus Morais Silva

Portfólio profissional one-page com conteúdo dinâmico via JSON. Desenvolvido com HTML5, CSS3 e JavaScript puro.

## 🚀 Início Rápido

### Windows
```bash
start-server.bat
```

### macOS/Linux
```bash
python3 -m http.server 8000
# Acesse: http://localhost:8000
```

## ✏️ Personalização

### Editar Conteúdo
Todo o conteúdo está em um único arquivo JSON:

```
data/content.json
```

Edite diretamente:
- Informações pessoais
- Skills e níveis
- Experiências profissionais
- Projetos
- Links (GitHub, LinkedIn)
- Traduções PT/EN

### Alterar Cores
Edite `css/styles.css`:

```css
:root {
    --accent-primary: #4a90e2;
    --bg-primary: #0a0e27;
}
```

### Adicionar Imagens
Coloque seus arquivos em:
```
assets/images/
```

## 📂 Estrutura

```
portifolio/
├── index.html              # Página principal
├── data/
│   └── content.json       # Conteúdo do site (EDITE AQUI!)
├── css/
│   └── styles.css         # Estilos
├── js/
│   └── app.js             # Lógica da aplicação
└── assets/                # Imagens e recursos
```

## 🎯 Features

- ✅ Conteúdo dinâmico via JSON
- ✅ Navegação gerada automaticamente
- ✅ Dark/Light mode
- ✅ Bilíngue (PT/EN)
- ✅ 100% Responsivo
- ✅ SEO otimizado
- ✅ Zero dependências

## 🚀 Deploy

### GitHub Pages
1. Push para GitHub
2. Settings → Pages → Source: main branch
3. Aguarde deploy (1-2 minutos)

## ⚠️ Importante

Este portfólio **requer servidor HTTP** para funcionar (fetch do JSON).

**NÃO** abra o `index.html` diretamente pelo explorador de arquivos.

## 🔧 Tecnologias

- HTML5 (Semântico)
- CSS3 (Variables, Flexbox, Grid)
- JavaScript ES5+ (Sem módulos, sem frameworks)
- Google Fonts (Inter)

## 📝 Licença

MIT - Use livremente para seu portfólio pessoal.

---

**Mateus Morais Silva** © 2026
