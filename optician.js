const Jimp = require('jimp')

const mask = new Jimp(150, 150, 0xFF0000FF)

Jimp.read('./base-images/a.jpg').then((image) => {
  return image.composite(mask, 180, 90).write('./a_masked.jpg')
}).then((a) => {
  return Jimp.read('./base-images/b.jpg').then((image) => {
    image.composite(mask, 180, 90).write('./b_masked.jpg')

    const diff = Jimp.diff(a, image, 0.1)
    console.log(diff.percent)

    diff.image.write('./diff.jpg')
  })
})
