# Controle de Cartão

App web para celular que controla os gastos do cartão de crédito: lançamentos, parcelas por fatura, divisão por pessoa e gastos por categoria. Feito a partir da planilha *Cartão – Controle de Gastos*.

**Endereço:** https://victorhugodiogo.github.io/controle-cartao/

## Telas

- **Lançamentos**: escolha o mês da fatura, veja o total e as parcelas do mês, busque e filtre por pessoa. O botão **Novo** cadastra uma compra (à vista ou parcelada).
- **Resumo**: divisão da fatura por pessoa, gastos por categoria, evolução de 12 meses e conferência rápida.
- **Configurações**: dia de fechamento da fatura, quem é "você", listas de pessoas/categorias/tipos, importar e exportar planilha (.xlsx).

## Primeiro uso

1. Abra o endereço acima no Chrome (Android) ou Safari (iPhone).
2. Toque em **Importar planilha (.xlsx)** e escolha a planilha de controle (aba *Lançamentos*).
3. Para instalar: menu do navegador → **Instalar app** / **Adicionar à tela inicial**.

## Onde ficam os dados

Os dados ficam salvos **no navegador do aparelho** (localStorage). Eles não vão para o GitHub nem para servidor nenhum, e não aparecem automaticamente em outro aparelho.

- Faça backup em **Configurações → Exportar planilha (.xlsx)**.
- Para levar os dados a outro aparelho, exporte num e importe no outro.
- Limpar os dados do navegador apaga os lançamentos: exporte antes.

> Planilhas (`*.xlsx`) e a pasta `web/data/` estão no `.gitignore` para que dados pessoais nunca sejam enviados ao repositório público.

## Estrutura

```
web/                      site publicado no GitHub Pages
├── index.html            app completo (HTML, CSS e JS num arquivo)
├── manifest.webmanifest  instalação como app (PWA)
├── sw.js                 modo offline
└── icons/
.github/workflows/site.yml  copia web/ para a branch gh-pages a cada alteração na main
```

## Publicação

Qualquer alteração em `web/` na branch `main` é copiada sozinha para a branch `gh-pages` pela aba **Actions** (*Publicar site (GitHub Pages)*), e o GitHub Pages publica essa branch. Na primeira vez é preciso ligar o Pages em **Settings → Pages → Source: Deploy from a branch → Branch: `gh-pages` / `(root)` → Save**.
