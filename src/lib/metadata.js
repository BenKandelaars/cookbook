import PDFDocument from 'pdfkit'

import { docCfg, contentCfg, extraDocCfg } from '../index.js'
export function addMetadata (doc, recipe) {
  const headerDoc = new PDFDocument(docCfg)
  headerDoc.font(contentCfg.header.font).fontSize(contentCfg.header.fontSize)

  return {
    ...recipe,
    metadata: {
      header: {
        width: headerDoc.widthOfString(recipe.header),
        height: headerDoc.heightOfString(recipe.header)
      },
      ingredients: {
        width: doc.widthOfString(recipe.ingredients)
      }
    }
  }
}

export function getPageMeta (doc, docCfg) {
  return {
    ...docCfg,
    columns: extraDocCfg.columns,
    pageWidth: doc.page.width,
    columnWidth: (doc.page.width - docCfg.margin * 2) / extraDocCfg.columns
  }
}
