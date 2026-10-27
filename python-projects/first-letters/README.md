# First Letters

## Question

No prose statement was supplied; the title and supplied code define the exercise.

## Supplied Python code

```python
word = input()
word_1 = input()
word_2 = input()
a = word[0]
b = word_1[0]
c = word_2[0]
abc = a+b+c
print(abc)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| alpha, beta, gamma | `'alpha\nbeta\ngamma\n'` | `'abg\n'` |
| Gurava, Rahul, NxtWave | `'Gurava\nRahul\nNxtWave\n'` | `'GRN\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases (including invalid inputs where relevant).

```bash
python -m unittest discover -s python-projects/tests -p "test_first_letters.py" -v
```

Edge cases covered:

- Empty middle line: raises `IndexError` (preserved behavior; no source change).
- Unicode words: stdout `'గరన\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- An empty line in any position raises IndexError; this is documented by the test suite.
- Input label: Three words.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
