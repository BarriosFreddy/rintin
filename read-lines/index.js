const readline = require('readline')
const fs = require('fs')
const fs = require('fs')
const path = `${__dirname}/bigfile.csv`
const line = 'This is a line that will be read later. Line by line\n'

const run = async () => {
    for (let i = 0; i < 50000; i++) {
        fs.appendFile(path, line, 'utf8', (err) => {
            if (err) throw err
        })
    }
    const readableStream = fs.createReadStream(path)
    const readLine = readline.createInterface({
        input: readableStream,
        crlfDelay: Infinity
    })
    readLine.once('line', line => {
        console.log(`Line wrote: ${line} \n`)
    })
}

run()
