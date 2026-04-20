# Cómo conectar cada test con los resultados

## 1. Sube este archivo
Coloca `resultados-test-helper.js` dentro de tu carpeta `assets`.

## 2. Añádelo al HTML del test
Antes de `</body>` mete:

```html
<script type="module" src="../../assets/resultados-test-helper.js"></script>
```

Si el test no está a dos carpetas de `assets`, cambia la ruta.

## 3. Cuando calcules la nota, guarda el resultado
Ejemplo:

```html
<script>
async function entregarExamen() {
  const nota = 8.5;      // tu cálculo real
  const tiempo = 120;    // segundos

  try {
    await window.guardarResultadoTest({
      asignatura: 'TAI',
      test: 'Examen 1',
      nota,
      tiempo
    });
    alert('Resultado guardado correctamente');
  } catch (error) {
    alert(error.message || 'No se pudo guardar el resultado');
  }
}
</script>
```

## 4. Botón típico
```html
<button onclick="entregarExamen()">Entregar examen</button>
```

## 5. Qué guarda
- asignatura
- nombre del test
- nota
- tiempo
- fecha

Tu index ya está preparado para leerlo y mostrar:
- resultados
- historial
- gráfica
- ranking
