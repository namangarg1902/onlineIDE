const express = require("express")
const app = express()
const bodyP = require("body-parser")
const compiler = require("compilex")
const options = { stats: true }
const path = require("path");

compiler.init(options)
app.use(bodyP.json())
const mainfile = path.join(__dirname, "codemirror-5.65.16");
app.use("/codemirror-5.65.16", express.static(mainfile))
app.get("/", function (req, res) {
    compiler.flush(function () {
        console.log("deleted")
    })
    const indexPath = path.join(__dirname, "index.html");
    res.sendFile(indexPath)
})
app.post("/compile", function (req, res) {
    var code = req.body.code
    var input = req.body.input
    var lang = req.body.lang
    try {

        if (lang == "C++") {
            if (!input) {
                var envData = { OS: "linux", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPP(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
            else {
                var envData = { OS: "linux", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
        }
        else if (lang == "Java") {
            if (!input) {
                var envData = { OS: "linux" };
                compiler.compileJava(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                })
            }
            else {
                //if windows  
                var envData = { OS: "linux" };
                //else
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                })
            }
        }
        else if (lang == "Python") {
            if (!input) {
                var envData = { OS: "linux" };
                compiler.compilePython(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
            else {
                var envData = { OS: "linux" };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
        }
    }
    catch (e) {
        console.log(e)
    }
})

app.listen(8000)