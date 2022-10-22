import { contentCfg } from '../index.js'

export function addRecipeToDoc (doc, recipe) {
  doc
    .font(contentCfg.header.font)
    .fontSize(contentCfg.header.fontSize)
    .text(`${recipe.header}`, {
      // width: 200,
      height: 100,
      columns: 2,
      continued: true,
      lineGap: 5
    })

  doc
    .font(contentCfg.ingredients.font)
    .fontSize(contentCfg.ingredients.fontSize)
    .text(`\n${recipe.ingredients}`)
}
