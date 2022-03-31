const db = require("../models");
const validUrl = require('valid-url');
const shortid = require('shortid');

const Urlshort = db.Urlshort;
const Op = db.Sequelize.Op;
const baseUrl = 'http://shorten.io';

exports.findUrlshorts = (req, res) => {

    Urlshort.findAll()
    .then(data => {
        console.log("at urlshort.controller exports.findUrlshorts: "+JSON.stringify(data))
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "at urlshort.controller exports.findUrlshorts"
        });
    })
}

exports.findUrlshortById = (req, res) => {
    const id = req.params.id;
    console.log("at urlshort.controller exports.findUrlshortById id: "+id)
    Urlshort.findUrlshortById(id)
    .then(data => {
        console.log("at urlshort.controller exports.findUrlshortById - data: "+JSON.stringify(data))
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "at urlshort.controller exports.findUrlshortById"
        });
    })
}

exports.findUrlshortByOriginalUrl = (req, res) => {
    const original_url = req.params.original_url;
    console.log("at urlshort.controller exports.findUrlshortByOriginalUrl id: "+id)
    Urlshort.findAll({
        where: {
            original_url: original_url,
        }
      })
    .then(data => {
        console.log("at urlshort.controller exports.findUrlshortByOriginalUrl - data: "+JSON.stringify(data))
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "at urlshort.controller exports.findUrlshortByOriginalUrl"
        });
    })
}

exports.createUrlshort = async(req, res) => {
    const {original_url} = req.body;
    console.log("at urlshort.controller exports.createUrlshort - body: "+ JSON.stringify(original_url));

    if(!validUrl.isWebUri(original_url)){
        console.log("invalid url");
        res.status(401).send({
            message:
                "invalid url"
        });
    } else {
    // check for existing record to avoid duplicate entry
    await Urlshort.findAll({
        where: {
            original_url: original_url,
        }
      }).then(data => {
            console.log("at urlshort.controller exports.createUrlshort - original_url: "+JSON.stringify(data))
            if(Array.isArray(data) && data.length > 0){
                res.status(401).send({
                    message:
                        "Url already exists"
                });
            } else {
                // generate short-id and save new record
                const urlCode = shortid.generate();
                const shortened_url = baseUrl + '/' + urlCode;
            
                const urlshort = {"original_url": original_url, "shortened_url": shortened_url};
                console.log("at urlshort.controller exports.createUrlshort - urlshort: "+JSON.stringify(urlshort));
            
                Urlshort.create(urlshort)
                .then(data => {
                    console.log("at urlshort.controller exports.createUrlshort - data: "+JSON.stringify(data))
                    res.status(200).send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "at urlshort.controller exports.createUrlshort"
                    });
                })
            }
        })
    }
}

exports.updateUrlshort = (req, res) => {
    const id = req.params.id;
    console.log("at urlshort.controller exports.updateUrlshort - id: "+id);
    console.log("at urlshort.controller exports.updateUrlshort - body: "+req.body);
    const {original_url, shortened_url} = req.body;

    if(original_url == null && shortened_url == null){
        console.log("Both Original and Shortened urls are emplty");
        res.status(401).send({
            message:
                "Provide at least one from Original Url or Shortened Url"
        });
    } else if(original_url !=null && !validUrl.isWebUri(original_url)){
        console.log("invalid Original url");
        res.status(401).send({
            message:
                "invalid Original Url"
        });
    } else if(shortened_url !=null && !validUrl.isWebUri(shortened_url)){
        console.log("invalid shortened_url");
        res.status(401).send({
            message:
                "invalid Shortened Url"
        });
    } else {
        const updateValues = req.body;
        Urlshort.update(updateValues, {
            where: {
              id: id
            }
          }).then(data => {
            console.log("at urlshort.controller exports.updateUrlshort: "+JSON.stringify(data))
            res.status(200).send("Updated Record id: "+id);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "at urlshort.controller exports.updateUrlshort"
            });
        })
    }
}

exports.deleteUrlshort = (req, res) => {
    const id = req.params.id;
    console.log("at urlshort.controller exports.deleteUrlshort id: "+id)
    Urlshort.destroy({
        where: {
          id: id
        }
      }).then(data => {
        console.log("at urlshort.controller exports.deleteUrlshort: "+JSON.stringify(data))
        res.status(200).send("Deleted record id: "+id);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "at urlshort.controller exports.deleteUrlshort"
        });
    })
}