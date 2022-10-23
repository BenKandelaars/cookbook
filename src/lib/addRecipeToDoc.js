import { contentCfg, extraDocCfg, pageMeta } from '../index.js'

export function addRecipeToDoc (doc, recipe) {
  doc.text('', {
    columns: extraDocCfg.columns,
    columnGap: extraDocCfg.columnGap,
    height: 150,
    continued: true
  })

  // Header
  doc
    .font(contentCfg.header.font)
    .fontSize(contentCfg.header.fontSize)
    .text(padLine(doc, recipe.header), {
      continued: true
    })

  bottomMargin(doc, 2)

  // Recipe source references
  const formattedReferences = recipe.reference[0]
  doc
    .font(contentCfg.reference.font)
    .fontSize(contentCfg.reference.fontSize)
    .text(padLine(doc, formattedReferences), {
      continued: true
    })

  bottomMargin(doc, 5)

  // Ingredients
  const formattedIngredients = recipe.ingredients.join(', ')
  doc
    .font(contentCfg.ingredients.font)
    .fontSize(contentCfg.ingredients.fontSize)
    .text(`I9s: ${formattedIngredients}`, {
      continued: true
    })
}

// Helpers
function padLine (doc, text) {
  const textWidth = doc.widthOfString(text)
  const emptySpaceWidth = doc.widthOfString(' ')
  const remainingSpaceInLine =
    pageMeta.columnWidth - (textWidth % pageMeta.columnWidth)
  const spacesToFillRow = Math.floor(remainingSpaceInLine / emptySpaceWidth)

  return `${text}${' '.repeat(spacesToFillRow)}`
}

function bottomMargin (doc, points) {
  doc.font('Helvetica').fontSize(2)

  for (let i = 0; i < points; i++) {
    doc.moveDown()
  }

  doc.fontSize(14)
}
