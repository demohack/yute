/** Textual markov chain generator */
const random = require('random');

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    console.log("input : " + this.words);
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let a2 = null;
    let v2 = null;

    this.map = new Map();

    this.words.push(null);
    this.words.forEach((val, idx, arr) => {

      if (val != null) {

        if (this.map.has(val)) {

          a2 = this.map.get(val);

        } else {

          a2 = [];
          this.map.set(val, a2);

        }

        v2 = arr[idx + 1];
        a2.push(v2);
      }

    })
    this.words.pop();

    console.log("### map:");
    console.log(this.map);
  }


  /** return random text from chains */

  makeText(numWords = 100) {

    let rand_key_func = random.uniformInt(0, this.words.length - 1);
    let rand_key_num = rand_key_func();
    let key = this.words[rand_key_num];

    let vals = null;

    let rand_val_func = null;
    let rand_val_num = null;
    let val = null;

    let retval = key;

    for (let i = 0; i < numWords; i++) {

      vals = [...this.map.get(key)];

      if (vals.length > 1) {

        rand_val_func = random.uniformInt(0, vals.length - 1);
        rand_val_num = rand_val_func();
        val = vals[rand_val_num];

      } else {

        val = vals[0];

      }

      if (val == null) {

        break;

      } else {

        retval += " " + val;

      }

      key = val;
    }

    return retval;
  }
};

const m = new MarkovMachine("the cat in the hat.");
console.log(m.makeText());

module.exports = {
  MarkovMachine
};