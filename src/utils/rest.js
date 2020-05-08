import fetch from 'node-fetch'

const rest = {
  async get(url, options) {
    return await fetch(url, {
      ...options, ...{
        method: 'GET'
      }
    });
  },

  async post(url, options) {
    return await fetch(url, {
      ...options, ...{
        method: 'POST'
      }
    });
  },

  async put(url, options) {
    return await fetch(url, {
      ...options, ...{
        method: 'PUT'
      }
    });
  },

  async patch(url, options) {
    return await fetch(url, {
      ...options, ...{
        method: 'PATCH'
      }
    });
  },

  async delete(url, options) {
    return await fetch(url, {
      ...options, ...{
        method: 'DELETE'
      }
    });
  },
};

exports.rest = rest
