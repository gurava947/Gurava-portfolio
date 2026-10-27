# Print Characters

## Question

Read a word, then read one integer per character of the word, and print the character at each position on its own line.

## Supplied Python code

```python
N = input()
for i in N:
    number_of_inputs = int(input())
    print(N[number_of_inputs])
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| abc with positions 0, 1, 2 | `'abc\n0\n1\n2\n'` | `'a\nb\nc\n'` |
| code with positions 3, 2, 1, 0 | `'code\n3\n2\n1\n0\n'` | `'e\nd\no\nc\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_print_characters.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One word plus one integer per character.
- Output: One character per line.
- An out-of-range position raises IndexError.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
