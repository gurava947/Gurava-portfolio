# Shuffle String

## Question

Read a word, then read one integer per character of the word, and print the word rebuilt from the characters at those positions.

## Supplied Python code

```python
string = input()    
def ShuffleString(string):
    New_string = ""
    for i in range(len(string)):
        No_of_inputs = int(input())
        New_string += string[No_of_inputs]
    return New_string
print(ShuffleString(string))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| abc with positions 0, 1, 2 | `'abc\n0\n1\n2\n'` | `'abc\n'` |
| hello reversed | `'hello\n4\n3\n2\n1\n0\n'` | `'olleh\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_shuffle_string.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One word plus one integer per character.
- Output: The rebuilt word.
- A position outside the word raises IndexError because the code does not validate the input.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
