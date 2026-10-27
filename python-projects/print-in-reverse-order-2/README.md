# Print in Reverse Order - 2

## Question

No prose statement was supplied; the title and supplied code define the exercise.

## Supplied Python code

```python
word_A = input()
word_A = input()

print(word_A)
print("#" *3)
print(word_A) 
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| first and second | `'first\nsecond\n'` | `'second\n###\nsecond\n'` |
| Hello and World | `'Hello\nWorld\n'` | `'World\n###\nWorld\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases (including invalid inputs where relevant).

```bash
python -m unittest discover -s python-projects/tests -p "test_print_in_reverse_order_2.py" -v
```

Edge cases covered:

- Missing second line: raises `EOFError` (preserved behavior; no source change).
- Two empty lines: stdout `'\n###\n\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Title/behavior mismatch: the first input is discarded and the output is not a reversed pair. Preserved exactly as supplied.
- Input label: Two lines.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
