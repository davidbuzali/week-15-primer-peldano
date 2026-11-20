"""Render the Week 15 submission packet and persona record.

A local rollout file may optionally be supplied to export the original conversation.
"""

import argparse
from datetime import datetime
from html import escape
import json
from pathlib import Path
import re
from zoneinfo import ZoneInfo

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Image, KeepTogether, Paragraph, SimpleDocTemplate, Table, TableStyle

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "output" / "pdf" / "week15"
NAVY = colors.HexColor("#102D3F")
TEAL = colors.HexColor("#0E625B")
PALE = colors.HexColor("#F5F0E6")
LINE = colors.HexColor("#D0C7B8")

fonts = Path("/System/Library/Fonts/Supplemental")
if (fonts / "Arial.ttf").exists():
    pdfmetrics.registerFont(TTFont("Body", str(fonts / "Arial.ttf")))
    pdfmetrics.registerFont(TTFont("BodyBold", str(fonts / "Arial Bold.ttf")))
    pdfmetrics.registerFont(TTFont("Display", str(fonts / "Georgia Bold.ttf")))
    pdfmetrics.registerFontFamily("Body", normal="Body", bold="BodyBold", italic="Body", boldItalic="BodyBold")
    BODY, BOLD, DISPLAY = "Body", "BodyBold", "Display"
else:
    BODY, BOLD, DISPLAY = "Helvetica", "Helvetica-Bold", "Times-Bold"

styles = {
    "title": ParagraphStyle("title", fontName=DISPLAY, fontSize=28, leading=32, textColor=NAVY, spaceAfter=12),
    "heading": ParagraphStyle("heading", fontName=DISPLAY, fontSize=16, leading=19, textColor=NAVY, spaceBefore=13, spaceAfter=7, keepWithNext=True),
    "body": ParagraphStyle("body", fontName=BODY, fontSize=10.2, leading=14.3, textColor=NAVY, spaceAfter=8, alignment=TA_LEFT),
    "transcript": ParagraphStyle("transcript", fontName=BODY, fontSize=10.2, leading=13.7, textColor=NAVY, spaceAfter=5),
    "speaker": ParagraphStyle("speaker", fontName=BOLD, fontSize=9, leading=12, textColor=TEAL, spaceBefore=8, spaceAfter=3, keepWithNext=True),
    "cell": ParagraphStyle("cell", fontName=BODY, fontSize=9, leading=12, textColor=NAVY),
    "header": ParagraphStyle("header", fontName=BOLD, fontSize=9, leading=12, textColor=colors.white),
}


def inline(value):
    text = escape(value)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", text)
    return re.sub(r'\[([^\]]+)\]\((https?://[^ )]+)\)', r'<a href="\2" color="#0E625B"><u>\1</u></a>', text)


def table(rows, widths=None):
    cells = [
        [Paragraph(inline(value), styles["header" if idx == 0 else "cell"]) for value in row]
        for idx, row in enumerate(rows)
    ]
    result = Table(cells, colWidths=widths or [512 / len(cells[0])] * len(cells[0]), repeatRows=1)
    result.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), TEAL),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [PALE, colors.white]),
        ("LINEBELOW", (0, 1), (-1, -1), 0.35, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
    ]))
    result.spaceAfter = 9
    return result


def flow():
    rows = [
        ["Actor", "Sequence"],
        ["Author and reviewer", "Research → write and produce → check claims and style → David approves outreach."],
        ["RR. HH. and quality lead", "Open a piece → rehearse → agree on a real criterion and date → route an eligible case → respond on time."],
        ["Measurement", "Record channel and staff time → verify the handoff and response → count one adoption per vacancy."],
    ]
    return KeepTogether([Paragraph("From source to verified use", styles["heading"]), table(rows, [132, 380])])


