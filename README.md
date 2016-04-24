# extract-emoji
Extract emoji from a string

# the Gist

```js
import { all, isEmoji, extractEmoji } from 'extract-emoji';

console.log(all[4]); // => 🙂

isEmoji(🙂); // => true

extractEmoji('I am so Happy 🙂 🙂') // => ['🙂', '🙂'];
```
