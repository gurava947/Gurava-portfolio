# Fizz Buzz

## Question

Read a number and print Fizz, Buzz, FizzBuzz or the number itself.

## Supplied Python code

```python
def fizz_buzz(number):
    if(number % 3 == 0) and (number % 5 == 0):
        return "FizzBuzz"
    elif(number % 3 == 0):
        return "Fizz"
    elif(number % 5 == 0):
        return "Buzz"
    else:
        return number
number = int(input())
value = fizz_buzz(number)
print(value)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| divisible by three | '9\n' | 'Fizz\n' |
| divisible by five | '10\n' | 'Buzz\n' |
| divisible by both | '15\n' | 'FizzBuzz\n' |
| neither | '7\n' | '7\n' |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_fizz_buzz.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: One label or the number.
- Only the single supplied number is tested; this is the decision for one value, not a run over a range.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
