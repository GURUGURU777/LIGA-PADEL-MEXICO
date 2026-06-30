# Liga Pádel México — Video (Remotion)

Genera videos verticales (1080×1920) data-driven para redes: resultados, tabla, pareja de la jornada y recap de temporada. Misma identidad que la app.

## Correr
```bash
cd video
npm install
npm run studio      # previsualiza y edita en el navegador
```

## Renderizar (MP4)
```bash
npm run render:resultado   # out/resultado.mp4
npm run render:tabla       # out/tabla.mp4
npm run render:pareja      # out/pareja.mp4
npm run render:recap       # out/recap.mp4
```

## Datos por partido
Cada composición recibe props. Para renderizar un partido específico, pásale los datos:
```bash
npx remotion render src/index.ts Resultado out/halcones-vs-tiburones.mp4 \
  --props='{"jornada":6,"sponsor":"OXXO","home":{"name":"Los Halcones","code":"LHA","color":"#EFA127"},"away":{"name":"Tiburones","code":"TIB","color":"#3B8EE0"},"scoreHome":2,"scoreAway":0,"detail":"6-3 · 6-4"}'
```

## Automatización (siguiente paso)
Cuando un resultado se confirma en la app, n8n puede disparar `remotion render` con los props del partido y publicar el MP4 en Instagram/TikTok automáticamente. Cada video lleva el patrocinador horneado.

Compositions: `src/compositions/`. Tema y colores: `src/theme.ts`. Datos demo: `src/data.ts`.
