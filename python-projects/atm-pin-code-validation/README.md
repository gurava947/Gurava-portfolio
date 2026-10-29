# ATM PIN Code Validation

## Question

Read a PIN and print whether it is a valid ATM PIN code.

## Supplied Python code

```python
def validate_atm_pin_code(pin):
    for i in pin:
        is_digits = i.isdigit()
        return "Valid PIN Code" if (len(pin) == 4 and is_digits) or (len(pin) == 6 and is_digits) else "Invalid PIN Code"
pin = input()
result = validate_atm_pin_code(pin = pin)
print(result)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| four digits | '1234\n' | 'Valid PIN Code\n' |
| letters | 'abcd\n' | 'Invalid PIN Code\n' |
| digits then letters | '12ab\n' | 'Valid PIN Code\n' |
| wrong length | '12345\n' | 'Invalid PIN Code\n' |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_atm_pin_code_validation.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One PIN.
- Output: One label.
- The return sits inside the loop, so only the first character is ever tested for being a digit; the third fixture shows a PIN of letters and digits still reported Valid.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
