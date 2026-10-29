# Four Passengers and a Driver

## Question

Read a number of people and print how many cars are needed for them.

## Supplied Python code

```python
def number_of_cars_needed(no_of_people):
    car = (no_of_people + 4)//5
    return car
no_of_people = int(input())
OutPut = number_of_cars_needed(no_of_people)
print(OutPut)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| twelve people | '12\n' | '3\n' |
| exact fit | '10\n' | '2\n' |
| one person | '1\n' | '1\n' |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_four_passengers_and_a_driver.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: One integer.
- Each car seats five, four passengers plus its driver, and `(no_of_people + 4) // 5` is the integer ceiling of people over five.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
