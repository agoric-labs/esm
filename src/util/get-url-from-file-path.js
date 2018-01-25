// A simplified version of file-url.
// Copyright Sindre Sorhus. Released under MIT license:
// https://github.com/sindresorhus/file-url

import encodeURI from "./encode-uri.js"
import normalize from "../path/normalize.js"

const encodeCharsRegExp = /[?#]/g

const encodeCharMap = {
  "#": "%23",
  "?": "%3F"
}

function encodeChar(char) {
  return encodeCharMap[char]
}

function getURLFromFilePath(filename) {
  filename = normalize(filename)

  if (filename.charCodeAt(0) !== 47 /* / */) {
    filename = "/" + filename
  }

  // Section 3.3: Escape Path Components
  // https://tools.ietf.org/html/rfc3986#section-3.3
  return "file://" + encodeURI(filename).replace(encodeCharsRegExp, encodeChar)
}

export default getURLFromFilePath
