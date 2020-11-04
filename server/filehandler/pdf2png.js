/* Copyright 2017 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 /**
  * original code
  * https://github.com/mozilla/pdf.js/tree/master/examples/node/pdf2png
  * 
  */

const Canvas = require("canvas");
const assert = require("assert").strict;
const fs = require("fs");
const { resolve } = require("path");

function NodeCanvasFactory() {}
NodeCanvasFactory.prototype = {
  create: function NodeCanvasFactory_create(width, height) {
    assert(width > 0 && height > 0, "Invalid canvas size");
    var canvas = Canvas.createCanvas(width, height);
    var context = canvas.getContext("2d");
    return {
      canvas: canvas,
      context: context,
    };
  },

  reset: function NodeCanvasFactory_reset(canvasAndContext, width, height) {
    assert(canvasAndContext.canvas, "Canvas is not specified");
    assert(width > 0 && height > 0, "Invalid canvas size");
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  },

  destroy: function NodeCanvasFactory_destroy(canvasAndContext) {
    assert(canvasAndContext.canvas, "Canvas is not specified");

    // Zeroing the width and height cause Firefox to release graphics
    // resources immediately, which can greatly reduce memory consumption.
    canvasAndContext.canvas.width = 0;
    canvasAndContext.canvas.height = 0;
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  },
};

const pdfjsLib = require("pdfjs-dist/es5/build/pdf.js");

// Some PDFs need external cmaps.
const CMAP_URL = "../../node_modules/pdfjs-dist/cmaps/";
const CMAP_PACKED = true;


/*******************************************/
const __getnumPages = loadingTask => {
  return new Promise((resolve, reject) => {
    loadingTask.promise
          .then( pdfDocument => {
            resolve(pdfDocument.numPages);
          })
          .catch( e => {
            reject(e);
          })
  })
}


const __getOne = (loadingTask, idx) => {
  return new Promise((resolve, reject) => {
    loadingTask.promise
          .then( pdfDocument => {
            return pdfDocument.getPage(idx)
          })
          .then( page => {
            const viewport = page.getViewport({scale: 2.0});
            const canvasFactory = new NodeCanvasFactory();
            const canvasAndContext = canvasFactory.create(
              viewport.width, viewport.height
            );
            const renderContext = {
              canvasContext: canvasAndContext.context,
              viewport: viewport,
              canvasFactory: canvasFactory
            };

            const renderTask = page.render(renderContext);
            renderTask.promise.then( () => {
              const image = canvasAndContext.canvas.toBuffer();
              resolve(image);

              canvasFactory.destroy(canvasAndContext);
            })
          })
          .catch( e => {
            reject(e);
          })
  })
}

/******************************************** */

module.exports.pdf2png = class {
  constructor(file){
    if(!file){
      throw new Error('pdfjs requires file path @/filehandler/pdf2png.js')
    }

    this.file = file;
    this.data = new Uint8Array(fs.readFileSync(this.file));
    this.loadingTask = pdfjsLib.getDocument({
      data: this.data,
      cMapUrl: CMAP_URL,
      cMapPacked: CMAP_PACKED,
    });
  }

  thumbnail = () => {
    return new Promise( async (resolve, reject) => {
      resolve( await __getOne(this.loadingTask, 1) );
    });
  }

  getnumPages = () => {
    return new Promise( async (resolve, reject) => {
      resolve( await __getnumPages(this.loadingTask) );
    });
  }

  getOne = idx => {
    return new Promise( async (resolve, reject) => {
      resolve( await __getOne(this.loadingTask, idx) );
    });
  }

  destroy = () => {
    this.loadingTask.promise.then( pdfdoc => {
      pdfdoc.destroy();
    })
  }

}
