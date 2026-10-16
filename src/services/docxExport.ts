import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  WidthType,
} from 'docx';
import { saveAs } from 'file-saver';
import type { CicloPrograma } from '../types';

export const exportarCicloADocx = async (ciclo: CicloPrograma) => {
  const children: (Paragraph | Table)[] = [];

  // Helper para espaciado
  const espacio = (pts = 200) => new Paragraph({ spacing: { after: pts } });

  // 1. ENCABEZADO PRINCIPAL
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 120, before: 120 },
      children: [
        new TextRun({
          text: ciclo.nombreRama.toUpperCase(),
          bold: true,
          size: 32, // 16pt
          color: '1E293B',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: ciclo.grupoScout,
          size: 24,
          color: '475569',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 140 },
      children: [
        new TextRun({
          text: 'Ciclo de programa',
          bold: true,
          size: 26,
          color: '0F172A',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: ciclo.marcoSimbolico.lemaCiclo || '“Sin lema definido”',
          italics: true,
          bold: true,
          size: 24,
          color: '0369A1',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [
        new TextRun({
          text: ciclo.periodoFechas,
          bold: true,
          size: 22,
          color: '64748B',
        }),
      ],
    })
  );

  // 2. DIAGNÓSTICO
  children.push(
    new Paragraph({
      text: 'Diagnóstico',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 300, after: 180 },
    })
  );

  // Equipo educador
  const textoEducadores = ciclo.equipoEducadores
    .map((e) => `${e.nombre} (${e.rol})`)
    .join(', ');

  children.push(
    new Paragraph({
      spacing: { after: 180 },
      children: [
        new TextRun({
          text: `El equipo dirigente se encuentra conformado por ${textoEducadores || 'sin asignar'}.`,
          size: 22,
        }),
      ],
    })
  );

  // Texto altas/bajas o integrantes
  if (ciclo.diagnostico.altasBajasTexto) {
    children.push(
      new Paragraph({
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: ciclo.diagnostico.altasBajasTexto,
            size: 22,
          }),
        ],
      })
    );
  }

  // TABLA DE PATRULLAS E INTEGRANTES
  if (ciclo.diagnostico.patrullas.length > 0) {
    const numCols = ciclo.diagnostico.patrullas.length;
    const colWidthPct = Math.floor(100 / numCols);

    const tableRows: TableRow[] = [
      // Fila de Cabecera: Nombres de Patrulla
      new TableRow({
        children: ciclo.diagnostico.patrullas.map(
          (p) =>
            new TableCell({
              width: { size: colWidthPct, type: WidthType.PERCENTAGE },
              shading: { fill: 'F1F5F9' },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({ text: p.nombre, bold: true, size: 22 }),
                  ],
                }),
              ],
            })
        ),
      }),
      // Fila de Integrantes
      new TableRow({
        children: ciclo.diagnostico.patrullas.map(
          (p) =>
            new TableCell({
              width: { size: colWidthPct, type: WidthType.PERCENTAGE },
              children: p.integrantes.length
                ? p.integrantes.map(
                    (i) =>
                      new Paragraph({
                        spacing: { after: 60 },
                        children: [
                          new TextRun({
                            text: `${i.nombre} (${i.etapa || 'Pistas'})`,
                            size: 20,
                          }),
                        ],
                      })
                  )
                : [new Paragraph({ text: '-' })],
            })
        ),
      }),
    ];

    children.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: tableRows,
      }),
      espacio(180)
    );
  }

  // Acompañamiento / Inclusión
  if (ciclo.diagnostico.necesidadesInclusion) {
    children.push(
      new Paragraph({
        spacing: { after: 160 },
        children: [
          new TextRun({
            text: ciclo.diagnostico.necesidadesInclusion,
            size: 22,
          }),
        ],
      })
    );
  }

  // Observaciones grupales
  if (ciclo.diagnostico.observacionesGrupales) {
    children.push(
      new Paragraph({
        spacing: { after: 240 },
        children: [
          new TextRun({
            text: ciclo.diagnostico.observacionesGrupales,
            size: 22,
          }),
        ],
      })
    );
  }

  // 3. MARCO SIMBÓLICO
  children.push(
    new Paragraph({
      text: 'Marco simbólico',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 300, after: 180 },
    }),
    new Paragraph({
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: 'SINOPSIS:',
          bold: true,
          size: 22,
        }),
      ],
    })
  );

  // Dividir sinopsis por párrafos si viene con saltos de línea
  const lineasSinopsis = ciclo.marcoSimbolico.sinopsis.split('\n');
  lineasSinopsis.forEach((p) => {
    if (p.trim()) {
      children.push(
        new Paragraph({
          spacing: { after: 140 },
          children: [new TextRun({ text: p, size: 22 })],
        })
      );
    }
  });

  if (ciclo.marcoSimbolico.analogiaLeyPromesa) {
    const lineasAnalogia = ciclo.marcoSimbolico.analogiaLeyPromesa.split('\n');
    lineasAnalogia.forEach((p) => {
      if (p.trim()) {
        children.push(
          new Paragraph({
            spacing: { after: 140 },
            children: [new TextRun({ text: p, size: 22 })],
          })
        );
      }
    });
  }

  // 4. OBJETIVOS DEL CICLO
  children.push(
    new Paragraph({
      text: 'Objetivos del ciclo de programa',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 320, after: 180 },
    })
  );

  ciclo.objetivos.forEach((obj) => {
    children.push(
      new Paragraph({
        spacing: { before: 120, after: 60 },
        children: [
          new TextRun({
            text: `Área ${obj.area}`,
            bold: true,
            size: 22,
            color: '0369A1',
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 140 },
        children: [
          new TextRun({
            text: `${obj.numeroCodigo}) ${obj.enunciadoOficial}: `,
            bold: true,
            size: 21,
          }),
          new TextRun({
            text: obj.metaEspecifica,
            size: 21,
          }),
        ],
      })
    );
  });

  // 5. CALENDARIO RESUMEN (Para dirigentes)
  children.push(
    new Paragraph({
      text: 'Calendario (Solo informativo para dirigentes)',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 340, after: 180 },
    })
  );

  const filasCalendario: TableRow[] = [
    new TableRow({
      children: [
        new TableCell({
          width: { size: 25, type: WidthType.PERCENTAGE },
          shading: { fill: '0284C7' },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: 'Fecha', bold: true, color: 'FFFFFF', size: 22 })],
            }),
          ],
        }),
        new TableCell({
          width: { size: 75, type: WidthType.PERCENTAGE },
          shading: { fill: '0284C7' },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: 'Actividad', bold: true, color: 'FFFFFF', size: 22 })],
            }),
          ],
        }),
      ],
    }),
    ...ciclo.jornadas.map((j) => {
      const celdaActividad = j.sinActividad
        ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: j.motivoSinActividad || j.resumenActividad,
                  bold: true,
                  color: 'DC2626',
                  size: 21,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'NO HAY ACTIVIDAD',
                  bold: true,
                  color: '991B1B',
                  size: 20,
                }),
              ],
            }),
          ]
        : [
            new Paragraph({
              children: [new TextRun({ text: j.resumenActividad || 'Actividad habitual', size: 21 })],
            }),
          ];

      return new TableRow({
        children: [
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: j.fecha, bold: true, size: 21 })],
              }),
            ],
          }),
          new TableCell({
            width: { size: 75, type: WidthType.PERCENTAGE },
            children: celdaActividad,
          }),
        ],
      });
    }),
  ];

  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: filasCalendario,
    }),
    espacio(240)
  );

  // 6. CALENDARIZACIÓN DETALLADA DE ACTIVIDADES
  children.push(
    new Paragraph({
      text: 'Calendarización de actividades',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 340, after: 200 },
    })
  );

  ciclo.jornadas.forEach((j) => {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 120 },
        children: [
          new TextRun({
            text: `Día ${j.fecha}`,
            bold: true,
            size: 24,
            color: '0369A1',
          }),
        ],
      })
    );

    if (j.sinActividad) {
      children.push(
        new Paragraph({
          spacing: { after: 140 },
          children: [
            new TextRun({
              text: `${j.motivoSinActividad || j.resumenActividad} (Día sin actividad)`,
              italics: true,
              color: '64748B',
              size: 22,
            }),
          ],
        })
      );
    } else if (j.actividades.length === 0) {
      children.push(
        new Paragraph({
          spacing: { after: 140 },
          children: [
            new TextRun({
              text: j.resumenActividad || 'Reunión ordinaria de rama.',
              size: 22,
            }),
          ],
        })
      );
    } else {
      j.actividades.forEach((act) => {
        children.push(
          new Paragraph({
            spacing: { before: 120, after: 60 },
            children: [
              new TextRun({
                text: `Actividad: ${act.nombre}`,
                bold: true,
                size: 22,
              }),
            ],
          })
        );

        if (act.motivacion) {
          children.push(
            new Paragraph({
              spacing: { after: 80 },
              children: [
                new TextRun({ text: 'Motivación: ', bold: true, size: 21 }),
                new TextRun({ text: act.motivacion, size: 21 }),
              ],
            })
          );
        }

        children.push(
          new Paragraph({
            spacing: { after: 80 },
            children: [
              new TextRun({ text: 'Desarrollo: ', bold: true, size: 21 }),
              new TextRun({ text: act.desarrollo, size: 21 }),
            ],
          }),
          new Paragraph({
            spacing: { after: 160 },
            children: [
              new TextRun({ text: 'Materiales: ', bold: true, size: 21 }),
              new TextRun({ text: act.materiales || 'Ninguno', size: 21 }),
            ],
          })
        );
      });
    }
  });

  // 7. ANEXOS
  if (ciclo.anexos && ciclo.anexos.length > 0) {
    children.push(
      new Paragraph({
        text: 'Anexo',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 360, after: 200 },
      })
    );

    ciclo.anexos.forEach((anexo) => {
      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 180, after: 100 },
          children: [
            new TextRun({
              text: anexo.titulo,
              bold: true,
              size: 24,
            }),
          ],
        })
      );

      if (anexo.objetivo) {
        children.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({ text: 'Objetivo: ', bold: true, size: 21 }),
              new TextRun({ text: anexo.objetivo, size: 21 }),
            ],
          })
        );
      }

      if (anexo.edadRecomendada) {
        children.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({ text: 'Edad recomendada: ', bold: true, size: 21 }),
              new TextRun({ text: anexo.edadRecomendada, size: 21 }),
            ],
          })
        );
      }

      if (anexo.jugadores) {
        children.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({ text: 'Jugadores: ', bold: true, size: 21 }),
              new TextRun({ text: anexo.jugadores, size: 21 }),
            ],
          })
        );
      }

      if (anexo.materiales) {
        children.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({ text: 'Materiales: ', bold: true, size: 21 }),
              new TextRun({ text: anexo.materiales, size: 21 }),
            ],
          })
        );
      }

      if (anexo.reglas) {
        children.push(
          new Paragraph({
            spacing: { after: 140 },
            children: [
              new TextRun({ text: 'Reglas básicas: ', bold: true, size: 21 }),
              new TextRun({ text: anexo.reglas, size: 21 }),
            ],
          })
        );
      }

      if (anexo.tarjetas && anexo.tarjetas.length > 0) {
        children.push(
          new Paragraph({
            spacing: { before: 140, after: 100 },
            children: [
              new TextRun({
                text: 'TARJETAS DE SITUACIÓN',
                bold: true,
                size: 22,
                color: '0369A1',
              }),
            ],
          })
        );

        anexo.tarjetas.forEach((t, idx) => {
          children.push(
            new Paragraph({
              spacing: { before: 100, after: 40 },
              children: [
                new TextRun({
                  text: `Tarjeta ${idx + 1}:`,
                  bold: true,
                  size: 21,
                }),
              ],
            }),
            new Paragraph({
              spacing: { after: 40 },
              children: [
                new TextRun({ text: 'Situación: ', bold: true, size: 20 }),
                new TextRun({ text: t.situacion, size: 20 }),
              ],
            }),
            new Paragraph({
              spacing: { after: 100 },
              children: [
                new TextRun({ text: 'Respuesta sugerida: ', bold: true, italics: true, size: 20 }),
                new TextRun({ text: t.respuestaSugerida, italics: true, size: 20 }),
              ],
            })
          );
        });
      }
    });
  }

  // Empaquetar y descargar
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 pulgada = 1440 twips
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const nombreLimpio = ciclo.nombreRama.replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `Ciclo_de_Programa_${nombreLimpio}_${ciclo.ano}.docx`;
  saveAs(blob, filename);
};
