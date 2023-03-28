import { Vehicle } from "../models/vehicle.model.js"
import fs from "fs-extra"
import csv from "csvtojson"

export const create = (req, res) => {
  // upload csv file
  const __dirname =
    "C:\\Users\\zln\\Desktop\\m.shamsi\\test projects\\sequelize-mysql"
  var fstream

  req.pipe(req.busboy)
  req.busboy.on("file", function (fieldname, file, filename) {
    const _fileName = filename["filename"].split(".")[0]
    const _fileType = filename["filename"].split(".")[1]
    const _fileMimeType = filename["mimeType"].replace("/", "-")

    fstream = fs.createWriteStream(
      __dirname +
        "/uploadedFiles/" +
        _fileMimeType +
        "/input/" +
        _fileName +
        "." +
        _fileType
    )

    file.pipe(fstream)
    fstream.on("close", function () {
      console.log("Upload Finished of " + _fileName + "." + _fileType)

      // convert to json
      csv()
        .fromFile(
          __dirname +
            "/uploadedFiles/" +
            _fileMimeType +
            "/input/" +
            _fileName +
            "." +
            _fileType
        )
        .then(async (data) => {
          const response = []
          const maxRecords = data.length > 3 ? 3 : data.length
          for (const record of data.slice(0, maxRecords)) {
            const res = await Vehicle.create({
              year: record.year,
              make: record.make,
              model: record.model,
              trim: record.trim,
              body: record.body,
            })
            response.push(res)
          }

          res.send(response)
        })
    })
  })
}

export const findAll = async (req, res) => {
  const resu = await Vehicle.findAll()
  res.send(resu)
}
