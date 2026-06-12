## Como você vai me enviar as fotos

### 📌 Linha do tempo (4 fotos — precisam de ordem)

Renomeie no celular/computador exatamente assim antes de enviar:

```
timeline-1.jpg  →  21/10/2024 — O dia em que nos conhecemos
timeline-2.jpg  →  24/10/2024 — Nosso primeiro beijo
timeline-3.jpg  →  24/12/2024 — O início do nosso amor
timeline-4.jpg  →  12/06/2026 — O pedido oficial
```

Se você não tiver foto de algum momento, é só pular o número (ex.: mandar só 1, 3 e 4) que eu mantenho a foto padrão no espaço vazio.

### 🖼️ Galeria (até ~36 fotos restantes — sem ordem)

Pode renomear como quiser, por exemplo:
```
galeria-01.jpg, galeria-02.jpg, galeria-03.jpg ...
```
Ou simplesmente arrastar todas de uma vez sem renomear — eu coloco na grade em qualquer ordem.

---

## Como enviar

1. Abra o chat aqui.
2. Arraste **todas as fotos juntas** (ou em 2-3 lotes se forem muitas) para dentro da caixa de mensagem.
3. Escreva junto: **"essas são as fotos da linha do tempo e da galeria"**.

Pronto — eu vejo os nomes dos arquivos, faço o upload pro CDN do site e coloco cada uma no lugar certo.

---

## O que eu vou fazer quando chegarem

1. Subir cada foto pro CDN (uma pointer `.asset.json` por imagem).
2. Trocar no código:
   - `TIMELINE[0..3].img` → `timeline-1` até `timeline-4`
   - `GALLERY` → lista nova com as fotos da galeria
3. Manter a foto do coração na capa (como já está).
4. Te mostrar o preview pronto.

### Detalhes técnicos
- Assets ficam em `src/assets/timeline-N.jpg.asset.json` e `src/assets/galeria-NN.jpg.asset.json`.
- Edição centralizada no `src/routes/index.tsx` nas constantes `TIMELINE` e `GALLERY`.

Pode me mandar as fotos quando quiser. 💛