def markdown(path):
    items = []
    pending_table = []
    in_flow = False
    for raw in path.read_text().splitlines():
        line = raw.strip()
        if line.startswith("```"):
            if line == "```mermaid":
                items.append(flow())
            in_flow = not in_flow
            continue
        if in_flow:
            continue
        if line.startswith("|"):
            cells = [value.strip() for value in line.strip("|").split("|")]
            if not all(re.fullmatch(r"[-: ]+", cell) for cell in cells):
                pending_table.append(cells)
            continue
        if pending_table:
            items.append(table(pending_table, [120, 392] if path.stem == "PERSONA" else None))
            pending_table = []
        if line.startswith("# "):
            items.append(Paragraph(inline(line[2:]), styles["title"]))
        elif line.startswith("## "):
            items.append(Paragraph(inline(line[3:]), styles["heading"]))
        elif line.startswith("!["):
            match = re.fullmatch(r"!\[([^\]]+)\]\(([^)]+)\)", line)
            label, source = match.groups()
            image = Image(str(path.parent / source), width=512, height=341)
            image.spaceAfter = 5
            items.append(KeepTogether([image, Paragraph(inline(label), styles["body"])]))
        elif line:
            line = line.removeprefix("> ")
            if line.startswith("- "):
                line = "• " + line[2:]
            items.append(Paragraph(inline(line), styles["body"]))
    if pending_table:
        items.append(table(pending_table, [120, 392] if path.stem == "PERSONA" else None))
    return items


def build(items, destination, label):
    def decorate(page, document):
        page.setStrokeColor(LINE)
        page.line(44, 748, 568, 748)
        page.line(44, 43, 568, 43)
        page.setFillColor(TEAL)
        page.setFont(BOLD, 9)
        page.drawString(44, 759, "PRIMER PELDAÑO  /  WEEK 15")
        page.setFillColor(NAVY)
        page.setFont(BODY, 8)
        page.drawString(44, 30, label)
        page.drawRightString(568, 30, str(document.page))

    document = SimpleDocTemplate(
        str(destination), pagesize=letter, leftMargin=44, rightMargin=44,
        topMargin=56, bottomMargin=56, title=label, author="David Buzali",
    )
    document.build(items, onFirstPage=decorate, onLaterPages=decorate)


def conversation(rollout):
    records = [json.loads(line) for line in rollout.read_text().splitlines()]
    items = [
        Paragraph("Original build conversation", styles["title"]),
        Paragraph("David Buzali · Primer Peldaño · Week 15 Business Bending", styles["body"]),
        Paragraph("Verbatim user and assistant messages through export, in Mexico City time. Interface controls, internal instructions and tool logs are omitted.", styles["body"]),
    ]
    for record in records:
        event = record.get("payload", {})
        role = event.get("role")
        if event.get("type") != "message" or role not in ("user", "assistant"):
            continue
        text = "\n".join(part.get("text", "") for part in event.get("content", []))
        if not text.strip() or text.startswith("<environment_context>"):
            continue
        stamp = datetime.fromisoformat(record["timestamp"]).astimezone(ZoneInfo("America/Mexico_City"))
        speaker = "David Buzali" if role == "user" else "Assistant"
        items.append(Paragraph(f"{speaker}  ·  {stamp:%d %b %Y %H:%M:%S}", styles["speaker"]))
        if text.startswith("<send_user_message_question_reply>"):
            entries = json.loads(text.splitlines()[1])
            for entry in entries:
                items.append(Paragraph(escape(entry["question"]), styles["transcript"]))
                items.append(Paragraph(escape(entry["answer"]), styles["transcript"]))
        else:
            for block in text.strip().split("\n\n"):
                items.append(Paragraph(escape(block).replace("\n", "<br/>"), styles["transcript"]))
    return items


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--conversation", type=Path)
    args = parser.parse_args()
    DEST.mkdir(parents=True, exist_ok=True)
    build(markdown(ROOT / "docs" / "PACKET.md"), DEST / "PACKET_David_Buzali.pdf", "Build packet · David Buzali")
    build(markdown(ROOT / "docs" / "PERSONA.md"), DEST / "PERSONA_David_Buzali.pdf", "Persona test · David Buzali")
    if args.conversation:
        build(conversation(args.conversation), DEST / "BUILDCHAT_David_Buzali.pdf", "Original build conversation · David Buzali")
