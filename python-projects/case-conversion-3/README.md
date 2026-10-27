# Case Conversion - 3

## Question

Read a word and print it in lowercase with a dash before every uppercase character.

## Supplied Python code

```python
N = input()
result_new_string = N[0].lower()
for i in range(1,len(N)):
    if (N[i].isupper()):
        result_new_string += "-" + N[i].lower()
    else:
        result_new_string += N[i]
print(result_new_string)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| helloWorld | `'helloWorld\n'` | `'hello-world\n'` |
| myNameIs | `'myNameIs\n'` | `'my-name-is\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_case_conversion_3.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One word.
- Output: Lowercase word with dashes before former uppercase letters.
- An uppercase first character is lowercased without a leading dash.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
