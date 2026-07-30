# Plan: Validación de formulario y bloqueo no-US

## Problema
- El formulario de contacto acepta envíos en blanco o inválidos.
- Se quieren bloquear envíos cuya IP no provenga de Estados Unidos.

## Diagnóstico inicial
- Proyecto Vite + React 19 (frontend estático).
- `package.json` tiene `express` instalado, pero no hay archivo de servidor.
- Faltan `@types/react` y `@types/react-dom`, lo que causa los errores de TypeScript (`Could not find declaration file for module 'react'`, JSX `any`, etc.).
- El formulario actual usa campos no controlados y envía directamente a `import.meta.env.VITE_MAKE_WEBHOOK_URL`.

## Enfoque recomendado
**Opción híbrida: validación en frontend + protección real en backend (Express).**

El bloqueo por IP en el navegador puede evitarse fácilmente (el usuario puede desactivar JS o modificar la petición). Para realmente bloquear IPs no-US, la verificación debe hacerse en el servidor. Como ya tienes `express` en dependencias, agregaré un pequeño `server.ts` que:

1. Sirva los archivos estáticos de producción (`dist/`).
2. Exponga un endpoint `POST /api/contact`.
3. En ese endpoint:
   - Valide nombre, teléfono y ZIP.
   - Consulte la geolocalización de la IP contra `ipapi.co` (gratuito).
   - Si el país no es `US`, rechace el envío con 403.
   - Si pasa, reenvíe los datos al webhook de Make.com.
4. El frontend enviará a `/api/contact` en lugar del webhook directo.

En el frontend también agregaré:
- Campos controlados con validación inline (nombre ≥ 2 caracteres, teléfono ≥ 10 dígitos, ZIP de 5 dígitos US).
- Campo honeypot oculto para detectar bots.
- Mensajes de error traducidos (en/es).
- Indicador de carga y manejo de errores del servidor.

## Archivos a modificar/crear
1. `package.json` — agregar `@types/react`, `@types/react-dom`, y script de inicio del servidor.
2. `src/App.tsx` — refactorizar componente `Contact`, agregar validación, geolocalización cliente (como capa UX), honeypot y nuevas claves de traducción.
3. `server.ts` (nuevo) — servidor Express con validación y bloqueo por IP.
4. `src/vite-env.d.ts` — tipar nuevas variables de entorno si son necesarias.

## Pasos de implementación
1. Instalar tipos de React.
2. Implementar `server.ts` con Express + ipapi.co.
3. Actualizar `Contact` en `App.tsx`:
   - Estado del formulario y errores.
   - Validación en tiempo real y al enviar.
   - Llamada a `/api/contact`.
   - Honeypot.
   - Mensajes de error/bloqueo por país.
4. Actualizar `DICTIONARY` con textos nuevos.
5. Probar build y lint.

## Limitaciones a comunicar
- El chequeo de IP en el navegador es solo una mejora UX; el bloqueo real ocurre en `server.ts`.
- `ipapi.co` gratuito tiene límite de 10,000 peticiones/mes; en producción con tráfico alto conviene usar MaxMind, Cloudflare WAF o un edge function.
- Para desplegar esto se requiere un host que ejecute Node.js (no es suficiente un CDN estático puro).
