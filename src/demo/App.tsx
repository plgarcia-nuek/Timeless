import { Badge, BADGE_ESTADOS } from '../components/badge';
import styles from './App.module.css';

export function App() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>Timeless · Data Display</p>
        <h1 className={styles.title}>badge</h1>
        <p className={styles.lede}>
          Cinco celdas vivas de Figma (<code>1783:242</code>). Tema Dark
          nativo. Propiedad <code>Estado</code> en el vocabulario del
          archivo.
        </p>
      </header>

      <section className={styles.row} aria-label="Variantes de badge">
        {BADGE_ESTADOS.map((estado) => (
          <Badge key={estado} estado={estado} />
        ))}
      </section>
    </main>
  );
}
