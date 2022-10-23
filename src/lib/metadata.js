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
      reference: {
        width: recipe.reference.map(r => doc.widthOfString(r))
      },
      ingredients: {
        width: doc.widthOfString(recipe.ingredients)
      }
    }
  }
}

export function getPageMeta (doc, docCfg) {
  console.log('page width: ', doc.page.width)

  return {
    ...docCfg,
    columns: extraDocCfg.columns,
    pageWidth: doc.page.width,
    columnWidth:
      (doc.page.width -
        docCfg.margin * 2 -
        extraDocCfg.columnGap * (extraDocCfg.columns - 1)) /
      extraDocCfg.columns
  }
}
