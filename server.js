const next = require("next");

require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const fs = require("fs");

const express = require("express");

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    const render = (req, res, pageName) => {
      app.render(req, res, '/', {
        page: pageName
      })
    }

    server.get('/page/:page', (req, res) => {
        // this is a url, a direct request
        const { page } = req.params;
        const query = Object.assign({
            page
        }, req.query);

        return app.render(req, res, '/', query);
    });

    server.get("*", (req, res, err) => {
      return handle(req, res);
    });

    server.listen(process.env.PORT, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:" + process.env.PORT);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
