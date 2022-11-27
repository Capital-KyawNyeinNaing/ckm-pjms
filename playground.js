const items = [
  { name: 'one', order: 0 },
  { name: 'two', order: 1 },
  { name: 'three', order: 2 },
  { name: 'four', order: 3 },
  { name: 'five', order: 4 },
  { name: 'six', order: 5 },
  { name: 'serven', order: 6 },
];

// [one, six, two, three, four, five, six, seven]

const candidateIndex = 1;
const targetIndex = 7;
const x = targetIndex >= candidateIndex || targetIndex === null ? 0 : 1;

const curr = items.splice(candidateIndex, 1)[0];
items.splice(targetIndex + x, 0, curr);
const newItems = items.map((item, i) => {
  item.order = i;
  return item;
});
