const fs = require('fs');
const youtubedl = require('youtube-dl');
// const gifify = require('gifify');

const ffmpeg = require('fluent-ffmpeg');
const ws = new require('stream').Writeble;


function generateGif(options) {
  return new Promise((resolve, reject) => {
    const video = youtubedl(options.url,
      // Optional arguments passed to youtube-dl.
      ['--format=18'],
      // Additional options can be given for calling `child_process.execFile()`.
      {  cwd: __dirname });

    video.on('info', function (info) {
      console.log('Download started');
      console.log('filename: ' + info.filename);
      console.log('size: ' + info.size);
    })
    .on('close', function (err) {
      console.log('Stream has been destroyed and file has been closed');
    });

    const output = `${Math.random().toString(36).substring(5)}.gif`;

    ffmpeg()
      .input(video)
      .size('50%')
      .seek(options.from || 10)
      .duration(options.duration || 5)
      .save(output)
      .on('end', function () {
        console.log('Finished processing');
        video.destroy();
        resolve(output);
      })
      .on('error', err => {
        reject(err)
      })
  })
};

module.exports = {
  generateGif
}