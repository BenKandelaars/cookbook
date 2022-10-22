// import PdfPrinter from 'pdfmake'
import PDFDocument from 'pdfkit'
import { createWriteStream } from 'fs'
import { addMetadata, getPageMeta } from './lib/metadata.js'
import { addRecipeToDoc } from './lib/addRecipeToDoc.js'

let recipe = {
  header: 'Carrot soup',
  ingredients: ['hello lorum', 'world', 'second ', 'third'].join(', ')
}

// TODO: split config into separate page
export const docCfg = {
  size: 'A4',
  margin: 10
}

export const extraDocCfg = {
  columns: 2 // TODO: this is really config
}

export const contentCfg = {
  section: {
    font: 'Helvetica',
    fontSize: 30
  },
  header: {
    font: 'Helvetica',
    fontSize: 18
  },
  ingredients: {
    font: 'Helvetica',
    fontSize: 14
  }
}

const doc = new PDFDocument(docCfg)
doc.pipe(createWriteStream('pdf/pdfkit.pdf'))

const pageMeta = getPageMeta(doc, docCfg)
recipe = addMetadata(doc, recipe)

console.log(recipe)
console.log(pageMeta)

doc
  .font(contentCfg.section.font)
  .fontSize(contentCfg.section.fontSize)
  .text(`Section Header`)

addRecipeToDoc(doc, recipe)

doc.end()
