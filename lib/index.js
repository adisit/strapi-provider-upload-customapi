'use strict';
var request = require('request');

module.exports = {
  init(providerOptions) {
    const upload = (file) =>
      new Promise((resolve, reject) => {
        let formData = {};

        if (providerOptions.module) {
          formData['module'] = providerOptions.module;
        } else {
          formData['module'] = 'assets';
        }

        let fileParameterName = 'file';
        if (providerOptions.fileParameterName) {
          fileParameterName = providerOptions.fileParameterName;
        }

        formData[fileParameterName] = {
          value: Buffer.from(file.buffer, 'binary'),
          options: {
            filename: `${file.hash}.${file.ext}`,
            contentType: file.mime,
          },
        };

        let headers = {};
        if (providerOptions.headers) {
          headers = providerOptions.headers;
        }

        var options = {
          method: 'POST',
          url: providerOptions.endpoint,
          headers: headers,
          formData,
        };
        request(options, function (error, response) {
          if (error) {
            reject(error);
            throw new Error(error);
          }
          try {
            const data = JSON.parse(response.body);
            file.url = data.data;
            resolve();
          } catch (error) {
            reject(error);
          }
        });
      });

    return {
      upload,

      delete(file) {
        // delete the file in the provider
      },
      checkFileSize(file, { sizeLimit }) {
        // implement your own file size limit logic
        // there is a default logic in place if this
        // method is not implemented
      },
    };
  },
};
