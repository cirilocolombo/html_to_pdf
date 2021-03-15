const express = require('express')
const ejs = require('ejs')
const path = require('path')
const pdf = require('html-pdf')
const app = express()

const passengers = [
  {
    name: "Joyce",
    flightNumber: 7859,
    time: "18h00",
  },
  {
    name: "Brock",
    flightNumber: 7859,
    time: "18h00",
  },
  {
    name: "Eve",
    flightNumber: 7859,
    time: "18h00",
  },
]

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'print.ejs')

  ejs.renderFile(filePath, { passengers }, (err, html) => {
    if (err) {
      return res.send('Error reading file')
    }

    const options = {
      height: "11.21in",
      width: "8.5in",
      header: {
        height: "20mm"
      },
      footer: {
        height: "20mm"
      },
    }

    pdf.create(html, options).toFile("report.pdf", (err, data) => {
      if (err) {
        return res.send('Error generating pdf')
      }

      return res.send(html)
    })
  })
})

app.listen(3000)