const request = require('request');
const cheerio = require('cheerio');

function search(keyword) {
    return new Promise((resolve, reject) => {
        request({
            "url": "https://www.cargurus.com/Cars/getCarPickerReferenceDataAJAX.action?forPriceAnalysis=false&showInactive=false&newCarsOnly=false&useInventoryService=true&quotableCarsOnly=false&carsWithRegressionOnly=false&localeCountryCarsOnly=true",
            "method": "GET"
        }, (err, res, body) => {
            let json;
            try {
                json = JSON.parse(body);
            } catch(e) { }
            let models = [];
            for (var i = 0; i < Object.keys(json.allMakerModels).length; i++) {
                let object = Object.values(json.allMakerModels)[i]
                if (object.popular) {
                    object.popular.map(item => {
                    //console.log(`${item.modelName} ${item.modelId} `)
                        models.push({
                            "name": item.modelName,
                            "id": item.modelId
                        });
                    });
                } else if (object.unpopular) {
                    object.unpopular.map(item => {
                    //console.log(`${item.modelName} ${item.modelId} `)
                        models.push({
                            "name": item.modelName,
                            "id": item.modelId
                        });
                    });
                }
            }
            resolve(returnVal(models, keyword))
        });
    });
}

function returnVal(models, keyword) {
    return new Promise((resolve, reject) => {
        let output = [];
        models.map(model => {
            if (model.name.toLowerCase().includes(keyword.toLowerCase())) {
                output.push({
                    "name": model.name,
                    "id": model.id
                });
            }
        });
        resolve(output);
    });
}

exports.getID = async (kw) => {
    return new Promise((resolvee, reject) => {
        new Promise((resolve, reject) => {
            let check = search(kw);
            check.then(function(data) {
                resolve(data);
            })
        }).then(function(data) { resolvee(data) })
    })
}