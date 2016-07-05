/* global Set */
import list from './list';

/*
import { readFileSync } from 'fs';
import { join } from 'path';


const fileContent = readFileSync(join(__dirname, 'emoji.txt'), 'utf8');

const all = fileContent.split('\n');
all.pop();
*/

const all = [];
const set = new Set();
for (var i = 0, chr; i < list.length; i++) {
  [chr, i] = getWholeCharAndI(list, i);
  if (chr.length > 1) {
    all.push(chr);
    set.add(chr);
  }
}

function getWholeCharAndI(str, i) {
  var code = str.charCodeAt(i);

  if (isNaN(code)) {
    return ''; // Position not found
  }
  if (code < 0xD800 || code > 0xDFFF) {
    return [str.charAt(i), i]; // Normal character, keeping 'i' the same
  }

  // High surrogate (could change last hex to 0xDB7F to treat high private
  // surrogates as single characters)
  if (0xD800 <= code && code <= 0xDBFF) {
    if (str.length <= (i + 1)) {
      throw 'High surrogate without following low surrogate';
    }
    var next = str.charCodeAt(i + 1);
    if (0xDC00 > next || next > 0xDFFF) {
      throw 'High surrogate without following low surrogate';
    }
    return [str.charAt(i) + str.charAt(i + 1), i + 1];
  }
  // Low surrogate (0xDC00 <= code && code <= 0xDFFF)
  if (i === 0) {
    throw 'Low surrogate without preceding high surrogate';
  }
  var prev = str.charCodeAt(i - 1);

  // (could change last hex to 0xDB7F to treat high private surrogates
  // as single characters)
  if (0xD800 > prev || prev > 0xDBFF) {
    throw 'Low surrogate without preceding high surrogate';
  }
  // Return the next character instead (and increment)
  return [str.charAt(i + 1), i + 1];
}

export function isEmoji(letter) {
  return set.has(letter);
}

export function extractEmoji(str) {
  const result = [];
  for (var i = 0, chr; i < str.length; i++) {
    [chr, i] = getWholeCharAndI(str, i);
    // the current iteration and returning an array with the individual character
    // and 'i' value (only changed if a surrogate pair)
    if (isEmoji(chr)) {
      result.push(chr);
    }
  }
  return result;
}

export { set, all };
