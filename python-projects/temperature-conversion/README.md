# Temperature Conversion

## Question

Read a temperature with its C, F or K suffix and print the same temperature on all three scales.

## Supplied Python code

```python
temp_input = input()

value = float(temp_input[:-1])
unit = temp_input[-1].upper()

if unit == "C":
    celsius = value
    fahreheit = (value * 9/5) + 32
    kelvin = value + 273 
elif unit == "F":
    celsius = (value - 32) * 5/9
    fahreheit = value
    kelvin = celsius + 273
elif unit == "K":
    celsius = value - 273 
    fahreheit = (celsius * 9/5) + 32
    kelvin = value
print(str(round(celsius,2)) + "C")
print(str(round(fahreheit,2)) + "F")
print(str(round(kelvin,2)) + "K")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 100C | '100C\n' | '100.0C\n212.0F\n373.0K\n' |
| 72F | '72F\n' | '22.22C\n72.0F\n295.22K\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_temperature_conversion.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One temperature suffixed C, F or K.
- Output: Three lines: Celsius, Fahrenheit, Kelvin.
- Kelvin is derived with an offset of 273 rather than 273.15.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
