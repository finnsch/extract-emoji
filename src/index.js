import spliddit from 'spliddit';

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
let i = 0;
let chr = '';
while (i < list.length) {
  [chr, i] = getWholeCharAndI(list, i);
  if (chr.length > 1) {
    all.push(chr);
    set.add(chr);
  }
}

function getWholeCharAndI(str, i) {
  const end = spliddit.take_how_many(i, str);
  const char = str.substring(i, i + end);

  return [char, i + end];
}

export function isEmoji(letter) {
  return set.has(letter);
}

export function extractEmoji(str) {
  const result = [];
  let i = 0;

  while (i < str.length) {
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
