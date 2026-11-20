from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas


OUTPUT = Path(__file__).resolve().parents[1] / "public" / "semana-15" / "lista-rh.pdf"
REHEARSAL_URL = "https://week-15-primer-peldano.vercel.app/#ensayo"
SOURCE_URL = "https://supportcenter.occ.com.mx/hc/es/articles/41245639854737-Publica-tu-primera-vacante-en-OCC"
NAVY, TEAL, PAPER, AMBER = map(HexColor, ("#102D3F", "#0E625B", "#F5F0E6", "#EED8A7"))

CHECKLIST = (
    ("Calidad · Definan un criterio observable",
     "¿Qué debe describir la persona y cómo sabrá Calidad si hay evidencia suficiente?"),
    ("RR. HH. · Acuerden qué evidencia se puede recibir",
     "Ofrezcan una descripción propia o una bitácora con permiso y sin datos identificables."),
    ("RR. HH. · Decidan quién canaliza el caso",
     "Elijan a quien lo enviará a Calidad antes del filtro habitual de CV."),
    ("Calidad · Confirmen quién responde y cuándo",
     "La persona revisora explica su respuesta con el mismo criterio y en la fecha acordada."),
)


def draw():
    pdf = canvas.Canvas(str(OUTPUT), pagesize=letter, invariant=True)
    pdf.setTitle("Lista para RR. HH. | Primer Peldaño")
    pdf.setAuthor("Primer Peldaño")
    pdf.setFillColor(NAVY)
    pdf.setFont("Times-Bold", 19)
    pdf.drawString(48, 742, "Primer Peldaño")
    pdf.setStrokeColor(NAVY)
    pdf.line(48, 724, 564, 724)
    pdf.setFillColor(TEAL)
    pdf.setFont("Helvetica-Bold", 10)
    pdf.drawString(48, 697, "ANTES DE PUBLICAR")
    pdf.setFillColor(NAVY)
    pdf.setFont("Times-Bold", 39)
    pdf.drawString(46, 653, "Lista para RR. HH.")
    pdf.setFont("Helvetica", 13)
    pdf.drawString(48, 623, "Acuerden con Calidad cómo se revisará la evidencia para una vacante.")
    pdf.drawString(48, 604, "Úsenla antes de cerrar los filtros de la publicación.")

    for index, (heading, instruction) in enumerate(CHECKLIST):
        y = 568 - index * 65
        pdf.setStrokeColor(TEAL)
        pdf.rect(50, y - 2, 13, 13, stroke=1, fill=0)
        pdf.setFillColor(NAVY)
        pdf.setFont("Helvetica-Bold", 12)
        pdf.drawString(78, y, heading)
        pdf.setFont("Helvetica", 10.7)
        pdf.drawString(78, y - 18, instruction)
        pdf.setStrokeColor(HexColor("#CBC3B4"))
        pdf.line(78, y - 31, 564, y - 31)

    pdf.setFillColor(PAPER)
    pdf.rect(48, 213, 516, 92, stroke=0, fill=1)
    pdf.setFillColor(AMBER)
    pdf.rect(48, 213, 5, 92, stroke=0, fill=1)
    pdf.setFillColor(NAVY)
    pdf.setFont("Helvetica-Bold", 10)
    pdf.drawString(62, 285, "EJEMPLO FICTICIO · CONTROL DE CALIDAD TEXTIL, SEGUNDO TURNO")
    pdf.setFont("Helvetica", 11)
    pdf.drawString(62, 265, "RR. HH. canaliza una descripción de una costura abierta. La jefatura")
    pdf.drawString(62, 249, "de calidad responde en dos días hábiles y pide explicar qué se revisó")
    pdf.drawString(62, 233, "en la siguiente muestra para confirmar el resultado.")

    pdf.setFillColor(TEAL)
    pdf.roundRect(48, 144, 203, 41, 3, stroke=0, fill=1)
    pdf.setFillColor(HexColor("#FFFFFF"))
    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(61, 160, "Ensayar el acuerdo")
    pdf.linkURL(REHEARSAL_URL, (48, 144, 251, 185), relative=0)
    pdf.setFillColor(NAVY)
    pdf.setFont("Helvetica", 10)
    pdf.drawString(48, 124, REHEARSAL_URL)
    pdf.linkURL(REHEARSAL_URL, (48, 120, 308, 137), relative=0)

    pdf.setStrokeColor(HexColor("#CBC3B4"))
    pdf.line(48, 92, 564, 92)
    pdf.setFont("Helvetica", 9)
    pdf.drawString(48, 73, "Fuente sobre el flujo de publicación: OCC, “Publica tu primera vacante en OCC”.")
    pdf.linkURL(SOURCE_URL, (48, 68, 422, 84), relative=0)
    pdf.showPage()
    pdf.save()


if __name__ == "__main__":
    draw()
