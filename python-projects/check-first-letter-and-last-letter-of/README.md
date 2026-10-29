# Check First Letter and Last Letter of

## Question

Read a sentence and print whether each word starts and ends with the same letter.

## Supplied Python code

```python
S = input().lower()
split_of_method = S.split()
for i in split_of_method:
    print(i[0] == i[-1])
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| mixed words | 'level test Anna\n' | 'True\nTrue\nTrue\n' |
| none match | 'abc xyq\n' | 'False\nFalse\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_check_first_letter_and_last_letter_of.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One sentence.
- Output: One boolean per word.
- The sentence is lowercased before splitting, so a word like Anna reports True.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
