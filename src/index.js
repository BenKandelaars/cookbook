import PdfPrinter from 'pdfmake'
import { createWriteStream } from 'fs'

const fonts = {
  Helvetica: {
    normal: 'Helvetica'
  }
}

const printer = new PdfPrinter(fonts)
const docDefinition = {
  pageSize: 'A4',
  pageOrientation: 'portrait',
  pageMargins: [5, 5, 5, 5],
  content: [
    'Heading',
    {
      columns: [
        {
          width: '50%',
          text: 'Left column'
        },
        {
          width: '50%',
          text: 'Right column'
        }
      ]
    }
  ],
  styles: {},
  defaultStyle: {
    font: 'Helvetica',
    columnGap: 20
  }
}

const pdfDoc = printer.createPdfKitDocument(docDefinition)
await new Promise((resolve, reject) => {
  pdfDoc.pipe(createWriteStream('pdf/helloWorld.pdf'))
  pdfDoc.end()
  resolve()
})
