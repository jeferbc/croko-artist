import FormatPicker from './FormatPicker';

export default function Formats() {
  return (
    <section id="formatos" className="section">
      <div className="container">
        <h2 className="section-title">Formatos y precios</h2>
        <p className="section-lead">Tres tamaños, la misma técnica. Elige uno para verlo a escala en la pared.</p>
        <FormatPicker />
      </div>
    </section>
  );
}
