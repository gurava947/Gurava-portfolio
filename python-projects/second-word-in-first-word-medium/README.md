# Second Word in First Word Medium

## Question

No prose statement was supplied; the title and supplied code define the exercise.

## Supplied Python code

```python
w1,w2 = input(),input();length = (len(w2)-1);print(length)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| hello and world | `'hello\nworld\n'` | `'4\n'` |
| aaa and b | `'aaa\nb\n'` | `'0\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases (including invalid inputs where relevant).

```bash
python -m unittest discover -s python-projects/tests -p "test_second_word_in_first_word_medium.py" -v
```

Edge cases covered:

- Empty second word: stdout `'-1\n'`.
- First word is unused: stdout `'0\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Title/behavior mismatch: the code does not check whether the second word appears in the first. Preserved exactly as supplied.
- Input label: Two words.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
