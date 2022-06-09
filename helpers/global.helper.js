var express = require('express');
// This should work both there and elsewhere.
  function isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }

  module.exports = {
    isEmptyObject
  };