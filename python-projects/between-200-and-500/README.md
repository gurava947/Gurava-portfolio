# Between 200 and 500

## Question

Read a number and print Yes only when it falls strictly between 200 and 500.

## Supplied Python code

```python
def is_between_200_and_500(number):
    result = "Yes" if 200 < number < 500 else 'No'
    return result
number = int(input())
output = is_between_200_and_500(number=number)
print(output)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| inside | '350\n' | 'Yes\n' |
| lower bound | '200\n' | 'No\n' |
| above | '500\n' | 'No\n' |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_between_200_and_500.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: Yes or No.
- The bounds are exclusive, so the endpoints themselves print No.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
